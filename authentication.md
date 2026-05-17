# Authentication

The Adyen Checkout API uses two authentication methods depending 
on the type of request you are making.

## API Key Authentication

All standard requests require an API key passed in a custom 
request header.

X-API-Key: your_api_key_here

Your API key is generated in the Adyen Customer Area under 
**Developers > API credentials**. Each API key is tied to a 
specific merchant account and set of permissions.

### API Key Best Practices

- Never expose your API key in client-side code or public repositories
- Generate separate API keys for test and live environments
- Rotate your API key immediately if it is compromised
- Use allowed origins to restrict which domains can use your key

## Bearer Token Authentication

Purchase and order endpoints require both an API key and a Bearer 
token simultaneously. The Bearer token is passed in the 
Authorization header.

X-API-Key: your_api_key_here
Authorization: Bearer your_bearer_token_here

This dual authentication requirement adds an extra layer of security 
for endpoints that move money.

## Test Credentials

Use your test API key with the test base URL during development:

https://checkout-test.adyen.com/v72

Test credentials never process real payments. Always verify your 
integration in the test environment before switching to live 
credentials.

## Authentication Errors

| Status code | Meaning |
|-------------|---------|
| 401 | Missing or invalid API key |
| 403 | Valid API key but insufficient permissions |

If you receive a 401 error, verify that your API key is correctly 
formatted and that you are using the right key for the environment 
you are targeting.

## Common Authentication Mistakes

**1. Using the Wrong Key for the Environment**

Adyen maintains completely separate API keys for test and live
environments. A live key will not work against the test base URL
and vice versa. When you receive a 401 error, always verify two
things: that your key is correctly copied with no trailing spaces,
and that you are using the test key with the test URL and the live
key with the live URL. Adyen's 401 response does not specify which
of these is wrong.

**2. Exposing Your API Key in Frontend Code**

Your API key must never appear in JavaScript that runs in the
browser. It will be visible in your page source and can be
extracted by anyone. All requests to the Adyen Checkout API must
originate from your server. The Drop-in component handles the
shopper-facing UI in the browser, but the API calls happen
server-side.

**3. Forgetting the Bearer Token on Purchase Endpoints**

The dual authentication requirement, API key plus Bearer token,
applies specifically to endpoints that initiate or modify payments.
A common mistake is sending only the API key and receiving a 401
without understanding why, since the error response does not always
specify which header is missing. If your payment submission is
returning 401 despite a valid API key, check that your
Authorization header is present and correctly formatted.
