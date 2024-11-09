import { ROUTE } from "~/utils/enum";

import { Navlink } from "~/components/navlink";

interface HomeCategorySectionProps {
  title: string;
}

const HomeCategorySection = ({ title }: HomeCategorySectionProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full aspect-square flex-1 bg-neutral-900 flex flex-col justify-between items-end p-6 lg:p-8">
        <h2 className="w-full text-left text-2xl">{title}</h2>

        <Navlink to={ROUTE.HOME}>Comprar</Navlink>
      </div>
    </div>
  );
};

export default function HomeRoute() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8 md:gap-12 lg:gap-16">
      <h1 className="text-4xl md:text-7xl lg:text-8xl font-medium">
        Préndalo,
        <br />
        lento y contento...
      </h1>

      <div className="flex-1 grid grid-cols-1 gap-8 lg:grid-cols-3 justify-items-start">
        <HomeCategorySection title="Parafernalia" />
        <HomeCategorySection title="Bongs" />
        <HomeCategorySection title="Encendedores" />
      </div>
    </div>
  );
}
