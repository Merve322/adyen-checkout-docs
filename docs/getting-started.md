# Getting Started

This guide walks you through making your first payment using the 
Adyen Checkout API. By the end you will have a working payment 
session and understand the complete Drop-in integration flow.

## Prerequisites

Before you begin, make sure you have:

- An Adyen test account. Sign up at https://www.adyen.com
- A test API key from the Adyen Customer Area under 
  Developers > API credentials
- A server-side environment to make API calls securely

## Step 1: Create a payment session

Make a POST request to /sessions from your server. This creates 
a secure session that initializes the Drop-in component on your 
frontend.

Request:

POST https://checkout-test.adyen.com/v72/sessions

{
  "merchantAccount": "YourMerchantAccount",
  "amount": 1000,
  "currency": "USD",
  "returnUrl": "https://yoursite.com/checkout/complete"
}

Response:

{
  "id": "CS-Adyen-1234567890",
  "sessionData": "Ab02b4c...",
  "expiresAt": "2024-01-15T12:00:00Z"
}

Store the id and sessionData — you will pass these to the 
Drop-in component in the next step.

## Step 2: Retrieve available payment methods

Before rendering Drop-in, fetch the payment methods available 
to your shopper.

Request:

POST https://checkout-test.adyen.com/v72/paymentMethods

{
  "merchantAccount": "YourMerchantAccount",
  "countryCode": "US",
  "amount": 1000,
  "currency": "USD"
}

Response:

{
  "paymentMethods": [
    {
      "type": "scheme",
      "name": "Credit Card"
    }
  ]
}

## Step 3: Submit the payment

Once the shopper has entered their payment details through 
Drop-in, submit the payment from your server.

Request:

POST https://checkout-test.adyen.com/v72/payments

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

Response:

{
  "pspReference": "882610755394031G",
  "resultCode": "Authorised",
  "merchantReference": "ORDER-12345"
}

## Step 4: Handle the result

Check the resultCode in the response and update your order 
system accordingly.

| Result code | Meaning | Action |
|-------------|---------|--------|
| Authorised | Payment successful | Fulfil the order |
| Refused | Payment declined | Ask shopper to retry |
| RedirectShopper | 3D Secure required | Redirect to returnUrl |
| Pending | Awaiting confirmation | Poll for status update |
| Error | Processing error | Display error message |

## Next steps

- Set up webhooks to receive real-time payment notifications
- Implement capture for auth-capture payment flows
- Test edge cases using Adyen test card numbers