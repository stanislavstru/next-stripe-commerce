"use server";

import { spreaderRequests } from "../http";
import { ProductsEntity } from "../types/api/types-from-swagger";

export async function getProducts() {
  const response = await spreaderRequests<ProductsEntity[]>({
    path: "/products",
  });

  return response?.response;
}

export async function getProductsByIds(ids: string[]) {
  const response = await spreaderRequests<ProductsEntity[]>({
    path: "/products/find",
    type: "POST",
    body: ids,
  });

  return response?.response;
}

export async function getProductById(id: string) {
  const response = await spreaderRequests<ProductsEntity>({
    path: `/products/${id}`,
  });

  return response?.response;
}

export async function getProductBySlug(slug: string) {
  const response = await spreaderRequests<ProductsEntity>({
    path: `/products/slug/${slug}`,
  });

  return response?.response;
}
