import { AxiosInstance } from "axios";
import {
  ApiResponse,
  IAuthRequest,
  IAuthResponse,
  ICustomer,
} from "../../interfaces";
import { createApiClient } from "../api-client";

interface IAuthService {
  registerCustomer(
    user: Omit<ICustomer, "customerId">,
  ): Promise<ApiResponse<ICustomer>>;
  login(authRequest: IAuthRequest): Promise<ApiResponse<IAuthResponse>>;
  logout(): Promise<ApiResponse<void>>;
}

const apiClient: AxiosInstance = createApiClient("auth", { auth: false });
class AuthService implements IAuthService {
  async registerCustomer(
    user: Omit<ICustomer, "customerId">,
  ): Promise<ApiResponse<ICustomer>> {
    return (await apiClient.post("/register/customer", user)).data;
  }

  async login(authRequest: IAuthRequest): Promise<ApiResponse<IAuthResponse>> {
    return (await apiClient.post("/login", authRequest)).data;
  }

  async logout(): Promise<ApiResponse<void>> {
    return await apiClient.post("/logout");
  }
}

export const authService = new AuthService();
