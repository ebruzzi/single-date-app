import { describe, it, expect } from 'vitest';
import { cartValidationsGenerateRun } from './cart_validations_generate_run';

/**
 * @typedef {import("../generated/api").CartValidationsGenerateRunResult} CartValidationsGenerateRunResult
 */

describe('cart checkout validation function', () => {
  it('returns an error when multiple delivery date variants are in cart', () => {
    const result = cartValidationsGenerateRun({
      cart: {
        lines: [
          {
            quantity: 1,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/123",
              product: {
                handle: "mr-henry-cherries-2kg"
              }
            }
          },
          {
            quantity: 1,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/456",
              product: {
                handle: "mr-henry-cherries-2kg"
              }
            }
          }
        ]
      }
    });
    const expected = /** @type {CartValidationsGenerateRunResult} */ ({
      operations: [
        {
          validationAdd: {
            errors: [
              {
                message: "You can only order 1 delivery date at a time. Please remove undesired dates from your cart or place separate orders for different delivery dates.",
                target: "$.cart"
              }
            ]
          }
        }
      ]
    });

    expect(result).toEqual(expected);
  });

  it('returns no errors when only one delivery date variant is in cart', () => {
    const result = cartValidationsGenerateRun({
      cart: {
        lines: [
          {
            quantity: 1,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/123",
              product: {
                handle: "mr-henry-cherries-2kg"
              }
            }
          }
        ]
      }
    });
    const expected = /** @type {CartValidationsGenerateRunResult} */ ({
      operations: []
    });

    expect(result).toEqual(expected);
  });

  it('returns no errors when cart has different products', () => {
    const result = cartValidationsGenerateRun({
      cart: {
        lines: [
          {
            quantity: 1,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/789",
              product: {
                handle: "some-other-product"
              }
            }
          },
          {
            quantity: 1,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/999",
              product: {
                handle: "another-product"
              }
            }
          }
        ]
      }
    });
    const expected = /** @type {CartValidationsGenerateRunResult} */ ({
      operations: []
    });

    expect(result).toEqual(expected);
  });

  it('returns no errors for empty cart', () => {
    const result = cartValidationsGenerateRun({
      cart: {
        lines: []
      }
    });
    const expected = /** @type {CartValidationsGenerateRunResult} */ ({
      operations: []
    });

    expect(result).toEqual(expected);
  });
});