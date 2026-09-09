#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

CANONICAL_DOMAIN="${CANONICAL_DOMAIN:-fairhelmsystems.com}"
REDIRECT_DOMAIN_IN="${REDIRECT_DOMAIN_IN:-fairhelmsystems.in}"
AWS_REGION="${AWS_REGION:-ap-south-1}"
ACM_REGION="${ACM_REGION:-us-east-1}"
ACM_CERTIFICATE_ARN="${ACM_CERTIFICATE_ARN:-}"
HOSTED_ZONE_ID_COM="${HOSTED_ZONE_ID_COM:-}"
HOSTED_ZONE_ID_IN="${HOSTED_ZONE_ID_IN:-}"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"
SITE_BUCKET_NAME="${SITE_BUCKET_NAME:-}"
CF_FUNCTION_NAME="${CF_FUNCTION_NAME:-fairhelm-marketing-router}"
OAC_NAME="${OAC_NAME:-fairhelm-marketing-oac}"
ORIGIN_ID="fairhelm-marketing-s3"
PROJECT_TAG="fairhelmsystems-marketing"
OUT_DIR="out"

CREATED_RESOURCES=()
UPDATED_RESOURCES=()
MANUAL_STEPS=()
TEMP_FILES=()

cleanup() {
  if ((${#TEMP_FILES[@]})); then
    rm -f "${TEMP_FILES[@]}"
  fi
}
trap cleanup EXIT

log() {
  printf '[fairhelm-deploy] %s\n' "$*"
}

fail() {
  printf '[fairhelm-deploy] ERROR: %s\n' "$*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "Required command not found: $1"
}

temp_file() {
  local destination="$1"
  local file
  file="$(mktemp)"
  TEMP_FILES+=("$file")
  printf -v "$destination" '%s' "$file"
}

require_command aws
require_command jq
require_command curl

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
[[ "$ACCOUNT_ID" =~ ^[0-9]{12}$ ]] || fail "Could not determine the AWS account ID."

if [[ -z "$SITE_BUCKET_NAME" ]]; then
  SITE_BUCKET_NAME="fairhelmsystems-marketing-prod-${ACCOUNT_ID}"
fi

log "AWS change plan"
log "  1. Build and validate the static export in ${OUT_DIR}/."
log "  2. Create or reuse private bucket s3://${SITE_BUCKET_NAME} in ${AWS_REGION}."
log "  3. Create or reuse DNS-validated ACM coverage in ${ACM_REGION}."
log "  4. Create or update OAC, viewer-request function, and the Fairhelm CloudFront distribution."
log "  5. UPSERT only Fairhelm A/AAAA aliases, upload the site, and invalidate CloudFront."
log "No resources are deleted; an existing untagged bucket is rejected unless ADOPT_EXISTING_BUCKET=1."

detect_package_manager() {
  if [[ -f bun.lock || -f bun.lockb ]]; then
    printf 'bun'
  elif [[ -f pnpm-lock.yaml ]]; then
    printf 'pnpm'
  elif [[ -f yarn.lock ]]; then
    printf 'yarn'
  elif [[ -f package-lock.json ]]; then
    printf 'npm'
  else
    fail "No supported package-manager lockfile found."
  fi
}

run_package_script() {
  local manager="$1"
  local script="$2"
  case "$manager" in
    bun) bun run "$script" ;;
    pnpm) pnpm run "$script" ;;
    yarn) yarn run "$script" ;;
    npm) npm run "$script" ;;
  esac
}

install_dependencies() {
  local manager="$1"
  case "$manager" in
    bun) bun install --frozen-lockfile ;;
    pnpm) pnpm install --frozen-lockfile ;;
    yarn) yarn install --frozen-lockfile ;;
    npm) npm ci ;;
  esac
}

if [[ "${SKIP_BUILD:-0}" != "1" ]]; then
  PACKAGE_MANAGER="$(detect_package_manager)"
  log "Using package manager: ${PACKAGE_MANAGER}"
  if [[ ! -d node_modules ]]; then
    log "node_modules/ is absent; installing locked dependencies."
    install_dependencies "$PACKAGE_MANAGER"
  fi
  log "Running Biome quality gate."
  run_package_script "$PACKAGE_MANAGER" lint
  log "Building the static export."
  run_package_script "$PACKAGE_MANAGER" build
