"use server";

import { spreaderRequests } from "../http";
import { ProductCategoriesEntity } from "../types/api/types-from-swagger";

export async function getProductsCategories() {
  const response = await spreaderRequests<ProductCategoriesEntity[]>({
    path: "/product-categories",
  });

  return response;
}
