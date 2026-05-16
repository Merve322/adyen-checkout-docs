# Adyen Checkout API Overview

The Adyen Checkout API enables businesses to accept payments online 
through a flexible, secure Drop-in integration. It handles the entire 
payment lifecycle; from displaying available payment methods to 
processing transactions and capturing funds.

## Who this API is for

The Adyen Checkout API is built for developers integrating payment 
functionality into web applications. It is suitable for e-commerce 
platforms, SaaS billing systems, and marketplace payment flows.

## What you can do with this API

- Display payment methods available to a shopper based on their 
  country and currency
- Create secure payment sessions that initialize the Drop-in component
- Process card payments with end-to-end encryption
- Separate payment authorization from capture for flexible 
  fulfillment flows
- Handle 3D Secure authentication automatically

## How it works

The Adyen Checkout API follows a session-based flow:

1. Your server creates a payment session using your merchant 
   credentials and the transaction details
2. The session data is passed to the Drop-in component on your 
   frontend
3. The shopper selects a payment method and enters their details
4. The Drop-in component encrypts the card data and submits 
   the payment
5. Adyen processes the transaction and returns a result code
6. Your server handles the result and updates your order system

## Base URLs

| Environment | URL |
|-------------|-----|
| Test | https://checkout-test.adyen.com/v72 |
| Live | https://checkout-live.adyen.com/v72 |

## API versioning

This documentation covers version 72 of the Adyen Checkout API. 
Adyen uses versioned URLs to ensure backward compatibility. Always 
use the latest stable version in production.