fi

[[ -f "$OUT_DIR/index.html" ]] || fail "${OUT_DIR}/index.html is missing. Run the static build first."
[[ -f "$OUT_DIR/robots.txt" ]] || fail "${OUT_DIR}/robots.txt is missing."
[[ -f "$OUT_DIR/sitemap.xml" ]] || fail "${OUT_DIR}/sitemap.xml is missing."
[[ -f "$OUT_DIR/llms.txt" ]] || fail "${OUT_DIR}/llms.txt is missing."
[[ -f "$OUT_DIR/llms-full.txt" ]] || fail "${OUT_DIR}/llms-full.txt is missing."
[[ -f "$OUT_DIR/index.md" ]] || fail "${OUT_DIR}/index.md is missing. Run the static build (it generates the Markdown alternates)."

# The live sitemap as it was BEFORE this deploy, for the IndexNow diff at the
# end: only URLs whose lastmod changed (or that appeared/disappeared) are
# submitted, never the whole sitemap on every deploy.
PREVIOUS_SITEMAP="$(mktemp -t previous-sitemap.XXXXXX)"
curl -sf --max-time 20 "https://${CANONICAL_DOMAIN}/sitemap.xml" -o "$PREVIOUS_SITEMAP" || : > "$PREVIOUS_SITEMAP"

find_hosted_zone() {
  local domain="$1"
  aws route53 list-hosted-zones-by-name --dns-name "$domain" --output json \
    | jq -r --arg name "${domain}." \
      '.HostedZones[] | select(.Name == $name and .Config.PrivateZone == false) | .Id' \
    | sed -n '1s|/hostedzone/||p'
}

create_hosted_zone() {
  local domain="$1"
  local destination="$2"
  local result
  result="$(aws route53 create-hosted-zone \
    --name "$domain" \
    --caller-reference "fairhelm-$(date +%s)-${RANDOM}" \
    --hosted-zone-config Comment="Fairhelm Systems public zone",PrivateZone=false \
    --output json)"
  CREATED_RESOURCES+=("Route53 hosted zone ${domain}")
  MANUAL_STEPS+=("If ${domain} is registered outside Route53, set its registrar nameservers to: $(jq -r '.DelegationSet.NameServers | join(", ")' <<<"$result")")
  local zone_id
  zone_id="$(jq -r '.HostedZone.Id' <<<"$result" | sed 's|/hostedzone/||')"
  printf -v "$destination" '%s' "$zone_id"
}

if [[ -z "$HOSTED_ZONE_ID_COM" ]]; then
  HOSTED_ZONE_ID_COM="$(find_hosted_zone "$CANONICAL_DOMAIN")"
fi
if [[ -z "$HOSTED_ZONE_ID_COM" ]]; then
  create_hosted_zone "$CANONICAL_DOMAIN" HOSTED_ZONE_ID_COM
else
  UPDATED_RESOURCES+=("Route53 hosted zone ${CANONICAL_DOMAIN} reused")
fi

if [[ -z "$HOSTED_ZONE_ID_IN" ]]; then
  HOSTED_ZONE_ID_IN="$(find_hosted_zone "$REDIRECT_DOMAIN_IN")"
fi
if [[ -z "$HOSTED_ZONE_ID_IN" ]]; then
  create_hosted_zone "$REDIRECT_DOMAIN_IN" HOSTED_ZONE_ID_IN
else
  UPDATED_RESOURCES+=("Route53 hosted zone ${REDIRECT_DOMAIN_IN} reused")
fi

if aws s3api head-bucket --bucket "$SITE_BUCKET_NAME" >/dev/null 2>&1; then
  EXISTING_PROJECT_TAG="$(aws s3api get-bucket-tagging --bucket "$SITE_BUCKET_NAME" --output json 2>/dev/null \
    | jq -r '.TagSet[]? | select(.Key == "Project") | .Value' || true)"
  if [[ "$EXISTING_PROJECT_TAG" != "$PROJECT_TAG" && "${ADOPT_EXISTING_BUCKET:-0}" != "1" ]]; then
    fail "Bucket ${SITE_BUCKET_NAME} exists without Project=${PROJECT_TAG}. Set ADOPT_EXISTING_BUCKET=1 only after confirming it is dedicated to this site."
  fi
  UPDATED_RESOURCES+=("S3 bucket ${SITE_BUCKET_NAME}")
