"use client";

import { Provider as ReduxProviderNative } from "react-redux";
import { useEffect } from "react";
import { makeStore } from "./store";
import { fetchProducts, selectProduct } from "./reducers/products";
import { fetchConfig, selectConfig } from "./reducers/config";
import { fetchCartInfo, selectCartInfo } from "./reducers/cart";
import { fetchProductCategories } from "./reducers/product-categories";
import { useAppSelector } from "./hooks";
import mainIcon from "@/images/main-icon.svg";
import Link from "next/link";
import Image from "next/image";
import Button from "../components/_UI/Button";

const store = makeStore();

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(fetchConfig());
    store.dispatch(fetchCartInfo());
    store.dispatch(fetchProducts());
    store.dispatch(fetchProductCategories());
  }, []);

  return (
    <ReduxProviderNative store={store}>
      <AppWrapper>{children}</AppWrapper>
    </ReduxProviderNative>
  );
}

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const config = useAppSelector(selectConfig);
  const cartInfo = useAppSelector(selectCartInfo);
  const products = useAppSelector(selectProduct);

  if (
    cartInfo.status === "failed" ||
    products.status === "failed" ||
    config.status === "failed"
  ) {
    return (
      <div className="wco-flex wco-flex-col wco-justify-center wco-items-center wco-h-screen wco-w-screen">
        <Link href="/">
          <Image
            src={mainIcon}
            width="170"
            height={74}
            alt={process.env.NEXT_PUBLIC_PROJECT_NAME || ""}
            priority
          />
        </Link>
        <div className="wco-my-5">
          An error has occurred. Please let us know at
          <a
            className="wco-ml-1 wco-text-info"
            href="mailto:wcomarketusa@gmail.com"
          >
            wcomarketusa@gmail.com
          </a>
        </div>
        <div>
          <Button onClick={() => window.location.reload()} uppercase>
            Reload page
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ReduxProvider;
