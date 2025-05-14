import { AxiosInstance } from "axios";
import { ApiResponse, IBriefTransaction, ITransaction } from "../../interfaces";
import { createApiClient } from "../api-client";

interface ITransactionService {
  getAllTransactions(): Promise<ApiResponse<ITransaction[]>>;
  getTransactionById(transactionId: number): Promise<ApiResponse<ITransaction>>;
  createTransaction(
    newTransaction: IBriefTransaction,
  ): Promise<ApiResponse<ITransaction>>;
}

const apiClient: AxiosInstance = createApiClient("transactions");

class TransactionService implements ITransactionService {
  async getAllTransactions(): Promise<ApiResponse<ITransaction[]>> {
    return await apiClient.get("");
  }

  async getTransactionById(
    transactionId: number,
  ): Promise<ApiResponse<ITransaction>> {
    return await apiClient.get(`/${transactionId}`);
  }

  async createTransaction(
    newTransaction: IBriefTransaction,
  ): Promise<ApiResponse<ITransaction>> {
    return await apiClient.post("", newTransaction);
  }
}

export const transactionService = new TransactionService();
