import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAddress } from "../../../interfaces";
import { addressService } from "../../../services";
import toast from "react-hot-toast";

export const useAddressHooks = () => {
  const queryClient = useQueryClient();

  const { mutate: setDefaultAddress } = useMutation({
    mutationFn: ({
      customerId,
      addressId,
    }: {
      customerId: string;
      addressId: string;
    }) => {
      return addressService.setDefaultAddress(customerId, addressId);
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("customer");
        },
      });

      if (data && data.success)
        toast.success(data?.message || "Operation successful");
      else if (data && !data.success)
        toast.error(data?.message || "Operation failed");
    },

    onError: (error) => {
      console.log(error);
      toast.error(error?.message || "An error occurred");
    },
  });

  const { mutate: createAddress, isPending: isCreatingAddress } = useMutation({
    mutationFn: ({
      customerId,
      newAddress,
    }: {
      customerId: string;
      newAddress: IAddress;
    }) => {
      return addressService.create(customerId, newAddress);
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("customer");
        },
      });

      if (data && data.success)
        toast.success(data?.message || "Operation successful");
      else if (data && !data.success)
        toast.error(data?.message || "Operation failed");
    },

    onError: (error) => {
      console.log(error);
      toast.error(error?.message || "An error occurred");
    },
  });

  const { mutate: updateAddress, isPending: isUpdatingAddress } = useMutation({
    mutationFn: ({
      addressId,
      updatedAddress,
    }: {
      addressId: string;
      updatedAddress: IAddress;
    }) => {
      return addressService.update(addressId, updatedAddress);
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("customer");
        },
      });

      if (data && data.success)
        toast.success(data?.message || "Operation successful");
      else if (data && !data.success)
        toast.error(data?.message || "Operation failed");
    },

    onError: (error) => {
      console.log(error);
      toast.error(error?.message || "An error occurred");
    },
  });

  const { mutate: deleteAddress } = useMutation({
    mutationFn: (addressId: string) => {
      return addressService.delete(addressId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("customer");
        },
      });
      if (data && data.success)
        toast.success(data?.message || "Operation successful");
      else if (data && !data.success)
        toast.error(data?.message || "Operation failed");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message || "An error occurred");
    },
  });

  return {
    createAddress,
    isCreatingAddress,
    updateAddress,
    isUpdatingAddress,

    setDefaultAddress,
    deleteAddress,
  };
};
