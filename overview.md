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

## Why Adyen uses a session-based flow

Earlier payment integrations required merchants to collect card
details directly and pass them to a payment processor in a single
request. This placed the full burden of PCI DSS compliance on the
merchant; any server that touches raw card data must meet the
strictest compliance requirements, which are expensive and
operationally complex to maintain.

Adyen's session-based flow solves this by separating the
integration into two distinct concerns.

The first concern is session creation, which happens server-side.
Your server creates a session using your merchant credentials and
the transaction details. At this point, no card data exists yet.
You are simply telling Adyen that a payment is about to happen
and what its parameters are.

The second concern is card data capture, which happens entirely
within Adyen's Drop-in component in the browser. The component
encrypts the card details using Adyen's public key before they
leave the shopper's device. The encrypted values are what get
submitted to your server and onward to Adyen, never the raw
card number.

The result is that raw card data never touches your server at
any point in the flow. This means your PCI DSS scope is
significantly reduced. You handle session parameters and
encrypted blobs, not sensitive card data. Adyen carries the
compliance burden for the parts of the flow that actually
involve card numbers.

This is not unique to Adyen, Stripe Elements and Braintree's
Drop-in UI follow the same architectural principle. It has become
the industry standard for web payment integrations precisely
because it shifts compliance responsibility to the processor
while keeping the developer experience clean.

## Base URLs

| Environment | URL |
|-------------|-----|
| Test | https://checkout-test.adyen.com/v72 |
| Live | https://checkout-live.adyen.com/v72 |

## API versioning

This documentation covers version 72 of the Adyen Checkout API. 
Adyen uses versioned URLs to ensure backward compatibility. Always 
use the latest stable version in production.
