# Netlify Deployment

This directory contains serverless functions for GDPR compliance webhooks.

## Functions

- `customers_data_request.js` - Handles customer data request webhook
- `customers_redact.js` - Handles customer data deletion webhook  
- `shop_redact.js` - Handles shop data deletion webhook

## Environment Variables

Set in Netlify dashboard:

- `SHOPIFY_API_SECRET` - Your Shopify app's API secret key (for HMAC verification)

## How it works

Each function:
1. Verifies the request method is POST
2. Checks for HMAC header presence
3. Validates HMAC signature (returns 401 if invalid)
4. Returns 200 with acknowledgment (app stores no data)
