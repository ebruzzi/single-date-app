# Troubleshooting: Validation Not Working

## Quick Checklist

If the validation isn't blocking checkout, check these in order:

### ✅ 1. Function Is Activated in Shopify Admin

**This is the #1 reason validations don't work!**

1. Go to **Shopify Admin** → **Settings** → **Checkout**
2. Scroll down to **Checkout validations** (or **Checkout and cart validations**)
3. Look for **"Single Delivery Date Validation"**
4. If it's not there or says "Turned off":
   - Click **Add validation** (or **Turn on**)
   - Select the function
   - Click **Save**

**How to verify:** You should see "Single Delivery Date Validation - Active" in the list.

---

### ✅ 2. Product Handle Matches Exactly

The function looks for products with handle: `"mr-henry-cherries-2kg"`

**To find your actual product handle:**

1. Go to **Products** → Your cherry product
2. Look at the browser URL:
   ```
   https://admin.shopify.com/store/YOUR-STORE/products/123456789
   ```
3. Or scroll down in the product editor to **Search engine listing preview**
4. The handle appears in the URL: `yourstore.com/products/HANDLE-HERE`

**Common mismatches:**
- `mr-henry-cherries-2kg` ✅ (code expects this)
- `mr-henrycherries-2kg` ❌ (missing hyphens)
- `mr-henry-cherries-2k` ❌ (missing 'g')
- `cherries-2kg` ❌ (missing prefix)

**If your handle is different:**
1. Edit `src/cart_validations_generate_run.js`
2. Change line 11: `const TARGET_PRODUCT_HANDLE = "YOUR-ACTUAL-HANDLE";`
3. Rebuild: `npm run build`
4. Redeploy: `shopify app deploy`

---

### ✅ 3. You're Using the New Checkout

Validation functions **only work** with Shopify's **new checkout architecture** (Checkout Extensibility).

**Check your checkout version:**
1. Go to **Settings** → **Checkout**
2. Look at the top - you should see options for **checkout customizations**
3. If you see mentions of "Checkout.liquid" or "Scripts", you're on the old checkout

**If on old checkout:**
- You need to upgrade to Checkout Extensibility (automatic on new stores)
- Or this validation won't work (requires Plus on older stores)

---

### ✅ 4. Function Deployed Successfully

**Check deployment status:**

```bash
shopify app versions list
```

You should see your latest version deployed and active.

**If not deployed:**
```bash
cd /c/Users/bruzz/Documents/GitHub/single-date-app
npm run build
shopify app deploy
```

---

### ✅ 5. Testing with Correct Variants

The validation **only triggers** when you have:
- **Multiple line items** of the **same product** (`mr-henry-cherries-2kg`)
- With **different variant IDs**

**Example that SHOULD block:**
- Cart line 1: Mr Henry Cherries 2kg - Delivery Dec 15 (Variant ID: 123)
- Cart line 2: Mr Henry Cherries 2kg - Delivery Dec 22 (Variant ID: 456)

**Examples that will NOT block:**
- Same variant, different quantities ✅ (allowed)
- Different products entirely ✅ (allowed)
- Only one variant in cart ✅ (allowed)

---

## Diagnostic Test

### Test 1: Verify Function Receives Data

The function now logs all product handles it sees. After testing checkout:

1. Check function execution logs (if available in Shopify Admin)
2. Or contact Shopify support to check function invocation

### Test 2: Manual API Test

You can test the logic locally:

```bash
cd extensions/cart-checkout-validation
npm test
```

All 4 tests should pass. If they don't, there's a code issue.

---

## Still Not Working?

### Check These Edge Cases:

1. **Browser cache:** Clear cache, try incognito mode
2. **App permissions:** Reinstall the app on the dev store
3. **Multiple validations:** Check if another validation is conflicting
4. **Draft orders:** Validations don't run on draft orders (by design)

### Get Function Logs

Unfortunately, Shopify doesn't provide real-time function logs easily. But you can:

1. Go to **Apps** → Your app → **Extensions**
2. Click on **cart-checkout-validation**
3. Look for any error messages or warnings
4. Check "Recent activity" if available

---

## Quick Fix: Test with Known Working Code

Replace your function temporarily with this minimal test version:

```javascript
export function cartValidationsGenerateRun(input) {
  // This ALWAYS blocks checkout (for testing)
  return { 
    operations: [{
      validationAdd: {
        errors: [{
          message: "TEST: Validation function is working!",
          target: "$.cart"
        }]
      }
    }]
  };
}
```

If this blocks checkout → your function is activated, but logic has issues  
If this DOESN'T block → function isn't activated or checkout incompatible

---

## Common Solutions Summary

| Symptom | Solution |
|---------|----------|
| No error at checkout | Activate function in Settings → Checkout |
| Works in tests, not live | Check product handle matches exactly |
| "Function not found" | Redeploy: `shopify app deploy` |
| No validation options in Admin | Store using old checkout (can't use validations) |
| Blocks for wrong products | Fix product handle in code |

---

## Need More Help?

1. **Check app installation:** Admin → Apps → Should show "single-date-app"
2. **Check function status:** Settings → Checkout → Should list the validation
3. **Verify product:** Make sure you're testing with the exact product handle
4. **Contact Shopify:** Open support ticket with app client ID

---

## Debugging Checklist

- [ ] App installed on dev store
- [ ] Function shows in Settings → Checkout
- [ ] Function is "Active" (turned on)
- [ ] Product handle in code matches product handle in store
- [ ] Using new checkout (Checkout Extensibility enabled)
- [ ] Testing with 2+ different variants of same product
- [ ] Latest version deployed (`shopify app versions list`)
- [ ] Build successful (`npm run build` shows no errors)
- [ ] Cleared browser cache

If all checked and still not working, reply with:
- Your exact product handle from Shopify
- Screenshot of Settings → Checkout showing active validations
- Output of `shopify app versions list`
