import { Link, Outlet } from "@remix-run/react";
import { ShoppingCart } from "react-feather";

import { Navlink } from "~/components/navlink";
import { FooterLink } from "~/components/footer-link";
import { MobileMenu } from "~/components/mobile-menu";

import { ROUTE } from "~/utils/enum";

export default function PublicLayout() {
  return (
    <div className="w-full max-w-[1440px] h-[100svh] mx-auto p-6 md:pb-12 flex flex-col gap-8">
      <header className="md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-20">
          <Link
            to={ROUTE.HOME}
            className="text-lg text-neutral-950 font-bold hidden md:inline-block"
          >
            CEUR_SHOP
          </Link>

          <div className="md:hidden">
            <MobileMenu />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Navlink to={ROUTE.BOUGHT}>BOUGHT</Navlink>
            <Navlink to={ROUTE.HOW_TO_BUY}>HOW_TO_BUY</Navlink>
          </div>
        </div>

        <ShoppingCart />
      </header>

      <main className="flex-1 flex">
        <Outlet />
      </main>

      <footer className="w-full flex justify-between items-center">
        <div className="flex items-center gap-6">
          <FooterLink href="https://www.ceur.dev">CEUR</FooterLink>
          <FooterLink href="https://github.com/DevCeur/ceur-shop">GITHUB_REPO</FooterLink>
        </div>

        <p className="text-[8px] text-right text-neutral-400">
          ALL_RIGHTS_RESERVED © CARLOS_UMAÑA - 2024
        </p>
      </footer>
    </div>
  );
}
