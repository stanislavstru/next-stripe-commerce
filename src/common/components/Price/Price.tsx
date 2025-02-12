"use client";

import { useConfig } from "@/common/hooks/useConfig";
import classNames from "classnames";

type PriceProps = {
  price: number;
  className?: string;
  exlTax?: boolean;
};

const Price: React.FC<PriceProps> = ({ price, className, exlTax }) => {
  const { config } = useConfig();

  return (
    <div className={classNames(className)}>
      <span className="wco-text-2xl wco-font-normal">
        {config?.currency_symbol}
      </span>
      <span className="wco-text-2xl wco-font-normal">{price}</span>
      {exlTax && <span className="wco-ml-2 wco-font-extralight">exl. Tax</span>}
    </div>
  );
};

export default Price;
