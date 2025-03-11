import { MainLayout } from "@/common/layouts/MainLayout";
import { getProductBySlug } from "@/common/actions/products";
import { notFound } from "next/navigation";
import ControllerSingleProduct from "@/modules/ControllerSingleProduct";
import { Product, WithContext } from "schema-dts";
import { convertToPounds } from "@/common/utils/weight";

import type {
  Metadata,
  //  ResolvingMetadata
} from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: process.env.NEXT_PUBLIC_PROJECT_NAME
      ? process.env.NEXT_PUBLIC_PROJECT_NAME + " | " + product?.title
      : product?.title,
    description: product?.short_description,
    openGraph: {
      title: product?.title,
      description: product?.short_description,
      images: product?.images?.[0] ?? [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const mainImageURL =
    product?.images?.length > 0 ? product.images[0] : undefined;

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.title,
    image: mainImageURL,
    description: product?.short_description ?? undefined,
    weight: {
      "@type": "QuantitativeValue",
      value: convertToPounds(
        product?.item_weight_primary,
        product?.item_weight_secondary
      ),
      unitCode: "lb",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product?.price,
      availability: "https://schema.org/InStock",
      url: `${process.env.CLIENT_HOST}/product/${product?.slug}`,
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        name: process.env.NEXT_PUBLIC_PROJECT_NAME
          ? process.env.NEXT_PUBLIC_PROJECT_NAME + " "
          : "" + "Return Policy",
        url: `${process.env.CLIENT_HOST}/pages/return-policy`,
        merchantReturnDays: 15,
      },
    },
  };

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ControllerSingleProduct product={product} />
    </MainLayout>
  );
}