else
  if [[ "$AWS_REGION" == "us-east-1" ]]; then
    aws s3api create-bucket --bucket "$SITE_BUCKET_NAME" --region "$AWS_REGION" >/dev/null
  else
    aws s3api create-bucket \
      --bucket "$SITE_BUCKET_NAME" \
      --region "$AWS_REGION" \
      --create-bucket-configuration "LocationConstraint=${AWS_REGION}" >/dev/null
  fi
  CREATED_RESOURCES+=("S3 bucket ${SITE_BUCKET_NAME}")
fi

aws s3api put-public-access-block \
  --bucket "$SITE_BUCKET_NAME" \
  --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
aws s3api put-bucket-encryption \
  --bucket "$SITE_BUCKET_NAME" \
  --server-side-encryption-configuration \
    '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
aws s3api put-bucket-versioning \
  --bucket "$SITE_BUCKET_NAME" \
  --versioning-configuration Status=Enabled
aws s3api put-bucket-tagging \
  --bucket "$SITE_BUCKET_NAME" \
  --tagging "TagSet=[{Key=Project,Value=${PROJECT_TAG}},{Key=ManagedBy,Value=deploy-aws-static.sh}]"

REQUIRED_CERT_DOMAINS=(
  "$CANONICAL_DOMAIN"
  "www.${CANONICAL_DOMAIN}"
  "$REDIRECT_DOMAIN_IN"
  "www.${REDIRECT_DOMAIN_IN}"
)

certificate_covers_domains() {
  local arn="$1"
  local certificate_json
  certificate_json="$(aws acm describe-certificate --region "$ACM_REGION" --certificate-arn "$arn" --output json)"
  local domain
  for domain in "${REQUIRED_CERT_DOMAINS[@]}"; do
    jq -e --arg domain "$domain" '.Certificate.SubjectAlternativeNames | index($domain)' \
      <<<"$certificate_json" >/dev/null || return 1
  done
}

if [[ -z "$ACM_CERTIFICATE_ARN" ]]; then
  while IFS= read -r candidate_arn; do
    [[ -n "$candidate_arn" ]] || continue
    if certificate_covers_domains "$candidate_arn"; then
      ACM_CERTIFICATE_ARN="$candidate_arn"
      break
    fi
  done < <(
    aws acm list-certificates --region "$ACM_REGION" --output json \
      | jq -r --arg domain "$CANONICAL_DOMAIN" \
        '.CertificateSummaryList[] | select(.DomainName == $domain) | .CertificateArn'
  )
fi

if [[ -z "$ACM_CERTIFICATE_ARN" ]]; then
  IDEMPOTENCY_TOKEN="$(printf '%s' "$CANONICAL_DOMAIN" | sha256sum | cut -c1-32)"
  ACM_CERTIFICATE_ARN="$(aws acm request-certificate \
    --region "$ACM_REGION" \
    --domain-name "$CANONICAL_DOMAIN" \
    --subject-alternative-names "www.${CANONICAL_DOMAIN}" "$REDIRECT_DOMAIN_IN" "www.${REDIRECT_DOMAIN_IN}" \
    --validation-method DNS \
    --idempotency-token "$IDEMPOTENCY_TOKEN" \
    --options CertificateTransparencyLoggingPreference=ENABLED \
    --tags Key=Project,Value="$PROJECT_TAG" \
    --query CertificateArn \
    --output text)"
  CREATED_RESOURCES+=("ACM certificate ${ACM_CERTIFICATE_ARN}")
else
  UPDATED_RESOURCES+=("ACM certificate ${ACM_CERTIFICATE_ARN} reused")
fi

