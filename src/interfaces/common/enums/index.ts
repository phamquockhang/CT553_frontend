//PERMISSIONS
export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum Module {
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
  ROLES = "ROLE",
  PERMISSIONS = "PERMISSION",
  ITEMS = "ITEM",
  PRODUCTS = "PRODUCT",
}

export enum RoleName {
  MANAGER = "MANAGER",
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
}

export enum PaymentStatus {
  // PAID = "PAID",
  // UNPAID = "UNPAID",
  COD = "COD",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum TransactionType {
  PAYMENT = "PAYMENT",
}
