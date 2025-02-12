"use client";

import { FC, Fragment } from "react";
import classNames from "classnames";
import CategoriesItem from "./components/CategoriesItem";
import { useProductCategories } from "@/common/hooks/useProductCategories";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const ProductCategories: FC = ({}) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    activeCategoryId,
    categories: productCategories,
    setActiveCategory,
  } = useProductCategories();

  const onClickCategory = (categoryId: typeof activeCategoryId) => {
    if (pathname !== "/" && categoryId !== activeCategoryId) router.push("/");

    setActiveCategory(categoryId);
    router.push("/");
  };

  return (
    <div className="wco-flex wco-flex-row wco-flex-wrap md:wco-flex-col md:wco-gap-y-2 md:wco-p-2 md:wco-border wco-border-third wco-rounded-md md:wco-min-w-[100px] md:wco-max-w-[100px]">
      <div
        className={classNames(
          "wco-w-1/3 md:wco-w-full wco-h-[120px] md:wco-h-[50px] wco-p-2 md:wco-p-0"
        )}
        onClick={() => onClickCategory(null)}
      >
        <div
          className={classNames(
            "wco-relative wco-border wco-bg-white wco-rounded-sm wco-flex wco-items-center wco-justify-center wco-transition-all wco-h-full",
            activeCategoryId === null
              ? "wco-border-dark wco-text-black wco-text-2xl wco-font-medium"
              : "wco-border-third wco-text-gray-700",
            activeCategoryId === null && pathname === "/"
              ? "wco-cursor-not-allowed"
              : "wco-cursor-pointer"
          )}
        >
          ALL
        </div>
      </div>
      {productCategories.map((category) => (
        <Fragment key={category.id}>
          <CategoriesItem
            className="wco-w-1/3 md:wco-w-full wco-h-[120px] md:wco-h-[90px] wco-p-2 md:wco-p-0"
            category={category}
            activeCategory={activeCategoryId === category.id}
            onChangeCategory={() => onClickCategory(category.id)}
            disabled={activeCategoryId === category.id && pathname === "/"}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default ProductCategories;