VALIDATION_READY=0
for attempt in $(seq 1 20); do
  CERTIFICATE_JSON="$(aws acm describe-certificate \
    --region "$ACM_REGION" \
    --certificate-arn "$ACM_CERTIFICATE_ARN" \
    --output json)"
  VALIDATION_RECORD_COUNT="$(jq '[.Certificate.DomainValidationOptions[] | select(.ResourceRecord != null)] | length' <<<"$CERTIFICATE_JSON")"
  if (( VALIDATION_RECORD_COUNT > 0 )); then
    VALIDATION_READY=1
    break
  fi
  log "Waiting for ACM DNS validation records (${attempt}/20)."
  sleep 3
done
(( VALIDATION_READY == 1 )) || fail "ACM did not expose DNS validation records in time: ${ACM_CERTIFICATE_ARN}"

apply_validation_records() {
  local zone_id="$1"
  local suffix="$2"
  local change_file
  temp_file change_file
  jq --arg suffix "$suffix" '
    {
      Comment: "Fairhelm Systems ACM DNS validation",
      Changes: [
        .Certificate.DomainValidationOptions[]
        | select(.DomainName | endswith($suffix))
        | select(.ResourceRecord != null)
        | {
            Action: "UPSERT",
            ResourceRecordSet: {
              Name: .ResourceRecord.Name,
              Type: .ResourceRecord.Type,
              TTL: 300,
              ResourceRecords: [{Value: .ResourceRecord.Value}]
            }
          }
      ] | unique_by(.ResourceRecordSet.Name)
    }
  ' <<<"$CERTIFICATE_JSON" >"$change_file"
  if (( $(jq '.Changes | length' "$change_file") > 0 )); then
    aws route53 change-resource-record-sets \
      --hosted-zone-id "$zone_id" \
      --change-batch "file://${change_file}" >/dev/null
  fi
}

apply_validation_records "$HOSTED_ZONE_ID_COM" ".com"
apply_validation_records "$HOSTED_ZONE_ID_IN" ".in"
UPDATED_RESOURCES+=("Route53 ACM validation CNAME records")

CERTIFICATE_ISSUED=0
for attempt in $(seq 1 40); do
  CERTIFICATE_STATUS="$(aws acm describe-certificate \
    --region "$ACM_REGION" \
    --certificate-arn "$ACM_CERTIFICATE_ARN" \
    --query Certificate.Status \
    --output text)"
  log "ACM status: ${CERTIFICATE_STATUS} (${attempt}/40)."
  if [[ "$CERTIFICATE_STATUS" == "ISSUED" ]]; then
    CERTIFICATE_ISSUED=1
    break
  fi
  if [[ "$CERTIFICATE_STATUS" == "FAILED" || "$CERTIFICATE_STATUS" == "VALIDATION_TIMED_OUT" ]]; then
    fail "ACM certificate entered terminal state ${CERTIFICATE_STATUS}: ${ACM_CERTIFICATE_ARN}"
  fi
  sleep 15
done

if (( CERTIFICATE_ISSUED == 0 )); then
  log "Certificate validation is still pending. DNS records were created; rerun this script later."
  aws acm describe-certificate \
    --region "$ACM_REGION" \
    --certificate-arn "$ACM_CERTIFICATE_ARN" \
    --query 'Certificate.DomainValidationOptions[].{Domain:DomainName,Status:ValidationStatus,Name:ResourceRecord.Name,Value:ResourceRecord.Value}' \
    --output table
  exit 2
fi

OAC_ID="$(aws cloudfront list-origin-access-controls --output json \
  | jq -r --arg name "$OAC_NAME" \
    '(.OriginAccessControlList.Items // [])[] | select(.Name == $name) | .Id' \
  | sed -n '1p')"

if [[ -z "$OAC_ID" ]]; then
  temp_file OAC_CONFIG_FILE
  jq -n --arg name "$OAC_NAME" '{
    Name: $name,
    Description: "OAC for the Fairhelm Systems marketing site",
    SigningProtocol: "sigv4",
    SigningBehavior: "always",
    OriginAccessControlOriginType: "s3"
  }' >"$OAC_CONFIG_FILE"
  OAC_ID="$(aws cloudfront create-origin-access-control \
    --origin-access-control-config "file://${OAC_CONFIG_FILE}" \
    --query OriginAccessControl.Id \
    --output text)"
  CREATED_RESOURCES+=("CloudFront OAC ${OAC_NAME} (${OAC_ID})")
