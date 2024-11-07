import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import { ProductCard } from "~/components/product-card";

interface LoaderData {
  products: object[];
}

export const loader: LoaderFunction = () => {
  return json({ products: [{}, {}, {}, {}] });
};

export default function HomeRoute() {
  const { products } = useLoaderData<LoaderData>();

  return (
    <div className="flex-1 grid grid-cols-1 gap-8 md:grid-cols-2">
      {products.map((_, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  );
}
