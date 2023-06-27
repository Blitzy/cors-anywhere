var fs = require('fs');

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;
// Wether or not to verify SSL certs with the VERIFY_SSL environment varable
var verifySSL = process.env.VERIFY_SSL || true;

if (verifySSL === 'true') {
  verifySSL = true;
} else if (verifySSL === 'false') {
  verifySSL = false;
}

// The filepath to the SSL key (for https)
var key = process.env.KEY;
// The filepath to the SSL cert (for https)
var cert = process.env.CERT;

// Grab the blacklist from the command-line so that we can update the blacklist without deploying
// again. CORS Anywhere is open by design, and this blacklist is not used, except for countering
// immediate abuse (e.g. denial of service). If you want to block all origins except for some,
// use originWhitelist instead.
var originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);
function parseEnvList(env) {
  if (!env) {
    return [];
  }
  return env.split(',');
}

var httpsOptions;

if (key && cert) {
  httpsOptions = {
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
  }
}

// Set up rate-limiting to avoid abuse of the public CORS Anywhere server.
var checkRateLimit = require('./lib/rate-limit')(process.env.CORSANYWHERE_RATELIMIT);

var cors_proxy = require('./lib/cors-anywhere');
cors_proxy.createServer({
  originBlacklist: originBlacklist,
  originWhitelist: originWhitelist,
  requireHeader: [],
  checkRateLimit: checkRateLimit,
  removeHeaders: [ 'cookie', 'cookie2' ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    secure: false
  },
  httpsOptions,
}).listen(port, host, function() {
  const protocol = key && cert ? 'https' : 'http';
  console.log(`Running CORS Anywhere on ${protocol}://${host}:${port}`);
});