import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";
import type { Product } from "~/utils/types";

import { contentful } from "~/lib/contentful.server";

import { ProductCard } from "~/components/product-card";

interface LoaderData {
  products: Product[];
}

export const loader: LoaderFunction = async () => {
  const products = await contentful.getEntries({ content_type: "product" });

  const formattedProducts = products.items.map((product) => ({
    id: product.sys.id,
    ...product.fields,
  }));

  return json({ products: formattedProducts });
};

export default function HomeRoute() {
  const { products } = useLoaderData<LoaderData>();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
