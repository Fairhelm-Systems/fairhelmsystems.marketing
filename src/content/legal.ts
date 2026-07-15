import type { LegalSection } from "@/components/site/legal-document";
import { siteConfig } from "@/lib/site-config";

export const legalUpdated = "15 July 2026";

export const privacySections = [
  {
    id: "company-and-scope",
    title: "Company and scope",
    paragraphs: [
      `This notice covers the public Fairhelm Systems marketing website. ${siteConfig.legalName} is the intended legal entity and its incorporation is in progress. Statutory particulars, including the corporate identity number and GSTIN, will be added after they are issued.`,
      "Product deployments, pilots, and contracted services require scope-specific privacy, security, and data-processing terms. Those signed terms take precedence for the relevant engagement.",
    ],
  },
  {
    id: "website-data",
    title: "Data processed by this website",
    paragraphs: [
      "At launch, this static website does not provide user accounts, analytics instrumentation, advertising pixels, or a server-backed contact form. It does not intentionally collect student, parent, staff, or customer operational records.",
      "The infrastructure that delivers and protects the site may process standard request metadata such as IP address, user agent, timestamp, requested path, response status, and security signals. This is used for delivery, reliability, abuse prevention, and incident investigation.",
    ],
  },
  {
    id: "email-contact",
    title: "Contact by email",
    paragraphs: [
      "If you contact Fairhelm by email, the information you choose to send is used to understand and respond to your inquiry, assess a potential engagement, and maintain appropriate business records.",
      "Do not send credentials, student records, payment data, government identifiers, health information, or other sensitive material in an initial email. A governed transfer method should be agreed before confidential data is shared.",
    ],
  },
  {
    id: "customer-and-product-data",
    title: "Customer and product data",
    paragraphs: [
      "Customer data belongs to the applicable school, trust, institution, or contracting customer. Fairhelm intends to process that data only within an approved service, documented purpose, and agreed authority boundary.",
    ],
    bullets: [
      "Fairhelm does not sell student or parent data.",
      "Fairhelm does not use customer data to train AI systems unless that use is explicitly contracted, approved, and governed.",
      "Product-specific roles, purposes, subprocessors, locations, retention, deletion, and assistance obligations must be documented in the applicable agreement.",
    ],
  },
  {
    id: "service-providers-and-retention",
    title: "Service providers and retention",
    paragraphs: [
      "Cloud, content-delivery, security, communications, and professional service providers may process limited information where necessary to operate the website or respond to an inquiry. Access should remain proportionate to the assigned purpose.",
      "Information should be retained only for an appropriate operational, security, legal, or contractual purpose, then deleted or anonymized where reasonably possible. Contracted product data follows the retention and deletion terms agreed with the customer.",
    ],
  },
  {
    id: "children-and-schools",
    title: "Children and school communities",
    paragraphs: [
      "This marketing website is directed to institutional decision-makers and professional audiences. It is not designed for children to submit personal data directly. Schools, trusts, parents, and students should not use this public site to transmit operational records.",
    ],
  },
  {
    id: "requests-and-questions",
    title: "Requests and questions",
    paragraphs: [
      `Privacy questions and requests concerning this public website may be sent to ${siteConfig.contactEmail}. Fairhelm may need to verify identity, authority, and the relevant context before acting on a request.`,
      "This interim notice will be formally reviewed after incorporation and before the website begins material personal-data collection or a production service is offered under general public terms.",
    ],
  },
] satisfies readonly LegalSection[];

