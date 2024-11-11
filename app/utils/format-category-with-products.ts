import type { Entry } from "contentful";
import type { CategorySkeleton, CategoryWithProducts, ProductSkeleton } from "./types";

export const formatCategoryWithProducts = (
  category: Entry<CategorySkeleton, undefined, string>
): CategoryWithProducts => {
  const formattedProducts = category.fields.products.map((product) => {
    const internalProduct = product as unknown as Entry<
      ProductSkeleton,
      undefined,
      string
    >;

    delete internalProduct.fields.category;

    return { id: product.sys.id, ...internalProduct.fields };
  });

  const formattedCategory = {
    id: category.sys.id,
    ...category.fields,
    products: formattedProducts,
  };

  return formattedCategory;
};
