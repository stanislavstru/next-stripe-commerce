"use client";

import { useCart } from "@/common/hooks/useCart";
import cartIcon from "@/common/images/cart.svg";
import Image from "next/image";
import Link from "next/link";

const CartEmblem = () => {
  const { cart } = useCart();

  return (
    <Link href="/cart">
      <div className="wco-relative wco-w-[60px]">
        <Image src={cartIcon} alt="Cart" width={60} height={60} />
        {cart.length > 0 && (
          <div className="wco-absolute wco-w-[20px] wco-h-[20px] wco-top-0 wco-right-0 w wco-flex wco-justify-center wco-items-center wco-bg-primary wco-text-white wco-rounded-full wco-text-[10px] wco-font-medium">
            {cart.length}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartEmblem;
