import { ArrowLeft } from "react-feather";
import { Link, Outlet, useLocation, useNavigate } from "@remix-run/react";

import { MAIN_NAV_LINKS, ROUTE } from "~/utils/enum";

import { Navlink } from "~/components/navlink";
import { FooterLink } from "~/components/footer-link";
import { MobileMenu } from "~/components/mobile-menu";
import { ShoppingCart } from "~/components/shopping-cart";
import { SpecialText } from "~/components/special-text";

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isInHome = location.pathname === ROUTE.HOME;

  const handleGoBack = () => navigate(-1);

  return (
    <div className="w-full min-h-[100svh] mx-auto flex flex-col">
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-primary-backgrund px-5 md:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-20">
            {!isInHome && (
              <button
                onClick={handleGoBack}
                className="hidden md:flex text-sm uppercase font-semibold items-center gap-2 hover:underline"
              >
                <ArrowLeft width={14} />
                <SpecialText>Go back</SpecialText>
              </button>
            )}

            {isInHome && (
              <Link to={ROUTE.HOME} className="text-lg font-bold hidden md:inline-block">
                <SpecialText>Ceur Shop</SpecialText>
              </Link>
            )}

            <div className="md:hidden">
              <MobileMenu />
            </div>

            {isInHome && (
              <div className="hidden md:flex items-center gap-10">
                {MAIN_NAV_LINKS.map(({ text, route }, index) => (
                  <Navlink key={index} to={route}>
                    {text}
                  </Navlink>
                ))}
              </div>
            )}
          </div>

          <ShoppingCart />
        </header>

        <main className="w-full flex-1 flex px-5 md:px-8">
          <Outlet />
        </main>
      </div>

      <footer className="w-full flex flex-col justify-between items-center gap-8 px-5 md:px-8 py-8 md:py-10 lg:py-12">
        <div className="w-full flex justify-between items-center gap-6">
          <FooterLink href="https://www.ceur.dev">CEUR</FooterLink>
          <p className="hidden md:inline-block text-[8px] text-right text-neutral-700">
            <SpecialText>all rights reserved</SpecialText> ©{" "}
            <SpecialText>carlos umaña</SpecialText> - 2024
          </p>

          <FooterLink href="https://github.com/DevCeur/ceur-shop">GITHUB_REPO</FooterLink>
        </div>

        <p className="md:hidden text-[8px] text-right text-neutral-700">
          ALL_RIGHTS_RESERVED © CARLOS_UMAÑA - 2024
        </p>
      </footer>
    </div>
  );
}