export const termsSections = [
  {
    id: "status-and-scope",
    title: "Status and scope",
    paragraphs: [
      `These interim terms govern ordinary access to the public Fairhelm Systems website. ${siteConfig.legalName} is the intended legal entity and its incorporation is in progress. Final statutory particulars and formally reviewed terms will be published when available.`,
      "Using this website does not create a customer, partner, employment, fiduciary, or advisory relationship with Fairhelm.",
    ],
  },
  {
    id: "website-purpose",
    title: "Website purpose",
    paragraphs: [
      "This site provides general information about Fairhelm Systems, the SquareCampus product direction, data engineering services, dashboard work, and governed intelligence principles. Public content may be changed, corrected, expanded, or withdrawn without notice.",
    ],
  },
  {
    id: "product-and-service-descriptions",
    title: "Product and service descriptions",
    paragraphs: [
      "Product direction, interface examples, diagrams, operating models, and capability descriptions are illustrative unless confirmed in a signed agreement. Availability, maturity, implementation sequence, service levels, support, price, data location, and control commitments depend on the relevant contract.",
      "No public page should be read as a promise that a feature is production-ready, generally available, or suitable for a specific institution.",
    ],
  },
  {
    id: "permitted-use",
    title: "Permitted use",
    paragraphs: [
      "You may access and share links to public pages for lawful evaluation, research, discussion, and ordinary business communication. Fair use of short excerpts should preserve context, attribution, and any applicable rights.",
    ],
  },
  {
    id: "prohibited-use",
    title: "Prohibited use",
    paragraphs: [
      "Do not attempt unauthorized access, disrupt availability, introduce malicious code, evade security controls, impersonate Fairhelm, misrepresent public content, infringe rights, or scrape at a rate that materially degrades the service.",
      "The Acceptable Use Policy gives a clearer public statement of these boundaries. Contracted systems may impose additional role, security, and usage restrictions.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "The Fairhelm Systems and SquareCampus names, visual identities, site content, software concepts, and original materials are reserved to their applicable owners. Third-party names and marks remain the property of their respective owners.",
      "No licence or transfer of rights is granted except the limited ability to access the public website in accordance with these terms and applicable law.",
    ],
  },
  {
    id: "information-and-advice",
    title: "Information, advice, and third-party links",
    paragraphs: [
      "Public content is general information, not legal, tax, accounting, compliance, security, procurement, or other professional advice. Obtain qualified advice for your circumstances.",
      "Third-party links are provided for context or convenience and do not mean Fairhelm controls, endorses, or warrants the linked service or content.",
    ],
  },
  {
    id: "availability-and-liability",
    title: "Availability and responsibility",
    paragraphs: [
      "The public site may contain errors or become unavailable. To the extent permitted by applicable law, it is provided without implied guarantees and Fairhelm is not responsible for decisions made solely from public marketing content.",
      "Nothing here limits a responsibility that cannot lawfully be limited. A signed customer agreement governs responsibility for a contracted product or service.",
    ],
  },
  {
    id: "agreements-changes-contact",
    title: "Signed agreements, changes, and contact",
    paragraphs: [
      `If these public terms conflict with a signed agreement, the signed agreement controls for its subject matter. Questions may be directed to ${siteConfig.contactEmail}. Material updates will be reflected on this page with a revised date.`,
    ],
  },
] satisfies readonly LegalSection[];

