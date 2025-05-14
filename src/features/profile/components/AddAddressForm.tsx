import { Form, Input, Select } from "antd";
import { FormInstance } from "antd/lib";
import { useEffect } from "react";
import { formatAddressName } from "../../../utils";
import { useAddressData } from "../../components/hooks/useAddressData";

interface AddAddressProps {
  viewMode?: boolean;
  form: FormInstance;
  provinceId: number | undefined;
  setProvinceId: React.Dispatch<React.SetStateAction<number | undefined>>;
  districtId: number | undefined;
  setDistrictId: React.Dispatch<React.SetStateAction<number | undefined>>;
  wardCode: string | undefined;
  setWardCode: React.Dispatch<React.SetStateAction<string | undefined>>;
  description: string | undefined;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;

  setFormattedAddress:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
}

const AddAddressForm: React.FC<AddAddressProps> = ({
  viewMode,
  form,
  provinceId,
  setProvinceId,
  districtId,
  setDistrictId,
  wardCode,
  setWardCode,
  description,
  setDescription,

  setFormattedAddress,
}) => {
  // const { data: provinceData, isLoading: isLoadingProvince } = useQuery({
  //   queryKey: ["province"],
  //   queryFn: async () => {
  //     const response = await addressPublicApiService.getProvinces();
  //     return response.data;
  //   },
  //   select: (data) =>
  //     data?.sort((a, b) => a.ProvinceName.localeCompare(b.ProvinceName)),
  // });

  // const provinceOptions = provinceData?.map((province) => ({
  //   value: province.ProvinceID,
  //   label: province.ProvinceName,
  // }));

  // const { data: districtData, isLoading: isLoadingDistrict } = useQuery({
  //   queryKey: ["district", provinceId],
  //   queryFn: async () => {
  //     const response = await addressPublicApiService.getDistricts(provinceId);
  //     return response.data;
  //   },
  //   select: (data) =>
  //     data?.sort((a, b) => a.DistrictName.localeCompare(b.DistrictName)),
  //   enabled: Boolean(provinceId),
  // });

  // const districtOptions = districtData?.map((district) => ({
  //   value: district.DistrictID,
  //   label: district.DistrictName,
  // }));

  // const { data: wardData, isLoading: isLoadingWard } = useQuery({
  //   queryKey: ["ward", districtId],
  //   queryFn: async () => {
  //     const response = await addressPublicApiService.getWards(districtId);
  //     return response.data;
  //   },
  //   select: (data) =>
  //     data?.sort((a, b) => a.WardName.localeCompare(b.WardName)),
  //   enabled: Boolean(districtId),
  // });

  // const wardOptions = wardData?.map((ward) => ({
  //   value: ward.WardCode,
  //   label: ward.WardName,
  // }));

  const {
    provinceData,
    districtData,
    wardData,
    provinceOptions,
    districtOptions,
    wardOptions,
    isLoadingProvince,
    isLoadingDistrict,
    isLoadingWard,
  } = useAddressData({
    provinceId,
    districtId,
  });

  useEffect(() => {
    if (provinceId && districtId && wardCode && description) {
      setFormattedAddress?.(
        formatAddressName(
          provinceId,
          districtId,
          wardCode,
          description,
          provinceData,
          districtData,
          wardData,
        ),
      );
    } else {
      setFormattedAddress?.(undefined);
    }
  }, [
    provinceId,
    districtId,
    wardCode,
    description,
    provinceData,
    districtData,
    wardData,
    setFormattedAddress,
  ]);

  return (
    <>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Tỉnh/Thành phố"
          name="provinceId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn tỉnh/thành phố",
            },
          ]}
        >
          <Select
            disabled={viewMode}
            loading={isLoadingProvince}
            allowClear
            showSearch
            placeholder="Chọn tỉnh/thành phố"
            options={provinceOptions}
            filterOption={(input, option) =>
              (
                option?.label
                  ?.normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase() ?? ""
              ).indexOf(
                input
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase(),
              ) >= 0
            }
            onSelect={(value: number) => {
              if (value !== provinceId) {
                setProvinceId(value);
                setDistrictId(undefined);
                setWardCode(undefined);
                setDescription("");
                form.setFieldsValue({
                  districtId: undefined,
                  wardCode: undefined,
                  description: "",
                });
              }
            }}
            onClear={() => {
              setProvinceId(undefined);
              setDistrictId(undefined);
              setWardCode(undefined);
              setDescription("");
              form.setFieldsValue({
                provinceId: undefined,
                districtId: undefined,
                wardCode: undefined,
                description: "",
              });
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Quận/Huyện"
          name="districtId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn quận/huyện",
            },
          ]}
        >
          <Select
            disabled={viewMode}
            loading={isLoadingDistrict}
            allowClear
            showSearch
            placeholder="Chọn quận/huyện"
            options={districtOptions}
            filterOption={(input, option) =>
              (
                option?.label
                  ?.normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase() ?? ""
              ).indexOf(
                input
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase(),
              ) >= 0
            }
            onSelect={(value: number) => {
              if (value !== districtId) {
                setDistrictId(value);
                setWardCode(undefined);
                setDescription("");
                form.setFieldsValue({
                  wardCode: undefined,
                  description: "",
                });
              }
            }}
            onClear={() => {
              setDistrictId(undefined);
              setWardCode(undefined);
              setDescription("");
              form.setFieldsValue({
                districtId: undefined,
                wardCode: undefined,
                description: "",
              });
            }}
          />
        </Form.Item>
      </div>

      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Phường/Xã"
          name="wardCode"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn phường/xã",
            },
          ]}
        >
          <Select
            disabled={viewMode}
            loading={isLoadingWard}
            allowClear
            showSearch
            placeholder="Chọn phường/xã"
            options={wardOptions}
            filterOption={(input, option) =>
              (
                option?.label
                  ?.normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase() ?? ""
              ).indexOf(
                input
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase(),
              ) >= 0
            }
            onSelect={(value: string) => {
              setWardCode(value);
              setDescription("");
              form.setFieldsValue({
                description: "",
              });
            }}
            onClear={() => {
              setWardCode(undefined);
              setDescription("");
              form.setFieldsValue({
                wardCode: undefined,
                description: "",
              });
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Địa chỉ chi tiết"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ chi tiết",
            },
          ]}
        >
          <Input
            disabled={viewMode}
            allowClear
            placeholder="Địa chỉ chi tiết"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default AddAddressForm;
