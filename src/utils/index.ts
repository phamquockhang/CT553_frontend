import dayjs from "dayjs";
import { useEffect } from "react";
import { FileType, IDistrict, IProvince, IWard } from "../interfaces";
import { format } from "date-fns";

export function useDynamicTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
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
