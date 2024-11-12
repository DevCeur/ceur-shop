import { Link } from "@remix-run/react";

import type { MetaFunction } from "@remix-run/node";

import { SpecialText } from "~/components/special-text";

export const meta: MetaFunction = () => [{ title: "CEUR_SHOP ~ Selected Smoking Shop" }];

interface HomeCategorySectionProps {
  title: string;
  category: string;
}

const HomeCategorySection = ({ title, category }: HomeCategorySectionProps) => {
  return (
    <Link
      to={`/shop/${category}`}
      className="aspect-square md:aspect-auto w-full flex-1 bg-neutral-900 hover:bg-neutral-800 flex flex-col justify-between items-end p-6 lg:p-8 transition-colors duration-150"
    >
      <h2 className="w-full text-left text-2xl">{title}</h2>

      <span
        aria-label={`Comprar ${category}`}
        className="text-sm font-medium text-neutral-500 hover:text-white transition-colors duration-200"
      >
        <SpecialText>Comprar</SpecialText>
      </span>
    </Link>
  );
};

export default function HomeRoute() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8 md:gap-12 lg:gap-16">
      <h1 className="text-6xl lg:text-7xl font-medium py-10 lg:py-0">
        Préndalo,
        <br />
        lento y contento...
      </h1>

      <div className="flex-1 grid grid-cols-1 gap-8 lg:grid-cols-3 justify-items-start">
        <HomeCategorySection title="Parafernalia" category="paraphernalia" />
        <HomeCategorySection title="Bongs" category="bongs" />
        <HomeCategorySection title="Encendedores" category="lighters" />
      </div>
    </div>
  );
}
