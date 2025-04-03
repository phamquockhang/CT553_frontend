import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { IAddress, ICustomer } from "../../interfaces";
import { addressService } from "../../services";
import AddAddressForm from "./components/AddAddressForm";

interface AddAddressProps {
  user: ICustomer;
}

const AddAddress: React.FC<AddAddressProps> = ({ user }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [provinceId, setProvinceId] = useState<number>();
  const [districtId, setDistrictId] = useState<number>();
  const [wardCode, setWardCode] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const { mutate: createAddress, isPending } = useMutation({
    mutationFn: ({
      customerId,
      newAddress,
    }: {
      customerId: string;
      newAddress: IAddress;
    }) => {
      return addressService.create(customerId, newAddress);
    },

    // onSuccess: () => {
    //   form.resetFields();
    //   setProvinceId(undefined);
    //   setDistrictId(undefined);
    //   setWardCode(undefined);
    //   setDescription(undefined);

    //   setIsOpenModal(false);
    // },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("customer");
        },
      });

      if (data && data.success) {
        toast.success(
          data && data.message ? data.message : "Thêm địa chỉ thành công",
        );
      } else if (data && !data.success) {
        toast.error(
          data && data.message ? data.message : "Thêm địa chỉ thất bại",
        );
      }
    },

    onError: (error) => {
      console.log(error);
    },
  });

  function handleFinish() {
    if (provinceId && districtId && wardCode && description) {
      createAddress(
        {
          // customerId: customerIdByEmail?.payload || "",
          customerId: user.customerId,
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
            setIsOpenModal(false);
            setIsOpenModal(false);
          },

          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  }

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Thêm địa chỉ
      </Button>
      <Modal
        open={isOpenModal}
        width="50%"
        title={<span className="text-lg">Cập nhật thông tin</span>}
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
            <Button onClick={handleCloseModal} loading={isPending}>
              Hủy
            </Button>
            <Button
              className="ml-2"
              type="primary"
              htmlType="submit"
              loading={isPending}
            >
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAddress;
