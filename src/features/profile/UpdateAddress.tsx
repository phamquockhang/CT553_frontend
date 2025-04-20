import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Tooltip } from "antd";
import { useState } from "react";
import { IAddress } from "../../interfaces";
import AddAddressForm from "./components/AddAddressForm";
import { useAddressHooks } from "./hooks";

interface UpdateAddressInfoProps {
  address: IAddress;
}

const UpdateAddress: React.FC<UpdateAddressInfoProps> = ({ address }) => {
  const [form] = Form.useForm<IAddress>();
  const { updateAddress, isUpdatingAddress } = useAddressHooks();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [provinceId, setProvinceId] = useState<number | undefined>(
    address.provinceId,
  );
  const [districtId, setDistrictId] = useState<number | undefined>(
    address.districtId,
  );
  const [wardCode, setWardCode] = useState<string | undefined>(
    address.wardCode,
  );
  const [description, setDescription] = useState<string | undefined>(
    address.description,
  );

  function handleFinish() {
    if (provinceId && districtId && wardCode && description) {
      updateAddress(
        {
          addressId: address.addressId || "",
          updatedAddress: {
            provinceId,
            districtId,
            wardCode,
            description,
            isDefault: address.isDefault,
          },
        },
        {
          onSuccess: () => {
            form.resetFields();
            setProvinceId(undefined);
            setDistrictId(undefined);
            setWardCode(undefined);
            setDescription(undefined);

            setIsOpenModal(false);
          },

          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  }

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Tooltip title="Sửa thông tin địa chỉ">
        <Button type="link" icon={<EditOutlined />} onClick={handleOpenModal} />
      </Tooltip>
      <Modal
        open={isOpenModal}
        width="50%"
        title={<span className="text-lg">Cập nhật thông tin địa chỉ</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={{
            provinceId: provinceId,
            districtId: districtId,
            wardCode: wardCode,
            description: description,
          }}
          onFinish={handleFinish}
        >
          <AddAddressForm
            form={form}
            provinceId={provinceId}
            setProvinceId={setProvinceId}
            districtId={districtId}
            setDistrictId={setDistrictId}
            wardCode={wardCode}
            setWardCode={setWardCode}
            description={description}
            setDescription={setDescription}
            setFormattedAddress={() => {}}
          />

          <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
            <Button onClick={handleCloseModal} loading={isUpdatingAddress}>
              Hủy
            </Button>
            <Button
              className="ml-2"
              type="primary"
              htmlType="submit"
              loading={isUpdatingAddress}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAddress;
