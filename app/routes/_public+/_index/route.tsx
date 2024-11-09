import type { MetaFunction } from "@remix-run/node";

import { Navlink } from "~/components/navlink";

export const meta: MetaFunction = () => [{ title: "CEUR_SHOP ~ Selected Smoking Shop" }];

interface HomeCategorySectionProps {
  title: string;
  category: string;
}

const HomeCategorySection = ({ title, category }: HomeCategorySectionProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full aspect-square flex-1 bg-neutral-900 flex flex-col justify-between items-end p-6 lg:p-8">
        <h2 className="w-full text-left text-2xl">{title}</h2>

        <Navlink to={`/shop/${category}`}>Comprar</Navlink>
      </div>
    </div>
  );
};

export default function HomeRoute() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8 md:gap-12 lg:gap-16">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium py-10 lg:py-0">
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
