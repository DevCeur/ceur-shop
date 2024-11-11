import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";

import { CategoryWithProducts } from "~/utils/types";

import { getCategoryDetails } from "~/services/cms.server";

import { ProductsList } from "~/components/products-list";

interface LoaderData {
  category: CategoryWithProducts;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { category: categoryName } = params;

  if (!categoryName) {
    redirect("/404");
  }

  const { category, errors } = await getCategoryDetails({ name: categoryName as string });

  if (!category || errors) {
    throw new Error(errors?.server);
  }

  return json({ category });
};

export default function ShopCategoryRoute() {
  const { category } = useLoaderData<LoaderData>();

  return (
    <div className="w-full">
      <div className="pb-12">
        <h1 className="text-4xl md:text-6xl font-medium">{category.name}</h1>
      </div>

      <ProductsList products={category.products} />
    </div>
  );
}
