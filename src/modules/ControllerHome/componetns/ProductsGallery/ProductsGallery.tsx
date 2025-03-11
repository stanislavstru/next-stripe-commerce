"use client";

import { useProducts } from "@/common/hooks/useProducts";
import ProductCard from "@/common/components/ProductCard";
import { useProductCategories } from "@/common/hooks/useProductCategories";
import { Fragment, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { INTERNAL_NAMES } from "@/common/config/main-client-config";
import BannerMK5 from "@/common/components/_banner/BannerMK5";

const ProductsGallery = () => {
  const { activeCategoryId } = useProductCategories();
  const { filteredProducts } = useProducts({ activeCategoryId });
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const paymentStatus = searchParams.get("payment-status");

    if (paymentStatus === "success") {
      toast.success(
        `Thank you for your purchase! We have sent you an email with your order details and getting your order ready to be shipped. We will notify you when it has been sent. We hope you like it!`
      );
      localStorage.removeItem(INTERNAL_NAMES.LOCAL_STORAGE_CART);
      router.push("/");
    }
  }, []);

  if (!filteredProducts || filteredProducts.length === 0)
    return (
      <div className="wco-flex wco-h-[200px] wco-justify-center wco-items-center">
        Products not found
      </div>
    );

  return (
    <>
      <div className="wco-w-full wco-grid wco-grid-cols-12 wco-gap-4">
        {filteredProducts.map((product, key) => {
          return (
            <Fragment key={key}>
              {key === 1 && (
                <div className="wco-col-span-12 sm:wco-col-span-6">
                  <BannerMK5 />
                </div>
              )}
              <div className="wco-col-span-12 sm:wco-col-span-6 lg:wco-col-span-3">
                <ProductCard product={product} />
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default ProductsGallery;
