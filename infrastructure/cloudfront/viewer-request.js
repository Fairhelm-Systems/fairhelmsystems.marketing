var CANONICAL_HOST = "fairhelmsystems.com";
var REDIRECT_HOSTS = {
  "www.fairhelmsystems.com": true,
  "fairhelmsystems.in": true,
  "www.fairhelmsystems.in": true,
};

function serializeQuery(querystring) {
  var pairs = [];

  for (var key in querystring) {
    if (!Object.prototype.hasOwnProperty.call(querystring, key)) {
      continue;
    }

    var item = querystring[key];
    var encodedKey = encodeURIComponent(key);

    if (item.multiValue) {
      for (var index = 0; index < item.multiValue.length; index += 1) {
        pairs.push(
          encodedKey + "=" + encodeURIComponent(item.multiValue[index].value),
        );
      }
    } else {
      pairs.push(encodedKey + "=" + encodeURIComponent(item.value || ""));
    }
  }

  return pairs.length ? "?" + pairs.join("&") : "";
}

function handler(event) {
  var request = event.request;
  var hostHeader = request.headers.host;
  var host = hostHeader ? hostHeader.value.toLowerCase() : CANONICAL_HOST;

  if (REDIRECT_HOSTS[host]) {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: {
          value:
            "https://" +
            CANONICAL_HOST +
            request.uri +
            serializeQuery(request.querystring),
        },
        "cache-control": { value: "public, max-age=300" },
      },
    };
  }

  if (request.uri === "/") {
    request.uri = "/index.html";
    return request;
  }

  if (/\.[^/]+$/.test(request.uri)) {
    return request;
  }

  request.uri = request.uri.replace(/\/$/, "") + "/index.html";
  return request;
}
