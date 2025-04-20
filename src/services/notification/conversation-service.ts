import { AxiosInstance } from "axios";
import { ApiResponse, IConversation } from "../../interfaces";
import { createApiClient } from "../api-client";

interface ConversationService {
  getConversations(
    participantId: string,
  ): Promise<ApiResponse<IConversation[]>>;
  createConversation(
    participantId1: string,
    participantId2: string,
  ): Promise<ApiResponse<IConversation>>;
}

const apiClient: AxiosInstance = createApiClient("conversations");

class ConversationServiceImpl implements ConversationService {
  async getConversations(
    participantId: string,
  ): Promise<ApiResponse<IConversation[]>> {
    return await apiClient.get("", {
      params: {
        participantId,
      },
    });
  }

  async createConversation(
    participantId1: string,
    participantId2: string,
  ): Promise<ApiResponse<IConversation>> {
    return await apiClient.post("", {
      participantId1,
      participantId2,
    });
  }
}

export const conversationService = new ConversationServiceImpl();