export const acceptableUseSections = [
  {
    id: "scope",
    title: "Scope",
    paragraphs: [
      "This interim policy states the baseline for using Fairhelm's public website. Contracted products, prototypes, pilots, APIs, and managed services may have additional restrictions documented in their applicable agreements and operating rules.",
    ],
  },
  {
    id: "responsible-use",
    title: "Responsible use",
    paragraphs: [
      "Use the public site for lawful evaluation, research, communication, and reference. Respect technical boundaries, intellectual property, privacy, confidentiality, and the rights of other people and institutions.",
    ],
  },
  {
    id: "prohibited-conduct",
    title: "Prohibited conduct",
    paragraphs: [
      "You must not use the website or any Fairhelm service to facilitate harm, deceive people, violate rights, compromise systems, or bypass institutional governance.",
    ],
    bullets: [
      "Attempting unauthorized access, privilege escalation, security-control evasion, or credential abuse.",
      "Introducing malware, destructive code, abusive traffic, denial-of-service activity, or material interference with availability.",
      "Collecting personal data without lawful authority or sending sensitive school, student, parent, employee, or financial records through an unapproved channel.",
      "Impersonating Fairhelm or another person, misrepresenting product capabilities, or presenting public content out of context in a deceptive way.",
      "Using automation or scraping at a rate that degrades service, defeats controls, or violates applicable law or contractual restrictions.",
    ],
  },
  {
    id: "security-research",
    title: "Security research and reporting",
    paragraphs: [
      `Do not test, exploit, or publish a suspected vulnerability in a way that increases risk to users or systems. Report a concern privately to ${siteConfig.contactEmail} with enough detail for responsible assessment, and do not include live credentials or unnecessary personal data.`,
      "A public report does not create a bug-bounty promise, safe-harbour commitment, or entitlement to access systems beyond the authority you already possess.",
    ],
  },
  {
    id: "customer-responsibilities",
    title: "Customer and authorized-user responsibilities",
    paragraphs: [
      "Where a service is provided under contract, customers are responsible for authorized-user administration, accurate instructions, lawful data collection, appropriate notices, role assignments, credential protection, and timely reporting of misuse. Fairhelm's responsibilities are defined in the signed agreement.",
    ],
  },
  {
    id: "response-and-changes",
    title: "Response and changes",
    paragraphs: [
      "Fairhelm may investigate suspected misuse, restrict access within its authority, preserve relevant evidence, or cooperate with the customer and lawful authorities where appropriate. Contract-specific suspension and termination rights are governed by the signed agreement.",
      "This policy will be formally reviewed after incorporation and as Fairhelm services mature.",
    ],
  },
] satisfies readonly LegalSection[];

export const aiPolicySections = [
  {
    id: "scope-and-status",
    title: "Scope and status",
    paragraphs: [
      "This page describes Fairhelm's public AI and governed-intelligence posture. It is not a claim that every described capability is complete or generally available. Product scope, controls, and responsibilities must be confirmed in the applicable agreement.",
    ],
  },
  {
    id: "aegis-direction",
    title: "AEGIS product direction",
    paragraphs: [
      "AEGIS means Adaptive Enterprise Governance & Intelligence System. It is the governed intelligence direction for SquareCampus: helping authorized people ask operational questions and understand evidence without bypassing the institution's roles, approvals, or accountability.",
    ],
    bullets: [
      "Read-only first.",
      "RBAC-aware and scoped to the requesting user's authority.",
      "Audit-backed and designed to make evidence and reasoning reviewable.",
      "No autonomous writes in the v1 posture.",
    ],
  },
  {
    id: "human-oversight",
    title: "Human authority and oversight",
    paragraphs: [
      "AI output can be incomplete, incorrect, or unsuitable for a specific decision. A qualified human remains responsible for reviewing context, exercising judgment, and approving any consequential action.",
      "Fairhelm does not present generated output as a substitute for institutional policy, professional advice, statutory responsibility, or authorized decision-making.",
    ],
  },
  {
    id: "data-and-training",
    title: "Customer data and model training",
    paragraphs: [
      "Fairhelm does not sell student or parent data. Customer data is not used to train AI models unless that use is separately and explicitly contracted, approved, and governed. A customer engagement must define permitted data, purposes, providers, retention, access, and controls.",
    ],
  },
  {
    id: "responsible-design",
    title: "Responsible design principles",
    paragraphs: [
      "Fairhelm's direction is to minimize data, respect role and tenant boundaries, make limitations visible, preserve reviewable records, and test high-risk workflows before expanding capability.",
    ],
    bullets: [
      "Use AI where it reduces responsible decision time, not where it adds theatre.",
      "Prefer bounded assistance over ambiguous autonomy.",
      "Expose uncertainty, source context, and material limits where practical.",
      "Provide a route for human correction, escalation, and governance review.",
    ],
  },
  {
    id: "public-agents-and-crawlers",
    title: "Public AI agents and crawlers",
    paragraphs: [
      "Public agents may use crawlable content subject to the Website Terms, robots instructions, applicable law, and intellectual-property rights. The /ai, /llms.txt, and /llms-full.txt resources identify canonical public context; they do not grant access to non-public systems or customer data.",
    ],
  },
  {
    id: "questions-and-review",
    title: "Questions and review",
    paragraphs: [
      `Questions about the AI posture may be sent to ${siteConfig.contactEmail}. This interim policy will be reviewed as product architecture, providers, applicable rules, and contractual models are finalized.`,
    ],
  },
] satisfies readonly LegalSection[];

