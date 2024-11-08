import { Minus, Plus } from "react-feather";

import type { Product } from "~/utils/types";
import type { CartProduct } from "~/context/shopping-cart-context";

import { IconButton } from "../icon-button";
import { useShoppingCart } from "~/hooks/use-shopping-cart";

interface ProductQuantityCounterProps {
  product: Product | CartProduct;
}

export const ProductQuantityCounter = ({ product }: ProductQuantityCounterProps) => {
  const { getProductQuantity, dispatch } = useShoppingCart();

  const productQuantity = getProductQuantity({ product });
  const shouldDecrease = productQuantity > 1;

  const handleIncrementQuantity = () => {
    dispatch({ type: "INCREMENT_PRODUCT_QUANTITY", payload: { productId: product.id } });
  };

  const handleDecreaseQuantity = () => {
    dispatch({ type: "DECREASE_PRODUCT_QUANTITY", payload: { productId: product.id } });
  };

  return (
    <div className="flex justify-between items-center">
      <IconButton
        icon={Minus}
        size="small"
        onClick={handleDecreaseQuantity}
        disabled={!shouldDecrease}
      />
      <span className="w-10 md:w-12 flex items-center justify-center">
        {productQuantity}
      </span>
      <IconButton icon={Plus} size="small" onClick={handleIncrementQuantity} />
    </div>
  );
};
