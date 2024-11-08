import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";
import type { Product } from "~/utils/types";

import { testProducts } from "~/utils/enum";

import { ProductCard } from "~/components/product-card";

interface LoaderData {
  products: Product[];
}

export const loader: LoaderFunction = () => {
  return json({ products: testProducts });
};

export default function HomeRoute() {
  const { products } = useLoaderData<LoaderData>();

  return (
    <div className="flex-1 grid grid-cols-1 gap-8 md:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
