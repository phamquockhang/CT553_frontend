import {
  blue,
  green,
  grey,
  greyDark,
  orange,
  purple,
  red,
  yellow,
} from "@ant-design/colors";
import dayjs from "dayjs";
import { useEffect } from "react";
import {
  FileType,
  IDistrict,
  IProvince,
  IWard,
  OrderStatus,
  PaymentStatus,
  TransactionStatus,
} from "../interfaces";
import { format } from "date-fns";
import { SortOrder } from "antd/es/table/interface";

export function useDynamicTitle(title: string) {
  useEffect(() => {
    if (title.length > 0) {
      document.title = title;
    }
  }, [title]);
}

export function colorFilterIcon(filtered: boolean) {
  return filtered ? "#60C158" : "#fff";
}

export function colorSortUpIcon(sortOrder: SortOrder | undefined) {
  return sortOrder === "ascend" ? "#60C158" : "#fff";
}

export function colorSortDownIcon(sortOrder: SortOrder | undefined) {
  return sortOrder === "descend" ? "#60C158" : "#fff";
}

export function getColorOrderStatus(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return yellow[7];
    case OrderStatus.CONFIRMED:
      return purple[6];
    case OrderStatus.PREPARING:
      return orange[6];
    case OrderStatus.DELIVERING:
      return greyDark[6];
    case OrderStatus.DELIVERED:
      return green[6];
    case OrderStatus.COMPLETED:
      return blue[7];
    case OrderStatus.CANCELLED:
      return red[5];
    default:
      return grey[10];
  }
}

export function getColorPaymentStatus(status: string) {
  switch (status) {
    case PaymentStatus.COD:
      return "green";
    case PaymentStatus.PENDING:
      return "yellow";
    case PaymentStatus.CANCELLED:
      return "red";
    case PaymentStatus.EXPIRED:
      return "gray";
    case PaymentStatus.FAILED:
      return "orange";
    case PaymentStatus.SUCCESS:
      return "blue";
    default:
      return "gray";
  }
}

export function getColorTransactionStatus(status: string) {
  switch (status) {
    case TransactionStatus.PENDING:
      return yellow[7];
    case TransactionStatus.SUCCESS:
      return blue[7];
    case TransactionStatus.FAILED:
      return orange[6];
    case TransactionStatus.CANCELLED:
      return red[6];
    case TransactionStatus.EXPIRED:
      return greyDark[6];
    case TransactionStatus.COD_PENDING:
      return green[6];
    default:
      return grey[10];
  }
}

export function getDefaultFilterValue(
  searchParams: URLSearchParams,
  key: string,
): string[] | undefined {
  const value = searchParams.get(key);
  return value ? value.split(",") : undefined;
}

export function getDefaultSortOrder(
  searchParams: URLSearchParams,
  columnKey: string,
): SortOrder | undefined {
  const sortBy = searchParams.get("sortBy");
  const direction = searchParams.get("direction");

  if (sortBy === columnKey) {
    return direction === "asc"
      ? "ascend"
      : direction === "desc"
        ? "descend"
        : undefined;
  }
  return undefined;
}

export function getSortDirection(sortOrder: string): string | undefined {
  return sortOrder === "ascend"
    ? "asc"
    : sortOrder === "descend"
      ? "desc"
      : undefined;
}

export function translateOrderStatus(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return "Đang chờ xác nhận";
    case OrderStatus.CONFIRMED:
      return "Đã xác nhận";
    case OrderStatus.PREPARING:
      return "Đang chuẩn bị";
    case OrderStatus.DELIVERING:
      return "Đang giao hàng";
    case OrderStatus.DELIVERED:
      return "Đã giao hàng";
    case OrderStatus.COMPLETED:
      return "Hoàn thành";
    case OrderStatus.CANCELLED:
      return "Đã hủy";
    default:
      return status;
  }
}

export function revertOrderStatus(status: string) {
  switch (status) {
    case "Đang chờ xác nhận":
      return OrderStatus.PENDING;
    case "Đã xác nhận":
      return OrderStatus.CONFIRMED;
    case "Đang chuẩn bị":
      return OrderStatus.PREPARING;
    case "Đang giao hàng":
      return OrderStatus.DELIVERING;
    case "Đã giao hàng":
      return OrderStatus.DELIVERED;
    case "Hoàn thành":
      return OrderStatus.COMPLETED;
    case "Đã hủy":
      return OrderStatus.CANCELLED;
    default:
      return status;
  }
}
export function revertPaymentStatus(status: string) {
  switch (status) {
    case "Thanh toán khi nhận hàng":
      return PaymentStatus.COD;
    case "Đang chờ thanh toán":
      return PaymentStatus.PENDING;
    case "Đã hủy thanh toán":
      return PaymentStatus.CANCELLED;
    case "Đã hết hạn thanh toán":
      return PaymentStatus.EXPIRED;
    case "Lỗi trong quá trình thanh toán":
      return PaymentStatus.FAILED;
    case "Đã thanh toán":
      return PaymentStatus.SUCCESS;
    default:
      return status;
  }
}

export function translatePaymentStatus(status: string) {
  switch (status) {
    case PaymentStatus.COD:
      return "Thanh toán khi nhận hàng";
    case PaymentStatus.PENDING:
      return "Đang chờ thanh toán";
    case PaymentStatus.CANCELLED:
      return "Đã hủy thanh toán";
    case PaymentStatus.EXPIRED:
      return "Đã hết hạn thanh toán";
    case PaymentStatus.FAILED:
      return "Lỗi";
    case PaymentStatus.SUCCESS:
      return "Đã thanh toán";
    default:
      return status;
  }
}

export function formatISODate(date: string) {
  return format(new Date(date), "yyyy-MM-dd");
}

export function groupBy<T, K>(
  list: T[],
  keyGetter: (item: T) => K,
): Map<K, T[]> {
  const map = new Map<K, T[]>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function formatTimestamp(timestamp: string) {
  return dayjs(timestamp).format("DD-MM-YYYY HH:mm:ss");
}

export async function getBase64(file: FileType): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function getProvinceNameById(
  provinceId?: number,
  provinces?: IProvince[],
): string {
  return (
    provinces?.find((province) => province.ProvinceID === provinceId)
      ?.ProvinceName || ""
  );
}

export function getDistrictNameById(
  districtId?: number,
  districts?: IDistrict[],
): string {
  return (
    districts?.find((district) => district.DistrictID === districtId)
      ?.DistrictName || ""
  );
}

export function getWardNameById(wardCode?: string, wards?: IWard[]): string {
  return wards?.find((ward) => ward.WardCode === wardCode)?.WardName || "";
}

export function formatAddressName(
  provinceId?: number,
  districtId?: number,
  wardCode?: string,
  description?: string,
  provinces?: IProvince[],
  districts?: IDistrict[],
  wards?: IWard[],
): string {
  return `${description}, ${getWardNameById(wardCode, wards)}, ${getDistrictNameById(
    districtId,
    districts,
  )}, ${getProvinceNameById(provinceId, provinces)}`;
}