else
  UPDATED_RESOURCES+=("CloudFront OAC ${OAC_NAME} (${OAC_ID}) reused")
fi

FUNCTION_CODE="infrastructure/cloudfront/viewer-request.js"
[[ -f "$FUNCTION_CODE" ]] || fail "CloudFront Function source is missing: ${FUNCTION_CODE}"

if aws cloudfront describe-function --name "$CF_FUNCTION_NAME" --stage DEVELOPMENT >/dev/null 2>&1; then
  FUNCTION_ETAG="$(aws cloudfront describe-function \
    --name "$CF_FUNCTION_NAME" \
    --stage DEVELOPMENT \
    --query ETag \
    --output text)"
  aws cloudfront update-function \
    --name "$CF_FUNCTION_NAME" \
    --if-match "$FUNCTION_ETAG" \
    --function-config Comment="Canonical redirects and static route rewrites",Runtime=cloudfront-js-2.0 \
    --function-code "fileb://${FUNCTION_CODE}" >/dev/null
  UPDATED_RESOURCES+=("CloudFront Function ${CF_FUNCTION_NAME}")
else
  aws cloudfront create-function \
    --name "$CF_FUNCTION_NAME" \
    --function-config Comment="Canonical redirects and static route rewrites",Runtime=cloudfront-js-2.0 \
    --function-code "fileb://${FUNCTION_CODE}" >/dev/null
  CREATED_RESOURCES+=("CloudFront Function ${CF_FUNCTION_NAME}")
fi

FUNCTION_ETAG="$(aws cloudfront describe-function \
  --name "$CF_FUNCTION_NAME" \
  --stage DEVELOPMENT \
  --query ETag \
  --output text)"
aws cloudfront publish-function \
  --name "$CF_FUNCTION_NAME" \
  --if-match "$FUNCTION_ETAG" >/dev/null
FUNCTION_ARN="$(aws cloudfront describe-function \
  --name "$CF_FUNCTION_NAME" \
  --stage LIVE \
  --query FunctionSummary.FunctionMetadata.FunctionARN \
  --output text)"

CACHE_POLICY_ID="$(aws cloudfront list-cache-policies --type managed --output json \
  | jq -r '.CachePolicyList.Items[] | select(.CachePolicy.CachePolicyConfig.Name == "Managed-CachingOptimized") | .CachePolicy.Id' \
  | sed -n '1p')"
SECURITY_HEADERS_POLICY_ID="$(aws cloudfront list-response-headers-policies --type managed --output json \
  | jq -r '.ResponseHeadersPolicyList.Items[] | select(.ResponseHeadersPolicy.ResponseHeadersPolicyConfig.Name == "Managed-SecurityHeadersPolicy") | .ResponseHeadersPolicy.Id' \
  | sed -n '1p')"
[[ -n "$CACHE_POLICY_ID" ]] || fail "Managed-CachingOptimized policy was not found."
[[ -n "$SECURITY_HEADERS_POLICY_ID" ]] || fail "Managed-SecurityHeadersPolicy was not found."

if [[ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]]; then
  CLOUDFRONT_DISTRIBUTION_ID="$(aws cloudfront list-distributions --output json \
    | jq -r --arg domain "$CANONICAL_DOMAIN" \
      '(.DistributionList.Items // [])[] | select((.Aliases.Items // []) | index($domain)) | .Id' \
    | sed -n '1p')"
fi

S3_ORIGIN_DOMAIN="${SITE_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com"
ALIASES_JSON="$(printf '%s\n' \
  "$CANONICAL_DOMAIN" \
  "www.${CANONICAL_DOMAIN}" \
  "$REDIRECT_DOMAIN_IN" \
  "www.${REDIRECT_DOMAIN_IN}" \
  | jq -R . | jq -s .)"

