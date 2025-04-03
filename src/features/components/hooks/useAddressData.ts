import { useQuery } from "@tanstack/react-query";
import { addressPublicApiService } from "../../../services";

interface UseAddressDataProps {
  provinceId?: number;
  districtId?: number;
}

export const useAddressData = ({
  provinceId,
  districtId,
}: UseAddressDataProps) => {
  const { data: provinceData, isLoading: isLoadingProvince } = useQuery({
    queryKey: ["province"],
    queryFn: async () => {
      const response = await addressPublicApiService.getProvinces();
      return response.data;
    },
    select: (data) =>
      data?.sort((a, b) => a.ProvinceName.localeCompare(b.ProvinceName)),
  });

  const provinceOptions = provinceData?.map((province) => ({
    value: province.ProvinceID,
    label: province.ProvinceName,
  }));

  const { data: districtData, isLoading: isLoadingDistrict } = useQuery({
    queryKey: ["district", provinceId],
    queryFn: async () => {
      const response = await addressPublicApiService.getDistricts(provinceId);
      return response.data;
    },
    select: (data) =>
      data?.sort((a, b) => a.DistrictName.localeCompare(b.DistrictName)),
    enabled: Boolean(provinceId),
  });

  const districtOptions = districtData?.map((district) => ({
    value: district.DistrictID,
    label: district.DistrictName,
  }));

  const { data: wardData, isLoading: isLoadingWard } = useQuery({
    queryKey: ["ward", districtId],
    queryFn: async () => {
      const response = await addressPublicApiService.getWards(districtId);
      return response.data;
    },
    select: (data) =>
      data?.sort((a, b) => a.WardName.localeCompare(b.WardName)),
    enabled: Boolean(districtId),
  });

  const wardOptions = wardData?.map((ward) => ({
    value: ward.WardCode,
    label: ward.WardName,
  }));

  return {
    provinceData,
    districtData,
    wardData,
    provinceOptions,
    districtOptions,
    wardOptions,
    isLoadingProvince,
    isLoadingDistrict,
    isLoadingWard,
  };
};
