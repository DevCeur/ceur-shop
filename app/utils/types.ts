export interface Product {
  id: string;
  name: string;
  description: string;
  price: { value: number; currency: string };
}
