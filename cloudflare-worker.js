// Cloudflare Worker for Shopify GDPR Webhooks
// Deploy this at: https://workers.cloudflare.com/

// Your Shopify app's client secret (get from Partner Dashboard)
const SHOPIFY_CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';

async function verifyWebhook(request) {
  const hmacHeader = request.headers.get('X-Shopify-Hmac-Sha256');
  
  if (!hmacHeader) {
    return false;
  }
  
  const body = await request.text();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(SHOPIFY_CLIENT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(body)
  );
  
  const hashArray = Array.from(new Uint8Array(signature));
  const hashBase64 = btoa(String.fromCharCode(...hashArray));
  
  return hashBase64 === hmacHeader;
}

async function handleRequest(request) {
  // Only accept POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  // Verify HMAC
  const isValid = await verifyWebhook(request.clone());
  
  if (!isValid) {
    return new Response('Unauthorized - Invalid HMAC', { status: 401 });
  }
  
  // HMAC is valid - webhook accepted
  // Since this app doesn't store data, we just acknowledge receipt
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