build_distribution_config() {
  local caller_reference="$1"
  jq -n \
    --arg callerReference "$caller_reference" \
    --arg originId "$ORIGIN_ID" \
    --arg originDomain "$S3_ORIGIN_DOMAIN" \
    --arg oacId "$OAC_ID" \
    --arg functionArn "$FUNCTION_ARN" \
    --arg cachePolicyId "$CACHE_POLICY_ID" \
    --arg responseHeadersPolicyId "$SECURITY_HEADERS_POLICY_ID" \
    --arg certificateArn "$ACM_CERTIFICATE_ARN" \
    --argjson aliases "$ALIASES_JSON" '
    {
      CallerReference: $callerReference,
      Aliases: {Quantity: ($aliases | length), Items: $aliases},
      DefaultRootObject: "index.html",
      Origins: {
        Quantity: 1,
        Items: [{
          Id: $originId,
          DomainName: $originDomain,
          OriginPath: "",
          CustomHeaders: {Quantity: 0},
          S3OriginConfig: {OriginAccessIdentity: ""},
          ConnectionAttempts: 3,
          ConnectionTimeout: 10,
          OriginAccessControlId: $oacId,
          OriginShield: {Enabled: false}
        }]
      },
      OriginGroups: {Quantity: 0},
      DefaultCacheBehavior: {
        TargetOriginId: $originId,
        TrustedSigners: {Enabled: false, Quantity: 0},
        TrustedKeyGroups: {Enabled: false, Quantity: 0},
        ViewerProtocolPolicy: "redirect-to-https",
        AllowedMethods: {
          Quantity: 2,
          Items: ["HEAD", "GET"],
          CachedMethods: {Quantity: 2, Items: ["HEAD", "GET"]}
        },
        SmoothStreaming: false,
        Compress: true,
        LambdaFunctionAssociations: {Quantity: 0},
        FunctionAssociations: {
          Quantity: 1,
          Items: [{EventType: "viewer-request", FunctionARN: $functionArn}]
        },
        FieldLevelEncryptionId: "",
        CachePolicyId: $cachePolicyId,
        ResponseHeadersPolicyId: $responseHeadersPolicyId,
        GrpcConfig: {Enabled: false}
      },
      CacheBehaviors: {Quantity: 0},
      CustomErrorResponses: {
        Quantity: 2,
        Items: [
          {ErrorCode: 403, ResponsePagePath: "/404.html", ResponseCode: "404", ErrorCachingMinTTL: 60},
          {ErrorCode: 404, ResponsePagePath: "/404.html", ResponseCode: "404", ErrorCachingMinTTL: 60}
        ]
      },
      Comment: "Fairhelm Systems marketing site",
      Logging: {Enabled: false, IncludeCookies: false, Bucket: "", Prefix: ""},
      PriceClass: "PriceClass_200",
      Enabled: true,
      ViewerCertificate: {
        CloudFrontDefaultCertificate: false,
        ACMCertificateArn: $certificateArn,
        SSLSupportMethod: "sni-only",
        MinimumProtocolVersion: "TLSv1.2_2021",
        Certificate: $certificateArn,
        CertificateSource: "acm"
      },
      Restrictions: {GeoRestriction: {RestrictionType: "none", Quantity: 0}},
      WebACLId: "",
      HttpVersion: "http2and3",
      IsIPV6Enabled: true,
      Staging: false
    }
  '
}

temp_file DISTRIBUTION_CONFIG_FILE

if [[ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]]; then
  build_distribution_config "fairhelm-$(date +%s)-${RANDOM}" >"$DISTRIBUTION_CONFIG_FILE"
  DISTRIBUTION_RESULT="$(aws cloudfront create-distribution \
    --distribution-config "file://${DISTRIBUTION_CONFIG_FILE}" \
    --output json)"
  CLOUDFRONT_DISTRIBUTION_ID="$(jq -r '.Distribution.Id' <<<"$DISTRIBUTION_RESULT")"
  CLOUDFRONT_DOMAIN="$(jq -r '.Distribution.DomainName' <<<"$DISTRIBUTION_RESULT")"
  CREATED_RESOURCES+=("CloudFront distribution ${CLOUDFRONT_DISTRIBUTION_ID}")
