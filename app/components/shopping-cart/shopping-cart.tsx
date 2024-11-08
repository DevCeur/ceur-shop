import { useState } from "react";
import { Link } from "@remix-run/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  ShoppingCart as ShoppingCartIcon,
  X,
} from "react-feather";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { useShoppingCart } from "~/hooks/use-shopping-cart";

import { ROUTE } from "~/utils/enum";
import { formatProductPrice } from "~/utils/format-product-price";

import { Button } from "../button";
import { IconButton } from "../icon-button";
import { SpecialText } from "../special-text";
import { ShoppingCartProductCard } from "../shopping-cart-product-card";
import clsx from "clsx";

export const ShoppingCart = () => {
  const {
    modal: { isOpen },
    totalProducts,
    products,
    subtotal,
    dispatch,
  } = useShoppingCart();
  const [checkoutInfoExpanded, setCheckoutInfoExanded] = useState(false);

  const hasProducts = products.length > 0;

  const handleOpenModal = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <div className="relative">
        <AnimatePresence mode="wait">
          {hasProducts && (
            <motion.span
              key="total-products-badge"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold w-4 h-4 flex justify-center items-center rounded-full"
            >
              {products.length}
            </motion.span>
          )}
        </AnimatePresence>

        <IconButton icon={ShoppingCartIcon} onClick={handleOpenModal} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={handleCloseModal}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            />

            <div className="fixed inset-0 flex w-screen justify-end">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="w-full max-w-screen-sm bg-primary-backgrund flex flex-col md:border-l border-neutral-800"
              >
                <div className="w-full flex justify-between items-center  border-b border-neutral-800 p-6">
                  <DialogTitle className="text-lg font-semibold uppercase">
                    shopping_cart
                  </DialogTitle>

                  <IconButton icon={X} onClick={handleCloseModal} />
                </div>

                <div className="flex-1 relative overflow-hidden">
                  <ul className="w-full h-full flex flex-col absolute top-0 overflow-y-auto">
                    {products.map((product) => (
                      <ShoppingCartProductCard key={product.id} product={product} />
                    ))}
                  </ul>
                </div>

                {!hasProducts && (
                  <div className="w-full flex justify-center items-center py-12">
                    <Link
                      to={ROUTE.HOME}
                      className="text-lg text-neutral-500 hover:text-white font-medium flex justify-center items-center gap-4 transition-colors duration-150"
                      onClick={handleCloseModal}
                    >
                      <SpecialText>Add Products</SpecialText>
                      <Plus width={16} />
                    </Link>
                  </div>
                )}

                {hasProducts && (
                  <div className="w-full border-t border-neutral-800 p-6">
                    <div className="flex flex-col gap-6">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-medium">
                          <SpecialText>checkout_information</SpecialText>
                        </p>

                        <button
                          className="p-2"
                          onClick={() => setCheckoutInfoExanded((prev) => !prev)}
                        >
                          {checkoutInfoExpanded ? (
                            <ChevronDown width={14} />
                          ) : (
                            <ChevronUp width={14} />
                          )}
                        </button>
                      </div>

                      {checkoutInfoExpanded && (
                        <div className={clsx("flex flex-col gap-2")}>
                          <span className="text-lg text-neutral-400">
                            <strong>Subtotal:</strong>
                            <span className="inline-block ml-2">
                              {formatProductPrice({ price: subtotal })}
                            </span>
                          </span>

                          <span className="text-xs text-neutral-400">
                            <strong>Total Products:</strong>
                            <span className="inline-block ml-2">{totalProducts}</span>
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between gap-8 pt-3">
                        <Button>Empty Cart</Button>

                        <Button width="full" variant="primary">
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
