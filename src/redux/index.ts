import { useAppDispatch, useAppSelector } from "./hooks";
import { RootState } from "./store";

const useCartData = () => {
  const cartState = useAppSelector((state: RootState) => state.cart);
  const cartDispatch = useAppDispatch();

  return { cartState, cartDispatch };
};

export default useCartData;
