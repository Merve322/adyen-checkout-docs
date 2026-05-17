# Getting Started

This guide walks you through making your first payment using the
Adyen Checkout API. By the end, you will have a working payment
session and understand the complete Drop-in integration flow.

## Prerequisites

Before you begin, make sure you have:

- An Adyen test account. Sign up at https://www.adyen.com
- A test API key from the Adyen Customer Area under
  Developers > API credentials
- A server-side environment to make API calls securely

## Step 1: Create a payment session

Make a POST request to /sessions from your server. This creates
a secure session that initialises the Drop-in component on your
frontend.

**Request:**

```http
POST https://checkout-test.adyen.com/v72/sessions
```

```json
{
  "merchantAccount": "YourMerchantAccount",
  "amount": 1000,
  "currency": "USD",
  "returnUrl": "https://yoursite.com/checkout/complete"
}
```

**Response:**

```json
{
  "id": "CS-Adyen-1234567890",
  "sessionData": "Ab02b4c...",
  "expiresAt": "2024-01-15T12:00:00Z"
}
```

Store the `id` and `sessionData`; you will pass these to the
Drop-in component in the next step.

## Step 2: Retrieve Available Payment Methods

Before rendering Drop-in, fetch the payment methods available
to your shopper.

**Request:**

```http
POST https://checkout-test.adyen.com/v72/paymentMethods
```

```json
{
  "merchantAccount": "YourMerchantAccount",
  "countryCode": "US",
  "amount": 1000,
  "currency": "USD"
}
```

**Response:**

```json
{
  "paymentMethods": [
    {
      "type": "scheme",
      "name": "Credit Card"
    }
  ]
}
```

## Step 3: Submit the payment

Once the shopper has entered their payment details through
Drop-in, submit the payment from your server.

**Request:**

```http
POST https://checkout-test.adyen.com/v72/payments
```

```json
{
  "merchantAccount": "YourMerchantAccount",
  "amount": 1000,
  "currency": "USD",
  "reference": "ORDER-12345",
  "returnUrl": "https://yoursite.com/checkout/complete",
  "paymentMethod": {
    "type": "scheme",
    "encryptedCardNumber": "adyenjs_0_1_25$...",
    "encryptedExpiryMonth": "adyenjs_0_1_25$...",
    "encryptedExpiryYear": "adyenjs_0_1_25$...",
    "encryptedSecurityCode": "adyenjs_0_1_25$..."
  }
}
```

**Response:**

```json
{
  "pspReference": "882610755394031G",
  "resultCode": "Authorised",
  "merchantReference": "ORDER-12345"
}
```

## Step 4: Handle the result

Check the `resultCode` in the response and update your order
system accordingly.

| Result code | Meaning | Action |
|-------------|---------|--------|
| Authorised | Payment successful | Fulfil the order |
| Refused | Payment declined | Ask shopper to retry |
| RedirectShopper | 3D Secure required | Redirect to returnUrl |
| Pending | Awaiting confirmation | Poll for status update |
| Error | Processing error | Display error message |

## Troubleshooting your first integration

**The Drop-in component is not initialising**

This almost always means the `sessionData` field was not passed
correctly. The Drop-in component expects `sessionData` as a raw
string, not parsed as a JSON object. If you parse the sessions
response before passing it to Drop-in, the component will fail
silently or throw a configuration error. Pass the `sessionData`
value exactly as returned from the API.

**Payment is returning Refused immediately**

A Refused result on your first test does not mean your integration
is broken. It means the payment was processed and declined. Use
Adyen's test card numbers to simulate specific outcomes; the
number 4111 1111 1111 1111 will return Authorised, while
4000 0000 0000 0002 will return Refused. If you are testing with
a real card number in the test environment, it will always be
refused because test environments do not process real cards.

**You are receiving a 422 on payment submission**

A 422 Unprocessable Entity on the /payments endpoint almost always
means your merchant account is not enabled for the currency or
payment method you are requesting. In the Adyen Customer Area,
verify that your merchant account has the relevant payment methods
activated and that the currency is supported for your region.
Unlike a 400 which indicates a malformed request, a 422 means the
request was understood but could not be processed given your
account configuration.

**The returnUrl is not redirecting correctly after 3D Secure**

If your shopper is completing 3D Secure authentication but not
landing on your expected confirmation page, verify that your
returnUrl exactly matches a URL registered in your Adyen Customer
Area under allowed origins. Adyen validates the returnUrl against
your registered origins as a security measure — an unregistered
URL will cause the redirect to fail silently.

## Next steps

- Set up webhooks to receive real-time payment notifications
- Implement capture for auth-capture payment flows
- Test edge cases using Adyen test card numbers
