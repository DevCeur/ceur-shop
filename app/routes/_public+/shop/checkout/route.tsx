import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

import type { CartProduct } from "~/context/shopping-cart-context";

import { formatProductPrice } from "~/utils/format-product-price";

import { useShoppingCart } from "~/hooks/use-shopping-cart";

interface MobileCheckoutResumeProductCardProps {
  product: CartProduct;
}

const MobileCheckoutResumeProductCard = ({
  product,
}: MobileCheckoutResumeProductCardProps) => {
  return (
    <div className="flex items-center gap-5">
      <div className="w-16 aspect-square bg-neutral-800 relative">
        <span
          key="total-products-badge"
          className="absolute -top-2 -right-2 bg-neutral-700 text-white text-[10px] border border-neutral-600 font-semibold w-4 h-4 flex justify-center items-center rounded-full"
        >
          {product.quantity}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-medium">{product.name}</span>
        <span className="text-sm text-neutral-500">
          {formatProductPrice({ price: product.price * product.quantity })}
        </span>
      </div>
    </div>
  );
};

const CheckoutResumeDropdown = () => {
  const [showOrderResume, setShowOrderResume] = useState(false);

  const { subtotal } = useShoppingCart();

  const handleToggleCheckoutResume = () => {
    setShowOrderResume((prev) => !prev);
  };

  return (
    <div className="bg-primary-backgrund flex flex-col">
      <button
        className="w-full p-5 md:px-0 flex justify-between items-center border-y border-neutral-800"
        onClick={handleToggleCheckoutResume}
      >
        <span className="text-lg font-medium flex items-center gap-3">
          <span>Checkout Resume</span>
          {showOrderResume ? <ChevronUp width={14} /> : <ChevronDown width={14} />}
        </span>

        <span>{formatProductPrice({ price: subtotal })}</span>
      </button>

      {showOrderResume && (
        <div className="border-b border-b-neutral-800 py-8">
          <CheckoutResume />
        </div>
      )}
    </div>
  );
};

const CheckoutResume = () => {
  const { subtotal, products } = useShoppingCart();

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <MobileCheckoutResumeProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pt-8 flex flex-col gap-4">
        <p className="flex items-center justify-between">
          <span className="font-medium">Subtotal:</span>{" "}
          <span className="text-neutral-400">
            {formatProductPrice({ price: subtotal })}
          </span>
        </p>

        <p className="flex items-center justify-between">
          <span className="font-medium">Envío:</span>{" "}
          <span className="text-neutral-400">GRATIS</span>
        </p>
      </div>

      <div className="pt-8">
        <p className="text-2xl font-medium flex justify-between items-center">
          <span>Total:</span>
          <span>{formatProductPrice({ price: subtotal })}</span>
        </p>
      </div>
    </div>
  );
};

export default function CheckoutRoute() {
  return (
    <div className="flex-1 max-w-lg xl:max-w-screen-xl mx-auto flex flex-col">
      <div className="my-8">
        <h1 className="text-4xl font-medium">Checkout</h1>
      </div>

      <div className="w-full h-full xl:mx-0 flex flex-col xl:flex-row gap-8 xl:gap-12 relative">
        <div className="xl:hidden -mx-5 md:-mx-0 sticky top-20 z-20">
          <CheckoutResumeDropdown />
        </div>

        <div className="hidden xl:flex w-full max-w-md flex-col gap-12">
          <h2 className="hidden xl:inline-block text-3xl font-medium">Resume</h2>

          <CheckoutResume />
        </div>

        <div className="flex-1 xl:border-l border-l-neutral-800 xl:pl-12 relative xl:overflow-y-auto">
          <div className="xl:absolute xl:top-0 flex flex-col gap-8 xl:gap-12">
            <h2 className="text-3xl font-medium">Contact Info</h2>

            <form className="h-[2000px]">form</form>
          </div>
        </div>
      </div>
    </div>
  );
}
