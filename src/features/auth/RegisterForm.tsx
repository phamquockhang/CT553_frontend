import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Radio,
  Select,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { IAddress, ICustomer } from "../../interfaces";
import {
  addressPublicApiService,
  addressService,
  authService,
} from "../../services";
import { useNavigate } from "react-router-dom";

const genderOptions = [
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
  { value: "OTHER", label: "Khác" },
];

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm<ICustomer>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [provinceId, setProvinceId] = useState<number>();
  const [districtId, setDistrictId] = useState<number>();
  const [wardCode, setWardCode] = useState<string>();
  const [description, setDescription] = useState<string>();

  const { mutate: registerCustomer, isPending: isRegistering } = useMutation({
    mutationFn: authService.registerCustomer,

    onSuccess: (data) => {
      console.log(data);
      if (data && data.success) {
        toast.success(data?.message || "Operation successful");
        form.resetFields();
      } else if (data && !data.success)
        toast.error(data?.message || "Operation failed");
    },

    onError: (error: any) => {
      console.log(error.response?.data.message);
      if (error.response?.data.message) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const { mutate: createAddress } = useMutation({
    mutationFn: ({
      customerId,
      newAddress,
    }: {
      customerId: string;
      newAddress: IAddress;
    }) => {
      return addressService.create(customerId, newAddress);
    },

    onSuccess: () => {},

    onError: (error) => {
      console.log(error);
    },
  });

  const disabledDate: DatePickerProps["disabledDate"] = (current) => {
    return current && dayjs(current).isAfter(dayjs().endOf("day"));
  };

  function handleFinish(values: ICustomer) {
    const newUser = {
      ...values,
    };
    console.log("newUser", newUser);

    registerCustomer(newUser, {
      onSuccess: (newCustomer) => {
        // if (newCustomer && newCustomer.success) {
        if (provinceId && districtId && wardCode && description) {
          createAddress(
            {
              // customerId: customerIdByEmail?.payload || "",
              customerId: newCustomer.payload?.customerId || "",
              newAddress: {
                provinceId,
                districtId,
                wardCode,
                description,
                isDefault: true,
              },
            },
            {
              onSuccess: () => {
                navigate("/login");
              },
            },
          );
        }
        // }
      },
    });
  }

  const { data: provinceData, isLoading: isLoadingProvince } = useQuery({
    queryKey: ["province"],
    queryFn: async () => {
      const response = await addressPublicApiService.getProvinces();
      return response.data;
    },
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
  });

  const wardOptions = wardData?.map((ward) => ({
    value: ward.WardCode,
    label: ward.WardName,
  }));

  // if (isLoadingScore || isLoadingAddress) {
  //   return <Loading />;
  // }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      initialValues={{ active: true }}
    >
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Họ"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ",
            },
            {
              // vietnamese name has anccent characters
              pattern:
                /^[a-zA-ZăâđêôơưàảãáạăằẳẵắặâầẩẫấậèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵĂÂĐÊÔƠƯÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚOỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ\s]+$/,
              message: "Họ không chứa ký tự đặc biệt",
            },
          ]}
        >
          <Input placeholder="Họ, ví dụ PHẠM" />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Tên đệm & tên"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đệm & tên",
            },
            {
              pattern:
                /^[a-zA-ZăâđêôơưàảãáạăằẳẵắặâầẩẫấậèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵĂÂĐÊÔƠƯÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚOỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ\s]+$/,
              message: "Tên đệm & tên không chứa ký tự đặc biệt",
            },
          ]}
        >
          <Input placeholder="Tên đệm & tên, ví dụ VAN A" />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Ngày sinh"
          name="dob"
          rules={[
            {
              required: true,
              message: "Ngày sinh không hợp lệ",
            },
          ]}
          getValueProps={(value: string) => ({
            value: value && dayjs(value),
          })}
          normalize={(value: Dayjs) => value && value.tz().format("YYYY-MM-DD")}
        >
          <DatePicker
            className="w-full"
            format="DD/MM/YYYY"
            disabledDate={disabledDate}
            placeholder="Chọn ngày sinh"
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Giới tính"
          name="gender"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giới tính",
            },
          ]}
        >
          <Radio.Group className="space-x-4" options={genderOptions} />
        </Form.Item>
      </div>
      <div className="flex gap-8">
        <Form.Item
          className="flex-1"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              min: 6,
              message: "Mật khẩu phải chứa ít nhất 6 ký tự",
            },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
      </div>
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
                form.setFieldsValue({
                  districtId: undefined,
                  wardCode: undefined,
                });
              }
            }}
            onClear={() => {
              setProvinceId(undefined);
              setDistrictId(undefined);
              setWardCode(undefined);
              form.setFieldsValue({
                districtId: undefined,
                wardCode: undefined,
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
                form.setFieldsValue({
                  wardCode: undefined,
                });
              }
            }}
            onClear={() => {
              setDistrictId(undefined);
              setWardCode(undefined);
              form.setFieldsValue({
                wardCode: undefined,
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
            allowClear
            placeholder="Địa chỉ chi tiết"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={isRegistering}
        >
          Đăng ký
        </Button>
      </Form.Item>

      <p>
        Bạn đã có tài khoản?{" "}
        <a
          className="font-semibold underline hover:text-[#003F8F]"
          href="/login"
        >
          Đăng nhập
        </a>
      </p>
    </Form>
  );
};

export default RegisterForm;
