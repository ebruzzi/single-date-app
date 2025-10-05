// @ts-check

/**
 * @typedef {import("../generated/api").CartValidationsGenerateRunInput} CartValidationsGenerateRunInput
 * @typedef {import("../generated/api").CartValidationsGenerateRunResult} CartValidationsGenerateRunResult
 */

// Configuration: product handle for cherry delivery dates
const TARGET_PRODUCT_HANDLE = "mr-henrycherries-2kg";

/**
 * @param {CartValidationsGenerateRunInput} input
 * @returns {CartValidationsGenerateRunResult}
 */
export function cartValidationsGenerateRun(input) {
  // Collect all variant IDs for the target product
  const targetVariantIds = new Set();
  
  // Safety check for cart and lines
  if (input?.cart?.lines) {
    input.cart.lines.forEach((line) => {
      // Check if merchandise exists and is a ProductVariant
      if (line?.merchandise?.__typename === "ProductVariant") {
        const productHandle = line.merchandise.product?.handle;
        
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
      message: "You can only order one delivery date at a time. Please remove extra dates from your cart or place separate orders for each delivery date.",
      target: "$.cart",
    });
  }

  return { 
    operations: [{
      validationAdd: {
        errors
      },
    }]
  };
};