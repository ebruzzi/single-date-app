# Privacy Policy for Single Delivery Date Validator

**Last Updated:** October 4, 2025

## Overview

Single Delivery Date Validator ("the App") is a Shopify app that validates cart contents during checkout to ensure customers select only one delivery date variant per order. This privacy policy explains how the App handles data.

## Data Collection and Usage

### What Data We Access

The App accesses the following data from your Shopify store **only during checkout validation**:

- **Cart Contents:** Product handles, variant IDs, and quantities in the customer's cart
- **Product Information:** Product handles to identify delivery date products

### What We Do NOT Collect or Store

The App does **NOT**:

- Store any customer data (names, emails, addresses, etc.)
- Collect or retain payment information
- Track customer behavior or browsing history
- Store cart contents after validation
- Share any data with third parties
- Use cookies or tracking technologies
- Transmit data outside of Shopify's infrastructure

### How Data Is Used

The App operates entirely within Shopify's secure environment and:

1. **Reads cart data** during the checkout process
2. **Validates** that only one delivery date variant is present for the configured product
3. **Returns a validation result** (pass or error message)
4. **Does not persist** any of this information

All processing happens in real-time within Shopify's servers. No data leaves Shopify's platform.

## Data Storage

**The App stores zero customer data.** All validation logic runs ephemerally during checkout and no information is retained after the validation completes.

## Data Sharing

The App does **not share any data** with:

- Third-party services
- Analytics platforms
- Marketing tools
- External databases

The App operates as a self-contained validation function within your Shopify store.

## Security

The App:

- Runs within Shopify's secure, PCI-compliant infrastructure
- Uses Shopify's built-in security measures
- Processes data in-memory only (no persistent storage)
- Follows Shopify's best practices for app security

## Your Rights

As a merchant using this App:

- You can uninstall the App at any time
- No data cleanup is required upon uninstall (as no data is stored)
- You maintain full ownership of your store data

As a customer of a store using this App:

- Your data is not collected or stored by this App
- Your checkout experience is validated but not tracked
- Your privacy is protected by Shopify's standard policies

## Compliance

This App complies with:

- Shopify's App Store requirements
- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
- Shopify's API Terms of Service

## Changes to This Policy

We may update this privacy policy from time to time. The "Last Updated" date at the top will reflect any changes. Continued use of the App after changes constitutes acceptance of the updated policy.

## App Functionality Details

### What the App Does:

The App prevents checkout when a cart contains multiple variants (delivery dates) of a specific product. For example:

- ✅ **Allowed:** Cart has one "December 15th delivery" variant
- ❌ **Blocked:** Cart has both "December 15th" AND "December 22nd" delivery variants

This ensures customers place separate orders for different delivery dates, preventing fulfillment errors.

### Technical Implementation:

The App uses Shopify's **Checkout Validation Function API** to:

- Query cart line items during checkout
- Check for multiple variants of the configured product handle
- Display an error message if multiple delivery dates are detected
- Allow checkout to proceed if validation passes

## Contact Information

**App Developer:**  
twentyfour.cc

**Support Email:**  
bruzzi.eduardo@gmail.com

**For Data Privacy Inquiries:**  
bruzzi.eduardo@gmail.com

## Merchant Responsibilities

As a merchant installing this App, you are responsible for:

- Informing your customers about apps installed on your store (via your store's privacy policy)
- Ensuring your use of the App complies with applicable laws
- Configuring the App correctly for your business needs

## Third-Party Services

The App relies solely on:

- **Shopify Platform:** All data processing occurs within Shopify's infrastructure
- No other third-party services are used

## Children's Privacy

The App does not knowingly collect data from individuals under the age of 13 (or applicable age in your jurisdiction). The App does not collect data from anyone.

## International Data Transfers

Since the App does not store or transmit data, there are no international data transfers. All processing occurs within your Shopify store's regional infrastructure.

## Automated Decision Making

The App makes automated validation decisions (allow/block checkout) based solely on:

- Product handle matching
- Variant ID counting
- Pre-configured business rules

These decisions are transparent and reversible (customers can modify their cart and retry).

## Data Retention

**Data Retention Period:** 0 seconds

The App does not retain any data. All validation happens in real-time and information is discarded immediately after processing.

## Your Consent

By installing and using the Single Delivery Date Validator app, you consent to this privacy policy.

---

**This app is designed with privacy-first principles:** zero data collection, zero storage, zero sharing. It's a simple validation tool that operates entirely within Shopify's secure environment.
