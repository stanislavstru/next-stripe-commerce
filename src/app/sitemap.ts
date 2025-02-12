import { getProducts } from "@/common/actions/products";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  if (!products) return [];

  const preparedProducts = products.map<MetadataRoute.Sitemap[0]>(
    (product) => ({
      url: `${process.env.CLIENT_HOST}/product/${product.slug}`,
      lastModified: product.updated_at,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const mainSitemap: MetadataRoute.Sitemap = [
    {
      url: process.env.CLIENT_HOST as string,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.CLIENT_HOST}/pages/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${process.env.CLIENT_HOST}/pages/privacy-poicy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${process.env.CLIENT_HOST}/pages/return-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${process.env.CLIENT_HOST}/pages/shipping-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${process.env.CLIENT_HOST}/pages/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];

  return [...mainSitemap, ...preparedProducts];
}
