import clsx from "clsx";

import { Eye } from "react-feather";

import type { Product } from "~/utils/types";

import { formatProductPrice } from "~/utils/format-product-price";

import { useShoppingCart } from "~/hooks/use-shopping-cart";

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
    dispatch({ type: "SHOW_PRODUCT_IN_CARD", payload: { productId: product.id } });
  };

  return (
    <div className="w-full group aspect-square bg-neutral-100 p-6 md:p-8 transition-all duration-150">
      <div className="w-full h-full flex flex-col justify-between transition-all duration-150">
        <div
          className={clsx(
            "flex flex-col-reverse md:flex-row justify-between gap-2 items-start xl:group-hover:opacity-100 transition-all duration-150",
            isProductInShoppingCart ? "opacity-100" : "xl:opacity-0"
          )}
        >
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-medium uppercase">
              <SpecialText>{product.name}</SpecialText>
            </p>
            <p className="hidden md:inline-block text-sm text-neutral-500">
              {product.description}
            </p>
          </div>

          {isProductInShoppingCart && (
            <button
              className="text-xs text-neutral-400 hover:text-neutral-600 flex md:flex-row-reverse items-center gap-2 transition-colors duration-150"
              onClick={handleShowProductInCart}
            >
              <Eye width={12} />
              <SpecialText>view in cart</SpecialText>
            </button>
          )}
        </div>

        <div className="w-full flex justify-between items-center xl:opacity-0 xl:group-hover:opacity-100 transition-all duration-150">
          <span className="text-2xl text-neutral-500 font-medium">
            {formatProductPrice({ price: product.price })}
          </span>

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
