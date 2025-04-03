import { Button, Modal } from "antd";
import { useState } from "react";
import { IAddress } from "../../interfaces";

interface UpdateAddressInfoProps {
  addresses: IAddress[];
}

const UpdateAddress: React.FC<UpdateAddressInfoProps> = ({ addresses }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Chỉnh sửa
      </Button>
      <Modal
        open={isOpenModal}
        width="50%"
        title={<span className="text-lg">Cập nhật thông tin địa chỉ</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      ></Modal>
    </>
  );
};

export default UpdateAddress;
