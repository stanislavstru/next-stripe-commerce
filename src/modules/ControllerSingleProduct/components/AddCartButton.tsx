"use client";

import Button from "@/common/components/_UI/Button";
import { useCart } from "@/common/hooks/useCart";
import classNames from "classnames";

type AddCartButtonProps = {
  productId: string;
  className?: string;
};

export const AddCartButton: React.FC<AddCartButtonProps> = ({
  productId,
  className,
}) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const isProductInCart = cart.some((item) => item.id === productId);

  return (
    <div className={classNames(className)}>
      <Button
        className="wco-w-full"
        variant={isProductInCart ? "outline" : "black"}
        onClick={() => {
          if (isProductInCart) {
            removeFromCart(productId);
          } else {
            addToCart(productId);
          }
        }}
        uppercase
      >
        {isProductInCart ? "Remove from cart" : "Add to cart"}
      </Button>
    </div>
  );
};
