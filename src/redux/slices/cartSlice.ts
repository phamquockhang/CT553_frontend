import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, ICartDetail } from "../../interfaces";

const initialState: ICart = {
  cartDetails: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ICartDetail>) => {
      const existingProduct = state.cartDetails.find(
        (product) => product.productId === action.payload.productId,
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.cartDetails.push(action.payload);
      }
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      const index = state.cartDetails.findIndex(
        (product) => product.productId === action.payload,
      );
      if (index !== -1) {
        state.cartDetails.splice(index, 1);
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const product = state.cartDetails.find(
        (product) => product.productId === action.payload.id,
      );
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },

    clearCart: (state) => {
      state.cartDetails = [];
    },
  },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice;
