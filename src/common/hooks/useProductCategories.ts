import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  selectProductCategories,
  setActiveCategory as setActiveCategoryAction,
} from "../redux/reducers/product-categories";

export const useProductCategories = () => {
  const dispatch = useAppDispatch();
  const {
    status,
    data: { active, categories },
  } = useAppSelector(selectProductCategories);

  const setActiveCategory = (id: typeof active) => {
    dispatch(setActiveCategoryAction(id));
  };

  return {
    status,
    activeCategoryId: active,
    categories,
    setActiveCategory,
  };
};
