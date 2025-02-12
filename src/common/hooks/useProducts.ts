import { useAppSelector } from "../redux/hooks";
import { selectProduct } from "@/redux/reducers/products";

export const useProducts = (
  args: {
    activeCategoryId: string | null;
  } | null = null
) => {
  const products = useAppSelector(selectProduct);

  const filteredProducts = products.data
    .filter((product) => {
      if (!args?.activeCategoryId) return true;

      return product.category_id === args.activeCategoryId;
    })
    .sort((a, b) => (a.quantity > b.quantity ? -1 : 1));

  return {
    products: products.data,
    filteredProducts,
    status: products.status,
  };
};
