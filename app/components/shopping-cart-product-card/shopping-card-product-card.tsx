import clsx from "clsx";

import { Trash } from "react-feather";
import { useEffect, useState } from "react";

import type { CartProduct } from "~/context/shopping-cart-context";

import { formatProductPrice } from "~/utils/format-product-price";

import { useShoppingCart } from "~/hooks/use-shopping-cart";

import { IconButton } from "../icon-button";
import { ProductQuantityCounter } from "../product-quantity-counter";

interface ShoppingCartProductCardProps {
  product: CartProduct;
}

export const ShoppingCartProductCard = ({ product }: ShoppingCartProductCardProps) => {
  const {
    modal: { highlightedProduct },
    dispatch,
  } = useShoppingCart();

  const [isHighlighted, setIsHighlighted] = useState(
    () => product.id === highlightedProduct
  );

  const handleRemoveProduct = () => {
    dispatch({ type: "REMOVE_PRODUCT", payload: { productId: product.id } });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHighlighted(false);
      dispatch({ type: "REMOVE_HIGHLIGHTED_PRODUCT" });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <li
      className={clsx(
        "flex gap-6 transition-all duration-200 ease-in p-6",
        isHighlighted ? "bg-neutral-800" : "bg-transparent"
      )}
    >
      <div className="w-28 md:w-32 aspect-square bg-neutral-900" />

      <div className="flex-1 w-full flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-md md:text-lg font-medium">{product.name}</p>

          <span className="text-sm text-neutral-500">
            {formatProductPrice({ price: product.price })}
          </span>
        </div>

        <div className="w-full flex justify-between items-center">
          <ProductQuantityCounter product={product} />

          <div>
            <IconButton icon={Trash} size="small" onClick={handleRemoveProduct} />
          </div>
        </div>
      </div>
    </li>
  );
};
