# Converting to Public Distribution App

## Why?
Custom apps require Shopify Plus for Functions.
Public apps (even unlisted/free) work on ALL plans including Basic/Grow.

## Steps:

### 1. Partner Dashboard Configuration

1. Go to https://partners.shopify.com/
2. Navigate to **Apps** → **single-date-variant**
3. Click **App setup** in the sidebar
4. Go to **Distribution** section

### 2. Select Public Distribution

- Choose **Public distribution**
- Select **Unlisted** (unless you want it in the App Store)
- Unlisted apps can only be installed via direct link (perfect for client-specific apps)

### 3. Required Information

You'll need to provide:

**App URLs:**
- Privacy Policy URL (can be simple, see example below)
- Support email/URL

**App Listing (even for unlisted):**
- App name: "Single Delivery Date Validator"
- Short description: "Prevents checkout when cart contains multiple delivery date variants"
- Long description: Explain the use case
- App icon (optional but recommended)

**Pricing:**
- Select "Free"

### 4. Privacy Policy Template

Create a simple privacy policy page (can host on GitHub Pages, Notion, or any static site):

```
Privacy Policy for Single Delivery Date Validator

This app does not collect, store, or transmit any customer data.

The app only:
- Reads cart contents during checkout
- Validates that only one delivery date variant is selected
- Returns validation errors if multiple variants are detected

No data is stored or shared with third parties.

Contact: your-email@domain.com
```

### 5. Submit for Review

- Click **Submit for review**
- Shopify will review (usually 1-3 days for simple apps)
- Once approved, you'll get an installation link

### 6. Install on Client Store

After approval:
- Get the installation URL from Partner Dashboard
- Share it with client
- They can install on their Grow plan store ✅
- The validation function will work!

## Alternative: Development Store Testing

While waiting for approval, you can:
1. Create a Shopify development store (through Partner Dashboard)
2. These have Plus features enabled for free
3. Test the full function there
4. Then deploy to production once approved

## Important Notes

- Once set to public distribution, you can't revert to custom
- Unlisted apps don't appear in App Store but require review
- Review is usually fast for simple, free apps
- Client can install without Plus subscription
