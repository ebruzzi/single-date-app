// @ts-check

/**
 * @typedef {import("../generated/api").CartValidationsGenerateRunInput} CartValidationsGenerateRunInput
 * @typedef {import("../generated/api").CartValidationsGenerateRunResult} CartValidationsGenerateRunResult
 */

// Configuration: product handle for cherry delivery dates
// IMPORTANT: This MUST match the exact product handle in Shopify Admin
// Check: Products → Your Product → URL handle field
const TARGET_PRODUCT_HANDLE = "mr-henry-cherries-2kg";

/**
 * @param {CartValidationsGenerateRunInput} input
 * @returns {CartValidationsGenerateRunResult}
 */
export function cartValidationsGenerateRun(input) {
  // Collect all variant IDs for the target product
  const targetVariantIds = new Set();
  
  // Debug: Log all product handles found (helps diagnose mismatches)
  const allHandles = [];
  
  // Safety check for cart and lines
  if (input?.cart?.lines) {
    input.cart.lines.forEach((line) => {
      // Check if merchandise exists and is a ProductVariant
      if (line?.merchandise?.__typename === "ProductVariant") {
        const productHandle = line.merchandise.product?.handle;
        
        // Track all handles for debugging
        if (productHandle) {
          allHandles.push(productHandle);
        }
        
        // Only track our target product (cherries with delivery dates)
        if (productHandle === TARGET_PRODUCT_HANDLE && line.merchandise.id) {
          targetVariantIds.add(line.merchandise.id);
        }
      }
    });
  }
  
  // Build errors array
  const errors = [];
  
  // If more than one delivery date variant is in the cart, block checkout
  if (targetVariantIds.size > 1) {
    errors.push({
      message: "You can only order 1 delivery date at a time. Please remove undesired dates from your cart or place separate orders for different delivery dates.",
      target: "$.cart",
    });
  }

  // IMPORTANT: Only return validationAdd operation if there are errors
  // An empty errors array is invalid - must return empty operations instead
  if (errors.length > 0) {
    return { 
      operations: [{
        validationAdd: {
          errors
        }
      }]
    };
  }
  
  // No errors = no operations (allow checkout)
  return { operations: [] };
};