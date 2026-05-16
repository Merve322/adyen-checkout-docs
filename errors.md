# Error Codes

The Adyen Checkout API uses standard HTTP status codes and 
result codes to communicate the outcome of every request.

## HTTP status codes

| Status code | Meaning |
|-------------|---------|
| 200 | Request succeeded |
| 201 | Resource created successfully |
| 400 | Bad request. Missing or invalid parameters |
| 401 | Unauthorized. Invalid or missing API key |
| 403 | Forbidden. Valid key but insufficient permissions |
| 422 | Unprocessable entity. Invalid merchant account |
| 500 | Internal server error. Contact Adyen support |

## Payment result codes

Result codes are returned in the response body of the /payments 
endpoint. They describe the outcome of the payment attempt.

| Result code | Meaning | Recommended action |
|-------------|---------|-------------------|
| Authorised | Payment approved | Fulfil the order |
| Refused | Payment declined by issuer | Ask shopper to retry with a different card |
| RedirectShopper | Additional authentication required | Redirect shopper to the returnUrl |
| Pending | Payment is being processed | Wait for webhook notification |
| Error | Unexpected error occurred | Display a generic error and retry |
| Cancelled | Payment was cancelled | Return shopper to checkout |

## Common error scenarios

### Missing merchantAccount

If you omit the merchantAccount field from any request you will 
receive a 400 error. Every request must include your Adyen 
merchant account name exactly as it appears in the Customer Area.

### Invalid API key

A 401 error means your API key is missing, malformed, or belongs 
to a different environment. Verify you are using your test API key 
with the test base URL and your live API key with the live base URL.

### Amount formatting errors

Sending amount as a decimal such as 10.00 instead of an integer 
in minor units such as 1000 will result in a 400 error. Always 
convert your amount to minor units before sending.

### Expired session

Payment sessions expire after a set period. If you receive an 
error referencing an invalid or expired session, create a new 
session and reinitialize the Drop-in component.

## Getting help

If you encounter errors not listed here, contact Adyen Developer 
Support at https://docs.adyen.com or raise a ticket in the 
Adyen Customer Area.
