import { ApiResponse, IRole } from "../../interfaces"
import { createApiClient } from "../api-client"

interface IRoleService {
  getAllRoles(): Promise<ApiResponse<IRole[]>>
  create(newRole: Omit<IRole, "roleId">): Promise<ApiResponse<IRole>>
  update(updatedRole: IRole): Promise<ApiResponse<IRole>>
}

const apiClient = createApiClient("roles")

class RoleService implements IRoleService {
  async getAllRoles(): Promise<ApiResponse<IRole[]>> {
    return await apiClient.get("/all")
  }

  async create(newRole: Omit<IRole, "roleId">): Promise<ApiResponse<IRole>> {
    return await apiClient.post("", newRole)
  }

  async update(updatedRole: IRole): Promise<ApiResponse<IRole>> {
    return await apiClient.put(`/${updatedRole.roleId}`, updatedRole)
  }
}

export const roleService = new RoleService()
