import { Trash } from "react-feather";

import { formatProductPrice } from "~/utils/format-product-price";

import { CartProduct } from "~/context/shopping-cart-context";

import { IconButton } from "../icon-button";
import { SpecialText } from "../special-text";
import { ProductQuantityCounter } from "../product-quantity-counter";
import { useShoppingCart } from "~/hooks/use-shopping-cart";

interface ShoppingCartProductCardProps {
  product: CartProduct;
}

export const ShoppingCartProductCard = ({ product }: ShoppingCartProductCardProps) => {
  const { dispatch } = useShoppingCart();

  const handleRemoveProduct = () => {
    dispatch({ type: "REMOVE_PRODUCT", payload: { productId: product.id } });
  };

  return (
    <li className="flex gap-6">
      <div className="w-28 md:w-32 aspect-square bg-neutral-200" />

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
