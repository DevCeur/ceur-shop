import { EntryFieldTypes, EntrySys } from "contentful";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

// contentful types

export interface CategorySkeleton {
  contentTypeId: "productCategory";
  sys: EntrySys;
  fields: {
    name: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    products: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ProductSkeleton>>;
  };
}

export interface ProductSkeleton {
  contentTypeId: "product";
  sys: EntrySys;
  fields: {
    name: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    price: EntryFieldTypes.Number;
    category?: EntryFieldTypes.EntryLink<CategorySkeleton>;
  };
}
