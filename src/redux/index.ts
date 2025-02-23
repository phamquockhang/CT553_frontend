import { useAppDispatch, useAppSelector } from "./hooks";
import { RootState } from "./store";

const useCartData = () => {
  const cartProducts = useAppSelector((state: RootState) => state.cart);
  const cartDispatch = useAppDispatch();

  return { cartProducts, cartDispatch };
};

export default useCartData;
