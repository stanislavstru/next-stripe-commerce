"use client";

import Image from "next/image";
import Button from "../_UI/Button";
import { ProductsEntity } from "@/common/types/api/types-from-swagger";
import { useConfig } from "@/common/hooks/useConfig";
import { useCart } from "@/common/hooks/useCart";
import Link from "next/link";
import { useModals } from "@/common/hooks/useModals";

const ProductCard = ({ product }: { product: ProductsEntity }) => {
  const { config } = useConfig();
  const { cart, addToCart, removeFromCart } = useCart();
  const { togglePreorderModal } = useModals();

  const isProductInCart = cart.some((item) => item.id === product.id);

  const mainImageURL =
    product?.images?.length > 0 ? product.images[0] : undefined;

  return (
    <div
      key={product.id}
      className="wco-p-4 wco-bg-white wco-border wco-border-third wco-rounded-md wco-h-full wco-flex wco-flex-col"
    >
      {/* ID:{product.id} */}
      {/* Quantity: {product.quantityStorageExternal} */}
      {mainImageURL && (
        <Link href={`/product/${product.slug}`}>
          <div className="wco-w-full wco-h-[200px] wco-relative wco-overflow-hidden">
            <Image
              src={mainImageURL}
              alt={product.title}
              className="wco-object-contain wco-object-center"
              fill
              loading="lazy"
            />
          </div>
        </Link>
      )}

      <div className="wco-text-sm wco-mt-4">{product.title}</div>

      <div className="wco-flex wco-items-center wco-justify-between wco-pt-2 wco-mt-auto ">
        <p className="wco-text wco-text-lg wco-font-medium">
          <span className="wco-mr-0.5">{config?.currency_symbol}</span>
          {product.price}
        </p>

        {product.is_coming_soon ? (
          <p className="wco-text-sm wco-text-info">Coming soon</p>
        ) : (
          <p className="wco-text-sm">
            {product.quantity > 1 && (
              <>
                <span className="wco-mr-1">QTY:</span>
                {product.quantity}
              </>
            )}

            {product.quantity === 1 && <span>Last item in stock</span>}

            {product.quantity === 0 && (
              <span className="wco-text-danger">Out of stock</span>
            )}
          </p>
        )}
      </div>

      <div className="wco-pt-3 wco-flex wco-flex-col wco-justify-between wco-gap-2.5">
        <Link href={`/product/${product.slug}`}>
          <Button className="wco-w-full" size="sm" uppercase>
            Find out more
          </Button>
        </Link>

        {product.quantity > 0 ? (
          <Button
            size="sm"
            className="wco-w-full"
            variant={isProductInCart ? "primary" : "outline"}
            onClick={() => {
              if (isProductInCart) {
                removeFromCart(product.id);
              } else {
                addToCart(product.id);
              }
            }}
            uppercase
          >
            {isProductInCart ? "Remove from cart" : "Add it"}
          </Button>
        ) : (
          <Button
            size="sm"
            className="wco-w-full"
            variant="outline"
            onClick={() => {
              togglePreorderModal({
                show: true,
                data: {
                  product,
                },
              });
            }}
            uppercase
          >
            Pre-order
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
