import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart as ShoppingCartIcon, X } from "react-feather";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { useShoppingCart } from "~/hooks/use-shopping-cart";

import { IconButton } from "../icon-button";
import { ShoppingCartProductCard } from "../shopping-cart-product-card";

export const ShoppingCart = () => {
  const {
    modal: { isOpen },
    products,
    dispatch,
  } = useShoppingCart();

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
              className="fixed inset-0 bg-black/30"
            />

            <div className="fixed inset-0 flex w-screen justify-end">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="w-full max-w-screen-sm bg-white flex flex-col"
              >
                <div className="w-full flex justify-between items-center p-6">
                  <DialogTitle className="text-lg font-semibold uppercase">
                    shopping_cart
                  </DialogTitle>

                  <IconButton icon={X} onClick={handleCloseModal} />
                </div>

                <ul className="flex-1 flex flex-col gap-8">
                  {products.map((product) => (
                    <ShoppingCartProductCard key={product.id} product={product} />
                  ))}
                </ul>

                <div className="w-full border-t border-t-neutral-200 p-6">
                  <h3>checkout_information</h3>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
