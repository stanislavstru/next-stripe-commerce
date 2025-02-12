import { useAppSelector } from "../redux/hooks";
import { selectConfig } from "../redux/reducers/config";

export const useConfig = () => {
  const config = useAppSelector(selectConfig);

  return {
    config: config.data,
    status: config.status,
  };
};
