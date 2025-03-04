import { AxiosInstance } from "axios";
import { ApiResponse, ICart } from "../../../interfaces";
import { createApiClient } from "../../api-client";

interface ICartService {
  getCartByCustomerId(customerId: string): Promise<ApiResponse<ICart>>;
  create(customerId: string): Promise<ApiResponse<ICart>>;
  delete(cartId: number): Promise<ApiResponse<void>>;
}

const apiClient: AxiosInstance = createApiClient("carts");
class CartService implements ICartService {
  async getCartByCustomerId(customerId: string): Promise<ApiResponse<ICart>> {
    return await apiClient.get(`/${customerId}`);
  }

  async create(customerId: string): Promise<ApiResponse<ICart>> {
    return await apiClient.post("", { customerId });
  }

  async delete(cartId: number): Promise<ApiResponse<void>> {
    return await apiClient.delete(`/${cartId}`);
  }
}

export const cartService = new CartService();