else
  temp_file CURRENT_CONFIG_FILE
  aws cloudfront get-distribution-config \
    --id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --output json >"$CURRENT_CONFIG_FILE"
  DISTRIBUTION_ETAG="$(jq -r '.ETag' "$CURRENT_CONFIG_FILE")"
  CALLER_REFERENCE="$(jq -r '.DistributionConfig.CallerReference' "$CURRENT_CONFIG_FILE")"
  build_distribution_config "$CALLER_REFERENCE" >"$DISTRIBUTION_CONFIG_FILE"
  DISTRIBUTION_RESULT="$(aws cloudfront update-distribution \
    --id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --if-match "$DISTRIBUTION_ETAG" \
    --distribution-config "file://${DISTRIBUTION_CONFIG_FILE}" \
    --output json)"
  CLOUDFRONT_DOMAIN="$(jq -r '.Distribution.DomainName' <<<"$DISTRIBUTION_RESULT")"
  UPDATED_RESOURCES+=("CloudFront distribution ${CLOUDFRONT_DISTRIBUTION_ID}")
fi

DISTRIBUTION_ARN="arn:aws:cloudfront::${ACCOUNT_ID}:distribution/${CLOUDFRONT_DISTRIBUTION_ID}"
temp_file BUCKET_POLICY_FILE
jq -n \
  --arg bucket "$SITE_BUCKET_NAME" \
  --arg distributionArn "$DISTRIBUTION_ARN" '{
    Version: "2012-10-17",
    Statement: [{
      Sid: "AllowCloudFrontServicePrincipalReadOnly",
      Effect: "Allow",
      Principal: {Service: "cloudfront.amazonaws.com"},
      Action: "s3:GetObject",
      Resource: ("arn:aws:s3:::" + $bucket + "/*"),
      Condition: {StringEquals: {"AWS:SourceArn": $distributionArn}}
    }]
  }' >"$BUCKET_POLICY_FILE"
aws s3api put-bucket-policy \
  --bucket "$SITE_BUCKET_NAME" \
  --policy "file://${BUCKET_POLICY_FILE}"
UPDATED_RESOURCES+=("S3 bucket policy scoped to ${CLOUDFRONT_DISTRIBUTION_ID}")

upsert_aliases() {
  local zone_id="$1"
  local apex="$2"
  local alias_file
  temp_file alias_file
  jq -n \
    --arg apex "$apex" \
    --arg www "www.${apex}" \
    --arg target "$CLOUDFRONT_DOMAIN" '{
      Comment: "Fairhelm Systems CloudFront aliases",
      Changes: [
        {Action: "UPSERT", ResourceRecordSet: {Name: $apex, Type: "A", AliasTarget: {HostedZoneId: "Z2FDTNDATAQYW2", DNSName: $target, EvaluateTargetHealth: false}}},
        {Action: "UPSERT", ResourceRecordSet: {Name: $apex, Type: "AAAA", AliasTarget: {HostedZoneId: "Z2FDTNDATAQYW2", DNSName: $target, EvaluateTargetHealth: false}}},
        {Action: "UPSERT", ResourceRecordSet: {Name: $www, Type: "A", AliasTarget: {HostedZoneId: "Z2FDTNDATAQYW2", DNSName: $target, EvaluateTargetHealth: false}}},
        {Action: "UPSERT", ResourceRecordSet: {Name: $www, Type: "AAAA", AliasTarget: {HostedZoneId: "Z2FDTNDATAQYW2", DNSName: $target, EvaluateTargetHealth: false}}}
      ]
    }' >"$alias_file"
  aws route53 change-resource-record-sets \
    --hosted-zone-id "$zone_id" \
    --change-batch "file://${alias_file}" >/dev/null
}

upsert_aliases "$HOSTED_ZONE_ID_COM" "$CANONICAL_DOMAIN"
upsert_aliases "$HOSTED_ZONE_ID_IN" "$REDIRECT_DOMAIN_IN"
UPDATED_RESOURCES+=("Route53 A/AAAA aliases for all four hostnames")

log "Uploading HTML, XML, TXT, and non-hashed assets with revalidation."
aws s3 sync "${OUT_DIR}/" "s3://${SITE_BUCKET_NAME}/" \
  --delete \
  --exclude "_next/*" \
  --exclude "*.md" \
  --cache-control "public,max-age=0,must-revalidate" \
  --only-show-errors

