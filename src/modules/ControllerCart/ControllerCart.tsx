"use client";

import CartList from "@/common/components/CartList";
import Title from "@/common/components/_UI/Title/Title";
import { useCart } from "@/common/hooks/useCart";
import { useConfig } from "@/common/hooks/useConfig";
import Decimal from "decimal.js";

const ControllerCart = () => {
  const { config } = useConfig();
  const { cartLength, totalPriceCart } = useCart();

  return (
    <>
      <Title>Cart</Title>
      <CartList className="wco-mt-8" />
      {cartLength > 0 && (
        <div className="wco-flex wco-justify-end wco-pt-8">
          <div className="wco-text-2xl md:wco-text-3xl wco-font-semibold">
            <span className="wco-uppercase">Subtotal:</span>
            <span className="wco-ml-2">
              {config?.currency_symbol}
              {new Decimal(totalPriceCart).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ControllerCart;
