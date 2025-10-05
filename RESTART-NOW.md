# URGENT: Restart Required

## The Problem

The function logs still show:
```
Target: purchase.validation.run  ❌ (OLD)
API: cart_checkout_validation • 2025-01  ❌ (OLD)
```

But we just changed it to:
```
Target: cart.validations.generate.run  ✅ (NEW)
API: 2025-07  ✅ (NEW)
```

**The dev server is still running the OLD code!**

---

## IMMEDIATE FIX

### 1. Stop `shopify app dev`
In your terminal, press **Ctrl+C** to stop the dev server

### 2. Clean rebuild
```bash
cd /c/Users/bruzz/Documents/GitHub/single-date-app
rm -rf extensions/cart-checkout-validation/dist
npm run build
```

### 3. Restart dev server
```bash
shopify app dev
```

### 4. Watch the logs
When you test checkout, the logs should now show:
```
Target: cart.validations.generate.run  ✅
API: cart_checkout_validation • 2025-07  ✅
```

---

## If Restart Doesn't Work

Try deploying instead of using dev mode:

```bash
# Build
npm run build

# Deploy
shopify app deploy --force

# DON'T run shopify app dev
# Just test directly on the store
```

When deployed (not in dev mode), the store uses the deployed version which has the correct target.

---

## Verify the Fix Took Effect

After restarting, check the function logs. You should see:
- Target changed from `purchase.validation.run` to `cart.validations.generate.run`
- API version changed from `2025-01` to `2025-07`
- Status should be SUCCESS instead of Error

---

## Why This Happened

`shopify app dev` loads the function into memory when it starts. Even after you:
1. Changed the config ✅
2. Rebuilt the function ✅
3. Deployed it ✅

...the dev server was still running with the old version in memory!

**Solution:** Restart the dev server to load the new config.

---

## Quick Commands

```bash
# Stop dev server (Ctrl+C in the running terminal)

# Clean + rebuild
cd /c/Users/bruzz/Documents/GitHub/single-date-app
rm -rf extensions/cart-checkout-validation/dist
npm run build

# Restart
shopify app dev

# Test checkout again
```

After this, the target should be `cart.validations.generate.run` and it should work!
