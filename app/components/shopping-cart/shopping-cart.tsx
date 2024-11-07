import { useState } from "react";
import { ShoppingCart as ShoppingCartIcon, X } from "react-feather";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { IconButton } from "../icon-button";

export const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton icon={ShoppingCartIcon} onClick={() => setIsOpen(true)} />

      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
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
                <div className="w-full flex justify-between items-center p-8">
                  <DialogTitle className="text-lg font-semibold uppercase">
                    shopping_cart
                  </DialogTitle>

                  <IconButton icon={X} onClick={() => setIsOpen(false)} />
                </div>

                <div className="flex-1 p-8"></div>

                <div className="w-full p-8 border-t border-t-neutral-200">
                  <h3>checkout_information</h3>
                  <span></span>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
