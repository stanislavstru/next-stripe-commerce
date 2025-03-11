"use client";

import { useCart } from "@/common/hooks/useCart";
import { useConfig } from "@/common/hooks/useConfig";
import classNames from "classnames";
import { DeleteIcon } from "@/common/icons/DeleteIcon";
import Link from "next/link";
import Button from "../_UI/Button";
import QuantityInput from "../_UI/QuantityInput";
import Decimal from "decimal.js";
import { Fragment } from "react";
import Tooltip from "../_UI/Tooltip/Tooltip";

const CartList = ({ className }: { className?: string }) => {
  const { cart, setQuantity, removeFromCart } = useCart();
  const { config } = useConfig();

  if (cart.length === 0)
    return (
      <div className="wco-my-8">
        <p>Your cart is empty</p>
        <Link href="/">
          <Button className="wco-mt-8">Continue shopping</Button>
        </Link>
      </div>
    );

  return (
    <div
      className={classNames(
        "wco-flex wco-flex-col wco-divide-y wco-text-sm wco-gap-3",
        className
      )}
    >
      <div className="wco-hidden md:wco-grid wco-grid-cols-12 wco-gap-x-5 wco-text-sm wco-font-medium">
        <div className="wco-col-span-5">Item</div>
        <div className="wco-col-span-2 wco-text-right">Price</div>
        <div className="wco-col-span-3 wco-text-center">Quantity</div>
        <div className="wco-col-span-2">Total</div>
      </div>

      {cart.map((item) => (
        <Fragment key={item.id}>
          <Tooltip
            hidden={item.is_active}
            tooltipContent="This product is not available"
            type="dark"
          >
            <div
              className="wco-grid wco-grid-cols-12 wco-pt-5 wco-gap-x-5"
              key={item.id}
            >
              <div
                className={classNames(
                  "wco-col-span-12 md:wco-col-span-5 wco-mb-5 md:wco-mb-0",
                  !item.is_active && "wco-opacity-30"
                )}
              >
                {item.title}
              </div>
              <div
                className={classNames(
                  "wco-col-span-4 md:wco-col-span-2 wco-flex wco-justify-end wco-items-center wco-text-right wco-font-medium",
                  !item.is_active && "wco-opacity-30"
                )}
              >
                <span className="wco-mr-0.5">{config?.currency_symbol}</span>
                {new Decimal(item.price).toFixed(2)}
              </div>
              <div className="wco-col-span-4 md:wco-col-span-3 wco-flex wco-justify-center wco-items-center">
                <QuantityInput
                  value={item.quantity}
                  onChange={(quantity) => {
                    setQuantity(item.id, quantity);
                  }}
                  // disabled={!item.is_active}
                />
              </div>
              <div className="wco-col-span-4 md:wco-col-span-2 wco-flex wco-justify-between wco-items-center wco-font-medium">
                <div
                  className={classNames(!item.is_active && "wco-opacity-30")}
                >
                  <span className="wco-mr-0.5">{config?.currency_symbol}</span>
                  {new Decimal(item.price * item.quantity).toFixed(2)}
                </div>
                <DeleteIcon
                  className="wco-cursor-pointer wco-min-w-4 wco-w-4 wco-min-h-4 wco-h-4 wco-ml-2"
                  onClick={() => {
                    removeFromCart(item.id);
                  }}
                />
              </div>
            </div>
          </Tooltip>
        </Fragment>
      ))}
    </div>
  );
};

export default CartList;
