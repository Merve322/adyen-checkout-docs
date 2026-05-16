# Authentication

The Adyen Checkout API uses two authentication methods depending 
on the type of request you are making.

## API Key authentication

All standard requests require an API key passed in a custom 
request header.

X-API-Key: your_api_key_here

Your API key is generated in the Adyen Customer Area under 
**Developers > API credentials**. Each API key is tied to a 
specific merchant account and set of permissions.

### API key best practices

- Never expose your API key in client-side code or public repositories
- Generate separate API keys for test and live environments
- Rotate your API key immediately if it is compromised
- Use allowed origins to restrict which domains can use your key

## Bearer token authentication

Purchase and order endpoints require both an API key and a Bearer 
token simultaneously. The Bearer token is passed in the 
Authorization header.

X-API-Key: your_api_key_here
Authorization: Bearer your_bearer_token_here

This dual authentication requirement adds an extra layer of security 
for endpoints that move money.

## Test credentials

Use your test API key with the test base URL during development:

https://checkout-test.adyen.com/v72

Test credentials never process real payments. Always verify your 
integration in the test environment before switching to live 
credentials.

## Authentication errors

| Status code | Meaning |
|-------------|---------|
| 401 | Missing or invalid API key |
| 403 | Valid API key but insufficient permissions |

If you receive a 401 error, verify that your API key is correctly 
formatted and that you are using the right key for the environment 
you are targeting.
