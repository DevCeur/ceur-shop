import type { CartProduct } from "~/context/shopping-cart-context";

import { ShoppingCartProductCard } from "../shopping-cart-product-card";

interface ShoppingCartProductsListProps {
  products: CartProduct[];
}

export const ShoppingCartProductsList = ({ products }: ShoppingCartProductsListProps) => {
  const hasProducts = products.length;

  if (!hasProducts) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <p className="w-full max-w-xs text-xl text-center">
          No has seleccionado nada para comprar, terrible.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 relative overflow-hidden">
      <ul className="w-full h-full flex flex-col absolute top-0 overflow-y-auto">
        {products.map((product) => (
          <ShoppingCartProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
