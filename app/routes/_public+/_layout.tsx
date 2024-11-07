import { Link, Outlet, useLocation, useNavigate } from "@remix-run/react";

import { Navlink } from "~/components/navlink";
import { FooterLink } from "~/components/footer-link";
import { MobileMenu } from "~/components/mobile-menu";
import { ShoppingCart } from "~/components/shopping-cart";

import { ROUTE } from "~/utils/enum";
import { ArrowLeft } from "react-feather";

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isInHome = location.pathname === ROUTE.HOME;

  return (
    <div className="w-full max-w-[1440px] md:h-[100svh] mx-auto p-6 md:pb-12 flex flex-col gap-8">
      <header className="md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-20">
          {!isInHome && (
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-950 uppercase font-semibold flex items-center gap-2 hover:underline"
            >
              <ArrowLeft width={14} />
              go_back
            </button>
          )}

          {isInHome && (
            <Link
              to={ROUTE.HOME}
              className="text-lg text-neutral-950 font-bold hidden md:inline-block"
            >
              CEUR_SHOP
            </Link>
          )}

          <div className="md:hidden">
            <MobileMenu />
          </div>

          {isInHome && (
            <div className="hidden md:flex items-center gap-8">
              <Navlink to={ROUTE.WHATS_THIS}>whats_this</Navlink>
              <Navlink to={ROUTE.HOW_TO_BUY}>how_to_buy</Navlink>
            </div>
          )}
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
