import { Form, notification } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "./UseAuth";
import { ICustomer } from "../../../interfaces";
import { formatISODate } from "../../../utils";

export const useRegisterForm = () => {
  const [form] = Form.useForm<ICustomer>();
  const { register, isLoading } = useRegister();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFinish = (values: ICustomer) => {
    const formattedValues = {
      ...values,
      dateOfBirth: formatISODate(values.dob.toString()),
      firstName: values.firstName.toUpperCase(),
      lastName: values.lastName.toUpperCase(),
    };

    console.log("Form values before sending to backend:", formattedValues);

    register(formattedValues, {
      onSuccess: () => {
        form.resetFields();
        setIsModalVisible(true);
      },

      onError: (error) => {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.error ||
            "Có lỗi xảy ra trong quá trình đăng ký.";
          console.error("Register error:", errorMessage);
          notification.error({
            message: "Đăng ký thất bại",
            description: errorMessage,
          });
        }
      },
    });
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return {
    form,
    isLoading,
    onFinish,
    isModalVisible,
    setIsModalVisible,
    handleModalCancel,
    handleModalOk,
  };
};
