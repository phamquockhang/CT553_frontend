import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductToAddCart {
  productId: number;
  price: number;
  quantity: number;
}

interface CartState {
  products: IProductToAddCart[];
  totalAmount: number;
}

const initialState: CartState = {
  products: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProductToAddCart>) => {
      const existingProduct = state.products.find(
        (product) => product.productId === action.payload.productId,
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.totalAmount += action.payload.price * action.payload.quantity;
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex(
        (product) => product.productId === action.payload,
      );
      if (index !== -1) {
        state.totalAmount -=
          state.products[index].price * state.products[index].quantity;
        state.products.splice(index, 1);
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const product = state.products.find(
        (product) => product.productId === action.payload.id,
      );
      if (product) {
        if (product.quantity === 1 && action.payload.quantity === -1) {
          product.quantity = 1;
        } else {
          product.quantity += action.payload.quantity;
        }

        state.totalAmount = product.quantity * product.price;
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.totalAmount = 0;
    },
  },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice;
