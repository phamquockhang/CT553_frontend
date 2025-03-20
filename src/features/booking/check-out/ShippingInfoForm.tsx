import { Form, Input, Tooltip } from "antd";
import { FormInstance } from "antd/lib";
import { IAddress } from "../../../interfaces";
import AddAddress from "../../components/AddAddress";
import { IoInformationCircle } from "react-icons/io5";

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
        <Input placeholder="Nguyen Van A" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại" },
          { pattern: /^0[0-9]{9}$/, message: "Số điện thoại không hợp lệ" },
        ]}
      >
        <Input placeholder="0123456789" />
      </Form.Item>

      <Form.Item
        name="email"
        label={
          <div className="flex items-center gap-2">
            <p>Email</p>
            <Tooltip title="Thông báo về đơn hàng sẽ gửi qua email này">
              <IoInformationCircle />
            </Tooltip>
          </div>
        }
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input placeholder="customer@example.com" />
      </Form.Item>

      <Form.Item name="note" label="Ghi chú" rules={[{ required: false }]}>
        <Input.TextArea placeholder="Ghi chú" />
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
    </>
  );
};

export default ShippingInfoForm;
