import { useMutation } from "@tanstack/react-query";
import { cartDetailService } from "./cart-detail-service";
import { ICart, ICartDetail } from "../../../interfaces";
import { cartService } from "./cart-service";

export * from "./cart-detail-service";
export * from "./cart-service";

export function CreateCart() {
  const { mutate: createCart, isPending: isCreatingCart } = useMutation({
    mutationFn: (customerId: string) => {
      return cartService.create(customerId);
    },

    onSuccess: () => {},

    onError: (error) => {
      console.log(error);
    },
  });

  return { createCart, isCreatingCart };
}

export function AddProductToCart() {
  const { mutate: addProductToCart, isPending: isAddingProductToCart } =
    useMutation({
      mutationFn: (cartDetailToAdd: ICart) => {
        return cartDetailService.create(cartDetailToAdd);
      },

      onSuccess: () => {},

      onError: (error) => {
        console.log(error);
      },
    });

  return { addProductToCart, isAddingProductToCart };
}

export function UpdateCartDetail() {
  const { mutate: updateCartDetail, isPending: isUpdatingCartDetail } =
    useMutation({
      mutationFn: (cartDetailToUpdate: ICartDetail) => {
        return cartDetailService.update(cartDetailToUpdate);
      },

      onSuccess: () => {},

      onError: (error) => {
        console.log(error);
      },
    });

  return { updateCartDetail, isUpdatingCartDetail };
}

export function DeleteCartDetail() {
  const { mutate: deleteCartDetail, isPending: isDeletingCartDetail } =
    useMutation({
      mutationFn: (cartDetailId: number) => {
        return cartDetailService.delete(cartDetailId);
      },

      onSuccess: () => {},

      onError: (error) => {
        console.log(error);
      },
    });

  return { deleteCartDetail, isDeletingCartDetail };
}
