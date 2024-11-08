import { Trash } from "react-feather";

import { formatProductPrice } from "~/utils/format-product-price";

import { CartProduct } from "~/context/shopping-cart-context";

import { IconButton } from "../icon-button";
import { SpecialText } from "../special-text";
import { ProductQuantityCounter } from "../product-quantity-counter";
import { useShoppingCart } from "~/hooks/use-shopping-cart";
import { useEffect, useState } from "react";
import clsx from "clsx";

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
        isHighlighted ? "bg-sky-50" : "bg-transparent"
      )}
    >
      <div className="w-28 md:w-32 aspect-square bg-neutral-100" />

      <div className="flex-1 w-full flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium">
            <SpecialText>{product.name}</SpecialText>
          </p>

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
