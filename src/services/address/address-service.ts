import { ApiResponse } from "../../interfaces";
import { createApiClient } from "../api-client";
import { IAddress } from "../../interfaces/address";
import { AxiosInstance } from "axios";

interface IAddressService {
  getAllAddressesByCustomerId(
    customerId: string,
  ): Promise<ApiResponse<IAddress[]>>;
  getDefaultAddressByCustomerId(
    customerId: string,
  ): Promise<ApiResponse<IAddress>>;
  setDefaultAddress(
    customerId: string,
    addressId: string,
  ): Promise<ApiResponse<void>>;
  create(
    customerId: string,
    newAddress: IAddress,
  ): Promise<ApiResponse<IAddress>>;
  update(
    addressId: string,
    updatedAddress: IAddress,
  ): Promise<ApiResponse<IAddress>>;
  delete(addressId: string): Promise<ApiResponse<void>>;
}

const apiClient: AxiosInstance = createApiClient("addresses");
class AddressService implements IAddressService {
  async getAllAddressesByCustomerId(
    customerId: string,
  ): Promise<ApiResponse<IAddress[]>> {
    return await apiClient.get(`/${customerId}`);
  }

  async getDefaultAddressByCustomerId(
    customerId: string,
  ): Promise<ApiResponse<IAddress>> {
    return await apiClient.get(`/default/${customerId}`);
  }

  async setDefaultAddress(
    customerId: string,
    addressId: string,
  ): Promise<ApiResponse<void>> {
    return await apiClient.put(`/setDefault/${customerId}/${addressId}`);
  }

  async create(
    customerId: string,
    newAddress: IAddress,
  ): Promise<ApiResponse<IAddress>> {
    return await apiClient.post(`/${customerId}`, newAddress);
  }

  async update(
    addressId: string,
    updatedAddress: IAddress,
  ): Promise<ApiResponse<IAddress>> {
    return await apiClient.put(`/${addressId}`, updatedAddress);
  }

  async delete(addressId: string): Promise<ApiResponse<void>> {
    return await apiClient.delete(`/${addressId}`);
  }
}

export const addressService = new AddressService();
