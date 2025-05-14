import { AxiosInstance } from "axios";
import { ApiResponse, IPaymentMethod } from "../../interfaces";
import { createApiClient } from "../api-client";

interface IPaymentMethodService {
  getAllPaymentMethods(): Promise<ApiResponse<IPaymentMethod[]>>;
}

const apiClient: AxiosInstance = createApiClient("payment-methods");

class PaymentMethodService implements IPaymentMethodService {
  async getAllPaymentMethods(): Promise<ApiResponse<IPaymentMethod[]>> {
    return await apiClient.get("/all");
  }
}

export const paymentMethodService = new PaymentMethodService();
