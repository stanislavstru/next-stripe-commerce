"use client";

import { useProducts } from "@/common/hooks/useProducts";
import ProductCard from "@/common/components/ProductCard";
import { useProductCategories } from "@/common/hooks/useProductCategories";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { INTERNAL_NAMES } from "@/common/config/main-client-config";

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
        {filteredProducts.map((product) => (
          <div
            className="wco-col-span-12 sm:wco-col-span-6 lg:wco-col-span-3"
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsGallery;
