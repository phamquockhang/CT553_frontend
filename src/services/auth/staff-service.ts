import { AxiosInstance } from "axios";
import { ApiResponse, IStaff } from "../../interfaces";
import { createApiClient } from "../api-client";

interface IStaffService {
  getLoggedInStaff(): Promise<ApiResponse<IStaff>>;
  getStaffById(staffId: string): Promise<ApiResponse<IStaff>>;
  getStaffByEmail(staffEmail: string): Promise<ApiResponse<IStaff>>;
  create(newStaff: Omit<IStaff, "staffId">): Promise<ApiResponse<IStaff>>;
  update(staffId: string, updatedStaff: IStaff): Promise<ApiResponse<IStaff>>;
  delete(staffId: string): Promise<ApiResponse<void>>;
}

const apiClient: AxiosInstance = createApiClient("staffs");
class StaffService implements IStaffService {
  async getLoggedInStaff(): Promise<ApiResponse<IStaff>> {
    return await apiClient.get("/logged-in");
  }

  async getStaffById(staffId: string): Promise<ApiResponse<IStaff>> {
    return await apiClient.get(`/${staffId}`);
  }

  async getStaffByEmail(staffEmail: string): Promise<ApiResponse<IStaff>> {
    return await apiClient.get(`/email/${staffEmail}`);
  }

  async create(
    newStaff: Omit<IStaff, "staffId">,
  ): Promise<ApiResponse<IStaff>> {
    return await apiClient.post("", newStaff);
  }

  async update(
    staffId: string,
    updatedStaff: IStaff,
  ): Promise<ApiResponse<IStaff>> {
    return await apiClient.put(`/${staffId}`, updatedStaff);
  }

  async delete(staffId: string): Promise<ApiResponse<void>> {
    return await apiClient.delete(`/${staffId}`);
  }
}

export const staffService = new StaffService();
