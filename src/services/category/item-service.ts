import { AxiosInstance } from "axios";
import { createApiClient } from "../api-client";
import {
  ApiResponse,
  IBriefItem,
  IItem,
  ItemFilterCriteria,
  Page,
  PaginationParams,
  SortParams,
} from "../../interfaces";

interface IItemService {
  getItem(itemId: number): Promise<ApiResponse<IItem>>;
  getItems(
    pagination: PaginationParams,
    query: string,
    filter?: ItemFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IItem>>>;
  getAllItems(): Promise<ApiResponse<IItem[]>>;
  create(newItem: Omit<IBriefItem, "itemId">): Promise<ApiResponse<IItem>>;
  update(itemId: number, updatedItem: IBriefItem): Promise<ApiResponse<IItem>>;
  delete(itemId: number): Promise<ApiResponse<void>>;
}

const apiClient: AxiosInstance = createApiClient("items");
const apiClientPublic: AxiosInstance = createApiClient("items", {
  auth: false,
});
class ItemService implements IItemService {
  async getItem(itemId: number): Promise<ApiResponse<IItem>> {
    return await apiClient.get(`/${itemId}`);
  }

  async getItems(
    pagination: PaginationParams,
    query: string,
    filter?: ItemFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IItem>>> {
    return await apiClient.get("", {
      params: {
        ...pagination,
        ...filter,
        query,
        sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
        direction: sort?.direction !== "" ? sort?.direction : undefined,
      },
    });
  }

  async getAllItems(): Promise<ApiResponse<IItem[]>> {
    return (await apiClientPublic.get("/all")).data;
  }

  async create(
    newItem: Omit<IBriefItem, "itemId">,
  ): Promise<ApiResponse<IItem>> {
    return await apiClient.post("", newItem);
  }

  async update(
    itemId: number,
    updatedItem: IBriefItem,
  ): Promise<ApiResponse<IItem>> {
    return await apiClient.put(`/${itemId}`, updatedItem);
  }

  async delete(itemId: number): Promise<ApiResponse<void>> {
    return await apiClient.delete(`/${itemId}`);
  }
}

export const itemService = new ItemService();
