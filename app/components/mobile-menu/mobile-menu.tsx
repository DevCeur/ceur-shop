import clsx from "clsx";

import { useState } from "react";
import { Menu, X } from "react-feather";
import { Link, useLocation } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import type { LinkProps } from "@remix-run/react";

import { MAIN_NAV_LINKS } from "~/utils/enum";

import { IconButton } from "../icon-button";
import { FooterLink } from "../footer-link";
import { SpecialText } from "../special-text";

interface MobileMenuLinkProps extends LinkProps {
  children: string;
}

const MobileMenuLink = ({ to, children, ...linkProps }: MobileMenuLinkProps) => {
  const location = useLocation();

  const isInRoute = location.pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        "text-4xl font-medium transition-all duration-150",
        isInRoute ? "text-white" : "text-neutral-500"
      )}
      {...linkProps}
    >
      <SpecialText>{children}</SpecialText>
    </Link>
  );
};

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
              className="fixed inset-0 bg-black/30 h-[100dvh]"
            />

            <div className="fixed inset-0 flex w-screen h-[100dvh] justify-start">
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
                  {MAIN_NAV_LINKS.map(({ text, route }, index) => (
                    <MobileMenuLink
                      key={index}
                      onClick={() => setIsOpen(false)}
                      to={route}
                    >
                      {text}
                    </MobileMenuLink>
                  ))}
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
