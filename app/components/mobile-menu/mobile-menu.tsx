import { useState } from "react";
import { Menu, X } from "react-feather";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { ROUTE } from "~/utils/enum";

import { Navlink } from "../navlink";
import { IconButton } from "../icon-button";
import { FooterLink } from "../footer-link";
import { SpecialText } from "../special-text";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton icon={Menu} onClick={() => setIsOpen(true)} />

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
              className="fixed inset-0 bg-black/30 h-[100svh]"
            />

            <div className="fixed inset-0 flex w-screen justify-start h-[100svh]">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="w-full bg-primary-backgrund flex flex-col"
              >
                <div className="w-full flex justify-between items-center p-8">
                  <DialogTitle className="text-lg font-semibold uppercase">
                    <SpecialText>Ceur Shop</SpecialText>
                  </DialogTitle>

                  <IconButton icon={X} onClick={() => setIsOpen(false)} />
                </div>

                <div className="flex-1 flex flex-col justify-center items-center gap-12 p-8">
                  <Navlink onClick={() => setIsOpen(false)} to={ROUTE.HOME}>
                    HOME
                  </Navlink>
                  <Navlink onClick={() => setIsOpen(false)} to={ROUTE.WHATS_THIS}>
                    <SpecialText>What&apos;s this</SpecialText>
                  </Navlink>
                  <Navlink onClick={() => setIsOpen(false)} to={ROUTE.HOW_TO_BUY}>
                    <SpecialText>How to buy</SpecialText>
                  </Navlink>
                </div>

                <div className="w-full flex justify-between items-center p-8">
                  <FooterLink href="https://www.ceur.dev">CEUR</FooterLink>
                  <FooterLink href="https://github.com/DevCeur/ceur-shop">
                    <SpecialText>Github Repo</SpecialText>
                  </FooterLink>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
