import { describe, expect, it } from "vitest";
import { calculateCartSubtotal, countCartItems, sanitizeCart } from "./cart";
describe("cart utilities", () => {
 it("drops unknown products and invalid quantities when restoring a cart", () => {
  expect(sanitizeCart({ p1: 2, p2: -1, p3: 1.5, unknown: 8, p4: 100 })).toEqual({ "woven-table-runner": 2 });
 });
 it("returns an empty cart for malformed stored values", () => {
  expect(sanitizeCart(null)).toEqual({}); expect(sanitizeCart("not-json")).toEqual({}); expect(sanitizeCart([1,2])).toEqual({});
 });
 it("counts quantities rather than distinct products", () => { expect(countCartItems({ p1: 2, p2: 3 })).toBe(5); });
 it("calculates subtotal in PKR and USD using product slugs", () => {
  expect(calculateCartSubtotal({ "woven-table-runner": 2, "terracotta-vase": 1 }, "PKR")).toBe(15800);
  expect(calculateCartSubtotal({ "woven-table-runner": 2, "terracotta-vase": 1 }, "USD")).toBe(56);
 });
});
