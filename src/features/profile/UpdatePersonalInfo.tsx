import { Button, Modal } from "antd";
import { useState } from "react";
import { ICustomer } from "../../interfaces";
import UpdatePersonalInfoForm from "./components/UpdatePersonalInfoForm";

interface UpdatePersonalInfoProps {
  user: ICustomer;
}

const UpdatePersonalInfo: React.FC<UpdatePersonalInfoProps> = ({ user }) => {
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
        title={<span className="text-lg">Cập nhật thông tin</span>}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <UpdatePersonalInfoForm
          userToUpdate={user}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UpdatePersonalInfo;
