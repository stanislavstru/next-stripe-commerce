import Image from "next/image";
import classNames from "classnames";
import { useState } from "react";
import { ProductCategoriesEntity } from "@/common/types/api/types-from-swagger";

const MAIN_ITEN_CLASS =
  "wco-flex wco-items-center wco-justify-center wco-rounded-sm wco-relative wco-border wco-transition-all wco-h-full";

type CategoriesItemProps = {
  className?: string;
  category: ProductCategoriesEntity;
  activeCategory: boolean;
  disabled?: boolean;
  onChangeCategory: (
    activeCategoryId: ProductCategoriesEntity["id"] | null
  ) => void;
};

const CategoriesItem: React.FC<CategoriesItemProps> = ({
  className,
  category,
  activeCategory,
  disabled,
  onChangeCategory,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={classNames(className)}
      onClick={() => onChangeCategory(category.id)}
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
    >
      <div
        className={classNames(
          MAIN_ITEN_CLASS,
          disabled ? "wco-cursor-not-allowed" : "wco-cursor-pointer",
          hovered || activeCategory
            ? " wco-text-black wco-border-dark"
            : " wco-text-gray-700 wco-font-extralight wco-border-third"
        )}
      >
        <div
          className={classNames(
            "wco-w-[90%] wco-h-[60px] wco-mt-5 wco-absolute wco-rounded-md wco-overflow-hidden wco-transition-all",
            hovered || activeCategory ? "wco-scale-150" : "wco-scale-100"
          )}
        >
          <Image
            src={category.image_url}
            alt={category.title}
            fill
            className="wco-object-contain wco-object-center"
            sizes="300px"
            priority
          />
        </div>
        <span
          className={classNames(
            "wco-text-sm wco-absolute wco-top-1.5 wco-left-0 wco-right-0 wco-text-center wco-transition-all",
            (hovered || activeCategory) && "wco-text-dark wco-font-normal"
          )}
        >
          {category.title}
        </span>
      </div>
    </div>
  );
};

export default CategoriesItem;
