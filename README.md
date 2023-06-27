# CORS Anywhere (Blitzy fork)
This is a fork of the popular CORS Anywhere proxy. You can read the original [README.md over here](./ORIGINALREADME.md)

This fork focuses on expanding customizable options from environment variables and
re-working things to run in a pure node.js environment (not deployed through Heroku).

| Environment Variable | Description | Default |
| -------- | -------- | --------- |
| HOST | Server host | 0.0.0.0 |
| PORT | Server listening port | 8080 |
| KEY | File path for the SSL key. If not provided, `http` protocol will be used. | |
| CERT | File path for the SSL cert. If not provided, `http` protocol will be used. | |
| VERIFY_SSL | If true, will verify the validaty of the SSL certs. | true |
| CORSANYWHERE_BLACKLIST | If set, requests whose origin is listed are blocked.<br><br>Example: `https://abuse.example.com,http://badactors.net` | |
| CORSANYWHERE_WHITELIST | If set, requests whose origin is not listed are blocked. If this list is empty, all origins are allowed.<br><br>Example: `https://good.example.com,http://goodactors.net` | |
| CORSANYWHERE_RATELIMIT | Format: `<max requests per period> <period in minutes> <non-ratelimited hosts>`<br><br>For example, to blacklist abuse.example.com and rate-limit everything to 50 requests per 3 minutes, except for my.example.com and my2.example.com (which may be unlimited), use:<br>`50 3 my.example.com my2.example.com` | |

## NPM Run Scripts

| Script | Description |
| --------- | ---------- |
| npm run start | Start up CORS Anywhere server in http mode |
| npm run start:secure | Start up CORS Anywhere server in https mode. Will look for `corsanywhere-cert.crt` and `corsanywhere-key.pem` to setup SSL. |
| npm run generate-cert | Generate Self signed certificates for SSL. Uses `openssl` and will the config file `generate-cert.cnf`.