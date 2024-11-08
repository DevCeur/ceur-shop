import clsx from "clsx";

import { ArrowUpRight } from "react-feather";

import type { Product } from "~/utils/types";

import { useShoppingCart } from "~/hooks/use-shopping-cart";

import { IconButton } from "../icon-button";
import { SpecialText } from "../special-text";
import { ProductQuantityCounter } from "../product-quantity-counter";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch, shoppingCartContainsProduct } = useShoppingCart();

  const isProductInShoppingCart = shoppingCartContainsProduct({ product });

  const handleAddProductToCart = () => {
    dispatch({ type: "ADD_PRODUCT", payload: { product } });
    dispatch({ type: "OPEN_MODAL" });
  };

  const handleShowProductInCart = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  return (
    <div className="group aspect-square md:aspect-auto bg-neutral-100 p-6 md:p-10 transition-all duration-150">
      <div className="w-full h-full flex flex-col justify-between transition-all duration-150">
        <div
          className={clsx(
            "flex justify-between items-center xl:group-hover:opacity-100 transition-all duration-150",
            isProductInShoppingCart ? "opacity-100" : "xl:opacity-0"
          )}
        >
          <h3 className="text-3xl font-medium uppercase">
            <SpecialText>{product.name}</SpecialText>
          </h3>

          {isProductInShoppingCart && (
            <IconButton
              size="small"
              icon={ArrowUpRight}
              onClick={handleShowProductInCart}
            />
          )}
        </div>

        <div className="w-full flex justify-between items-center xl:opacity-0 xl:group-hover:opacity-100 transition-all duration-150">
          <button>
            <SpecialText>buy</SpecialText>
          </button>

          {isProductInShoppingCart ? (
            <ProductQuantityCounter product={product} />
          ) : (
            <button onClick={handleAddProductToCart}>
              <SpecialText>Add to Cart</SpecialText>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