# Markdown alternates (out/**/index.md, generated by scripts/markdown-alternates.ts).
# Uploaded in their own pass so the content type is explicit: the CLI's guess
# for .md is not reliable across platforms, and an agent fetching
# /about/index.md must receive text/markdown.
log "Uploading Markdown alternates as text/markdown."
aws s3 sync "${OUT_DIR}/" "s3://${SITE_BUCKET_NAME}/" \
  --exclude "*" --include "*.md" \
  --content-type "text/markdown; charset=utf-8" \
  --cache-control "public,max-age=0,must-revalidate" \
  --only-show-errors

log "Uploading hashed Next.js assets as immutable."
aws s3 sync "${OUT_DIR}/_next/" "s3://${SITE_BUCKET_NAME}/_next/" \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --only-show-errors
UPDATED_RESOURCES+=("S3 static export upload")

INVALIDATION_ID="$(aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths '/*' \
  --query Invalidation.Id \
  --output text)"
UPDATED_RESOURCES+=("CloudFront invalidation ${INVALIDATION_ID}")

# IndexNow: diff the previous live sitemap against the one just deployed and
# submit only the difference. See scripts/indexnow.ts for the rules. Skips
# quietly when no key file exists in public/; never fails the deploy.
log "Notifying IndexNow of created, updated and removed URLs."
if command -v bun >/dev/null 2>&1; then
  bun scripts/indexnow.ts --previous "$PREVIOUS_SITEMAP" || true
else
  log "bun is not available; skipping IndexNow submission."
fi
rm -f "$PREVIOUS_SITEMAP"

log "Waiting up to 10 minutes for CloudFront deployment."
for attempt in $(seq 1 40); do
  DISTRIBUTION_STATUS="$(aws cloudfront get-distribution \
    --id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --query Distribution.Status \
    --output text)"
  log "CloudFront status: ${DISTRIBUTION_STATUS} (${attempt}/40)."
  [[ "$DISTRIBUTION_STATUS" == "Deployed" ]] && break
  sleep 15
done

log "Resources created"
if ((${#CREATED_RESOURCES[@]})); then
  printf '  + %s\n' "${CREATED_RESOURCES[@]}"
else
  printf '  + none\n'
fi

log "Resources created or updated in place"
if ((${#UPDATED_RESOURCES[@]})); then
  printf '  ~ %s\n' "${UPDATED_RESOURCES[@]}"
else
  printf '  ~ none\n'
fi

log "Deployment outputs"
printf '  Bucket: s3://%s\n' "$SITE_BUCKET_NAME"
printf '  Certificate: %s\n' "$ACM_CERTIFICATE_ARN"
printf '  Distribution ID: %s\n' "$CLOUDFRONT_DISTRIBUTION_ID"
printf '  CloudFront URL: https://%s\n' "$CLOUDFRONT_DOMAIN"
printf '  Canonical URL: https://%s\n' "$CANONICAL_DOMAIN"
printf '  Hosted zone (.com): %s\n' "$HOSTED_ZONE_ID_COM"
printf '  Hosted zone (.in): %s\n' "$HOSTED_ZONE_ID_IN"

if ((${#MANUAL_STEPS[@]})); then
  log "Manual steps"
  printf '  ! %s\n' "${MANUAL_STEPS[@]}"
fi

log "Verification commands"
printf '  curl -I https://%s\n' "$CANONICAL_DOMAIN"
printf '  curl -I https://www.%s\n' "$CANONICAL_DOMAIN"
printf '  curl -I https://%s\n' "$REDIRECT_DOMAIN_IN"
printf '  curl -I https://www.%s\n' "$REDIRECT_DOMAIN_IN"
printf '  curl -I "https://%s/squarecampus?x=1"\n' "$REDIRECT_DOMAIN_IN"
printf '  curl -I https://%s/sitemap.xml\n' "$CANONICAL_DOMAIN"
printf '  curl -I https://%s/robots.txt\n' "$CANONICAL_DOMAIN"
printf '  curl -I https://%s/llms.txt\n' "$CANONICAL_DOMAIN"
printf '  curl -I https://%s/llms-full.txt\n' "$CANONICAL_DOMAIN"
printf '  curl -I https://%s/about/index.md\n' "$CANONICAL_DOMAIN"
