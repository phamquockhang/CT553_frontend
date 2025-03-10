import { Button, Form, Input } from "antd";
import { FormInstance } from "antd/lib";
import { IAddress } from "../../../interfaces";
import AddAddress from "../../components/AddAddress";

interface ShippingInfoFormProps {
  form: FormInstance;
  provinceId: number | undefined;
  setProvinceId: React.Dispatch<React.SetStateAction<number | undefined>>;
  districtId: number | undefined;
  setDistrictId: React.Dispatch<React.SetStateAction<number | undefined>>;
  wardCode: string | undefined;
  setWardCode: React.Dispatch<React.SetStateAction<string | undefined>>;
  description: string | undefined;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
  formattedAddress: string | undefined;
  setFormattedAddress:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
  addresses?: IAddress[];
}

const ShippingInfoForm: React.FC<ShippingInfoFormProps> = ({
  form,
  provinceId,
  setProvinceId,
  districtId,
  setDistrictId,
  wardCode,
  setWardCode,
  description,
  setDescription,
  formattedAddress,
  setFormattedAddress,
  addresses,
}) => {
  return (
    <>
      {/* {addressOptions && (
        <Form.Item name="availableAddresses" initialValue="" label="Quốc gia">
          <Select className="w-full" options={addressOptions}></Select>
        </Form.Item>
      )} */}

      <Form.Item
        name="customerName"
        label="Họ và tên"
        rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
      >
        <Input placeholder="Quoc Khang" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
      >
        <Input placeholder="Số điện thoại" />
      </Form.Item>

      <AddAddress
        form={form}
        provinceId={provinceId}
        setProvinceId={setProvinceId}
        districtId={districtId}
        setDistrictId={setDistrictId}
        wardCode={wardCode}
        setWardCode={setWardCode}
        description={description}
        setDescription={setDescription}
        setFormattedAddress={setFormattedAddress}
      />

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Xác nhận
        </Button>
      </Form.Item>
    </>
  );
};

export default ShippingInfoForm;
