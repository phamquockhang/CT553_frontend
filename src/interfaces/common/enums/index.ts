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
  COD = "COD",
  PENDING = "PENDING",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  SUCCESS = "SUCCESS",
  EXPIRED = "EXPIRED",
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

export enum VoucherStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  OUT_OF_USES = "OUT_OF_USES",
  EXPIRED = "EXPIRED",
  DISABLED = "DISABLED",
}

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  AMOUNT = "AMOUNT",
}

export enum TransactionType {
  PAYMENT = "PAYMENT",
}

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
  COD_PENDING = "COD_PENDING",
}
