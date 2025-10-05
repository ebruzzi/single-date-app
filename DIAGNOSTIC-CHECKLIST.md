# Validation Not Working - Diagnostic Checklist

Please check each item and report back:

## 1. Product Handle Verification

**What is the EXACT product handle in your Shopify store?**

To find it:
- Go to Products → Your cherry product
- Look in the URL bar or check "Search engine listing preview"
- The handle appears as: yourstore.com/products/**HANDLE-HERE**

Your handle: `____________________`

Expected handle in code: `mr-henry-cherries-2kg`

Match? ☐ Yes ☐ No

---

## 2. Function Activation Status

**Is the validation function turned ON in Shopify Admin?**

Steps to check:
1. Settings → Checkout
2. Scroll to "Checkout validations" or "Checkout and cart validations"
3. Look for "Single Delivery Date Validation"

Status:
☐ Function appears and shows "Active"
☐ Function appears but is "Turned off"
☐ Function doesn't appear at all
☐ No "Checkout validations" section visible

---

## 3. Checkout Version

**What type of checkout are you using?**

In Settings → Checkout, do you see:
☐ Checkout editor / customization options (NEW checkout ✅)
☐ Checkout.liquid / Scripts mentioned (OLD checkout ❌)
☐ Not sure

---

## 4. Test Details

**Exactly what did you add to cart?**

Product 1:
- Product name: `____________________`
- Variant (delivery date): `____________________`
- Quantity: `____`

Product 2:
- Product name: `____________________`
- Variant (delivery date): `____________________`
- Quantity: `____`

**Are these two DIFFERENT variants of the SAME product?**
☐ Yes (should block)
☐ No - same variant (won't block)
☐ No - different products (won't block)

---

## 5. What Happened at Checkout?

When you clicked "Checkout" or "Continue to checkout":

☐ No error message appeared at all
☐ Error appeared but wrong message
☐ Checkout was blocked (validation worked!)
☐ Other: `____________________`

---

## 6. App Installation

Is the app installed?
- Admin → Apps → Should show "single-date-app" or "Single Delivery Date Validator"

☐ Yes, app is listed
☐ No, app is not installed

---

## 7. Browser Console Errors

Open browser console (F12) during checkout attempt.

Any errors shown?
☐ No errors
☐ Yes: `____________________`

---

## Quick Test: Force Error

To verify the function is even running, temporarily edit the code to ALWAYS block:

```javascript
// In src/cart_validations_generate_run.js
export function cartValidationsGenerateRun(input) {
  // ALWAYS block - for testing only
  return { 
    operations: [{
      validationAdd: {
        errors: [{
          message: "TEST: If you see this, the function is working!",
          target: "$.cart"
        }]
      }
    }]
  };
}
```

Then:
1. `npm run build`
2. `shopify app deploy`
3. Try checkout again

Result:
☐ Saw the test message → Function works, logic issue
☐ No message → Function not activated or not compatible

---

## Share These Results

Copy this completed checklist and share it so we can diagnose the issue.
