import { useAppSelector } from "../redux/hooks";
import { selectProduct } from "@/redux/reducers/products";
import { useMemo } from "react";

export const useProducts = (
  args: {
    activeCategoryId: string | null;
  } | null = null
) => {
  const products = useAppSelector(selectProduct);

  const filteredProducts = useMemo(() => {
    console.log("products", products.data);
    console.log("args", args?.activeCategoryId);

    return products.data
      .filter((product) => {
        if (!args?.activeCategoryId) return true;

        return product.category_id === args.activeCategoryId;
      })
      .sort((a, b) => (a.quantity > b.quantity ? -1 : 1));
  }, [args?.activeCategoryId, products.data]);

  return {
    products: products.data,
    filteredProducts,
    status: products.status,
  };
};
