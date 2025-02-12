"use client";

import dynamic from "next/dynamic";
const ProductsGallery = dynamic(() => import("./componetns/ProductsGallery"), {
  ssr: false,
  loading: () => (
    <div className="wco-h-[100px] wco-flex wco-items-center wco-justify-center">
      Loading...
    </div>
  ),
});
import { Suspense } from "react";
import ModalPreorder from "@/common/components/_modals/ModalPreorder";

const ControllerHome = () => {
  return (
    <Suspense>
      <ProductsGallery />
      <ModalPreorder />
    </Suspense>
  );
};

export default ControllerHome;
