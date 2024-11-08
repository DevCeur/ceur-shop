import type { Product } from "./types";

export const ROUTE = {
  HOME: "/",
  WHATS_THIS: "/whats-this",
  HOW_TO_BUY: "/how-to-buy",
  CHECKOUT: "/checkout",
};

export const testProducts: Product[] = [
  {
    id: crypto.randomUUID(),
    name: "Product 1",
    description: "Test product description",
    price: { value: 45, currency: "USD" },
  },
  {
    id: crypto.randomUUID(),
    name: "Product 2",
    description: "Test product description",
    price: { value: 50, currency: "USD" },
  },
  {
    id: crypto.randomUUID(),
    name: "Product 3",
    description: "Test product description",
    price: { value: 35, currency: "USD" },
  },
  {
    id: crypto.randomUUID(),
    name: "Product 4",
    description: "Test product description",
    price: { value: 30, currency: "USD" },
  },
];