export const dataProcessingSections = [
  {
    id: "public-overview",
    title: "Public overview, not a DPA",
    paragraphs: [
      "This page explains Fairhelm's intended approach to contracted data processing. It is not a signed Data Processing Addendum, does not appoint Fairhelm as a processor, and does not create instructions or service obligations by itself.",
      "A production engagement that involves personal data should include a scope-appropriate agreement reviewed against the actual product, data flows, roles, locations, providers, risks, and applicable law.",
    ],
  },
  {
    id: "roles-and-instructions",
    title: "Roles and documented instructions",
    paragraphs: [
      "The parties' roles depend on the facts of the engagement. Where Fairhelm processes personal data for a customer, it intends to act only on documented, lawful instructions and for the agreed service purpose. Fairhelm may act in another role for limited business administration or legal obligations where the applicable agreement and law permit.",
    ],
  },
  {
    id: "data-and-people",
    title: "Data and people in scope",
    paragraphs: [
      "The agreement should identify relevant people and data categories rather than rely on a generic list. Depending on the service, these may include institutional contacts, staff, students, parents or guardians, applicants, vendors, operational records, usage events, and support communications.",
      "Sensitive or high-risk data should not be included unless it is necessary, explicitly approved, and protected by controls appropriate to the context.",
    ],
  },
  {
    id: "fairhelm-obligations",
    title: "Fairhelm obligations under contract",
    paragraphs: [
      "A signed agreement may define confidentiality, access control, security measures, assistance, audit information, incident communication, subprocessors, transfer arrangements, return or deletion, and end-of-service handling. The exact obligations must match the service actually delivered.",
      "This public page does not promise a particular certification, data location, deletion period, recovery target, or incident-notification deadline.",
    ],
  },
  {
    id: "customer-responsibilities",
    title: "Customer responsibilities",
    paragraphs: [
      "Customers remain responsible for the lawfulness of their collection and instructions, required notices and permissions, data accuracy, authorized-user administration, role assignments, configuration decisions, and responding to people where the customer holds that responsibility.",
    ],
  },
  {
    id: "subprocessors-and-location",
    title: "Subprocessors and processing locations",
    paragraphs: [
      "Cloud and specialist providers may support a contracted service. The applicable agreement should identify the relevant subprocessors or an update mechanism, the purpose of their processing, and the agreed location or transfer safeguards where required.",
      "No India-only or other residency commitment should be inferred from this public website; residency is an architectural and contractual decision for the specific engagement.",
    ],
  },
  {
    id: "retention-deletion-incidents",
    title: "Retention, deletion, and incidents",
    paragraphs: [
      "Retention and deletion should follow documented customer instructions, service needs, legal requirements, and technically reasonable backup cycles. Incident responsibilities, contacts, investigation cooperation, and notification expectations should be stated in the signed agreement.",
    ],
  },
  {
    id: "request-a-dpa",
    title: "Request engagement-specific terms",
    paragraphs: [
      `Organizations evaluating a pilot or production engagement may contact ${siteConfig.contactEmail} to discuss the actual data flow and the documents required. A final DPA should follow technical discovery rather than precede it with invented assurances.`,
    ],
  },
] satisfies readonly LegalSection[];
