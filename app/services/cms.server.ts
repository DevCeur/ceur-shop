import type { CategoryWithProducts, CategorySkeleton } from "~/utils/types";

import { cms } from "~/lib/cms.server";

import { formatCategoryWithProducts } from "~/utils/format-category-with-products";

interface GetCategoryDetailsOptions {
  name: string;
}

export const getCategoryDetails = async ({
  name,
}: GetCategoryDetailsOptions): Promise<{
  category: CategoryWithProducts | null;
  errors: { [x: string]: string } | null;
}> => {
  try {
    const categoryData = await cms.getEntries<CategorySkeleton>({
      content_type: "productCategory",
      "fields.name[match]": name,
    });

    const foundCategory = categoryData.items[0];

    const category = formatCategoryWithProducts(foundCategory);

    return { category, errors: null };
  } catch (error) {
    return { category: null, errors: { server: "Error getting category details" } };
  }
};
