import { AxiosInstance } from "axios";
import { ApiResponse, ICart, ICartDetail } from "../../../interfaces";
import { createApiClient } from "../../api-client";

interface ICartDetailService {
  create(newCartDetail: ICart): Promise<ApiResponse<ICartDetail[]>>;
  update(updatedCartDetail: ICartDetail): Promise<ApiResponse<ICartDetail[]>>;
  delete(cartDetailId: number): Promise<ApiResponse<void>>;
}
const apiClient: AxiosInstance = createApiClient("cart_details");
class CartDetailService implements ICartDetailService {
  async create(newCartDetail: ICart): Promise<ApiResponse<ICartDetail[]>> {
    return await apiClient.post("", newCartDetail);
  }

  async update(
    updatedCartDetail: ICartDetail,
  ): Promise<ApiResponse<ICartDetail[]>> {
    return await apiClient.put("", updatedCartDetail);
  }

  async delete(cartDetailId: number): Promise<ApiResponse<void>> {
    return await apiClient.delete(`/${cartDetailId}`);
  }
}

export const cartDetailService = new CartDetailService();
