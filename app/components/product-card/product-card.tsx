import { ExternalLink, Plus } from "react-feather";

import type { Product } from "~/utils/types";

import { formatProductPrice } from "~/utils/format-product-price";

import { useShoppingCart } from "~/hooks/use-shopping-cart";

import { SpecialText } from "../special-text";
import { ProductQuantityCounter } from "../product-quantity-counter";
import { IconButton } from "../icon-button";

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
    <div className="w-full aspect-square bg-neutral-900 p-6 md:p-8">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-medium">{product.name}</p>
            <p className="text-sm text-neutral-500">{product.description}</p>
          </div>

          {isProductInShoppingCart && (
            <IconButton
              size="small"
              icon={ExternalLink}
              onClick={handleShowProductInCart}
            />
          )}
        </div>

        <div className="w-full flex justify-between items-center">
          <span className="text-2xl text-neutral-400 font-medium">
            {formatProductPrice({ price: product.price })}
          </span>

          {isProductInShoppingCart ? (
            <ProductQuantityCounter product={product} />
          ) : (
            <button
              className="text-neutral-200 hover:text-white text-sm font-medium flex items-center gap-2"
              onClick={handleAddProductToCart}
            >
              <SpecialText>Add to Cart</SpecialText>
              <Plus width={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
