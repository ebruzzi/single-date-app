const crypto = require('crypto');

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get HMAC from headers
  const hmacHeader = event.headers['x-shopify-hmac-sha256'];
  
  // If no HMAC header, return 401 Unauthorized
  if (!hmacHeader) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized - Missing HMAC' })
    };
  }

  // Verify HMAC (using Shopify app secret)
  const shopifySecret = process.env.SHOPIFY_API_SECRET || '';
  
  if (shopifySecret) {
    const hash = crypto
      .createHmac('sha256', shopifySecret)
      .update(event.body, 'utf8')
      .digest('base64');

    // If HMAC doesn't match, return 401 Unauthorized
    if (hash !== hmacHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized - Invalid HMAC' })
      };
    }
  }

  // HMAC is valid (or not configured for testing)
  // This app doesn't store customer data, so we just acknowledge the request
  console.log('Customer redaction request received - No data to redact (app stores no customer data)');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      message: 'Request acknowledged. This app does not store any customer data to redact.'
    })
  };
};
