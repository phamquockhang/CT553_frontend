import { ISellingOrder } from "../booking";

export interface ITransaction {
  transactionId: number;
  sellingOrder: ISellingOrder;
  paymentMethod: IPaymentMethod;
  transactionType: string;
  status: string;
  amount: number;
  txnRef: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBriefTransaction {
  sellingOrder: {
    sellingOrderId: string;
  };
  paymentMethod: IPaymentMethod;
  transactionType: string;
}

export interface IPaymentMethod {
  paymentMethodId: number;
  paymentMethodName: string;
  vnPayResponse?: string;
  paymentUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
