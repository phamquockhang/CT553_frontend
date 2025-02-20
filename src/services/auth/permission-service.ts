import { AxiosInstance } from "axios"
import { ApiResponse, IPermission } from "../../interfaces"
import { createApiClient } from "../api-client"

interface IPermissionService {
  getAllPermissions(): Promise<ApiResponse<IPermission[]>>
  create(permission: Omit<IPermission, "permissionId">): Promise<ApiResponse<IPermission>>
  update(permission: IPermission): Promise<ApiResponse<IPermission>>
}

const apiClient: AxiosInstance = createApiClient("permissions")
class PermissionService implements IPermissionService {
  async getAllPermissions(): Promise<ApiResponse<IPermission[]>> {
    return await apiClient.get("/all")
  }

  async create(permission: Omit<IPermission, "permissionId">): Promise<ApiResponse<IPermission>> {
    return await apiClient.post("", permission)
  }

  async update(permission: IPermission): Promise<ApiResponse<IPermission>> {
    return await apiClient.put(`/${permission.permissionId}`, permission)
  }
}

export const permissionService = new PermissionService()
