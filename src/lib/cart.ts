import { products } from "./products";

export type Cart = Record<string, number>;

export function sanitizeCart(value: unknown): Cart {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const source = value as Record<string, unknown>;
  const clean: Cart = {};
  for (const product of products) {
    const quantity = source[product.id];
    if (typeof quantity === "number" && Number.isSafeInteger(quantity) && quantity > 0 && quantity <= 99) {
      clean[product.id] = quantity;
    }
  }
  return clean;
}

export function countCartItems(cart: Cart): number {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

export function calculateCartSubtotal(cart: Cart, currency: "PKR" | "USD"): number {
  return products.reduce((sum, product) => {
    const unitPrice = currency === "PKR" ? product.pricePKR : product.priceUSD;
    return sum + unitPrice * (cart[product.id] || 0);
  }, 0);
}
