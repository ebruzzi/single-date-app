# Deploying GDPR Webhook Handler to Cloudflare Workers

This app requires a webhook endpoint that can validate Shopify HMAC signatures.
Since the app doesn't store any data, the webhooks simply validate and acknowledge receipt.

## Option 1: Cloudflare Workers (Recommended - FREE)

### Steps:

1. **Sign up for Cloudflare Workers** (free tier):
   - Go to: https://workers.cloudflare.com/
   - Sign up for a free account

2. **Create a new Worker**:
   - Click "Create a Service"
   - Name it: `single-date-validator`
   - Click "Create Service"

3. **Get your Shopify Client Secret**:
   - Go to Partner Dashboard: https://partners.shopify.com/
   - Navigate to your app → App Setup
   - Copy your "Client Secret" (not Client ID)

4. **Deploy the webhook code**:
   - Click "Quick Edit" in your worker
   - Copy the code from `cloudflare-worker.js`
   - Replace `YOUR_CLIENT_SECRET_HERE` with your actual Client Secret
   - Click "Save and Deploy"

5. **Your webhook URL will be**:
   ```
   https://single-date-validator.YOUR-SUBDOMAIN.workers.dev
   ```
   
6. **Update shopify.app.toml** with your actual worker URL:
   ```toml
   customer_deletion_url = "https://single-date-validator.YOUR-SUBDOMAIN.workers.dev/webhooks/customers/redact"
   customer_data_request_url = "https://single-date-validator.YOUR-SUBDOMAIN.workers.dev/webhooks/customers/data_request"
   shop_deletion_url = "https://single-date-validator.YOUR-SUBDOMAIN.workers.dev/webhooks/shop/redact"
   ```

7. **Deploy your app**:
   ```bash
   shopify app deploy --force
   ```

---

## Option 2: Vercel Serverless Functions (Alternative)

If you prefer Vercel, create a file `api/webhooks/gdpr.js`:

```javascript
import crypto from 'crypto';

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const hmac = req.headers['x-shopify-hmac-sha256'];
  const body = JSON.stringify(req.body);
  
  const hash = crypto
    .createHmac('sha256', SHOPIFY_CLIENT_SECRET)
    .update(body, 'utf8')
    .digest('base64');

  if (hash !== hmac) {
    return res.status(401).json({ error: 'Unauthorized - Invalid HMAC' });
  }

  res.status(200).json({ success: true });
}
```

Deploy to Vercel and use: `https://your-project.vercel.app/api/webhooks/gdpr`

---

## Option 3: Netlify Functions (Alternative)

Create `.netlify/functions/webhooks.js`:

```javascript
const crypto = require('crypto');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const hmac = event.headers['x-shopify-hmac-sha256'];
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_CLIENT_SECRET)
    .update(event.body, 'utf8')
    .digest('base64');

  if (hash !== hmac) {
    return { 
      statusCode: 401, 
      body: JSON.stringify({ error: 'Unauthorized - Invalid HMAC' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
```

Deploy to Netlify and use: `https://your-site.netlify.app/.netlify/functions/webhooks`

---

## Why This is Needed

GitHub Pages serves static HTML files and cannot:
- Handle POST requests properly
- Return HTTP 401 for invalid HMAC
- Validate webhook signatures

Shopify requires webhook endpoints to:
- Accept POST requests
- Verify HMAC-SHA256 signatures
- Return HTTP 401 when HMAC is invalid
- Return HTTP 200 when HMAC is valid

Since this app stores no data, the webhook handler simply validates the request and returns success.
