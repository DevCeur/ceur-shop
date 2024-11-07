import { json } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface LoaderData {
  products: object[];
}

export const loader: LoaderFunction = () => {
  const products = [{}, {}, {}, {}];

  return json({ products });
};

export default function HomeRoute() {
  const { products } = useLoaderData<LoaderData>();

  return (
    <ul className="flex-1 grid grid-cols-1 gap-8 md:grid-cols-2">
      {products.map((_, index) => (
        <li key={index} className="w-full h-full bg-neutral-200" />
      ))}
    </ul>
  );
}
