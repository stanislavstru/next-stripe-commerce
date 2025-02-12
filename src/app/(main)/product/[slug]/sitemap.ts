import { MetadataRoute } from "next";
import { getProducts } from "@/common/actions/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  if (!products) return [];

  return products.map((product) => ({
    url: `${process.env.CLIENT_HOST}/product/${product.slug}`,
    lastModified: product.updated_at,
  }));
}
