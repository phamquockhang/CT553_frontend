import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, ConfigProvider, Form, Input, Select, Space } from "antd";
import toast from "react-hot-toast";
import {
  IBriefSellingOrderStatus,
  ISellingOrder,
  OrderStatus,
  PaymentStatus,
} from "../../../interfaces";
import { sellingOrderService } from "../../../services";
import {
  revertPaymentStatus,
  translateOrderStatus,
  translatePaymentStatus,
} from "../../../utils";
import SellingOrderDetails from "./SellingOrderDetails";
import SellingOrderStatusHistory from "./SellingOrderStatusHistory";
import { useValidPaymentStatuses } from "./hooks/useValidPaymentStatuses";
import { useValidSellingOrderStatuses } from "./hooks/useValidSellingOrderStatuses";

interface SellingOrderFormProps {
  sellingOrderToUpdate?: ISellingOrder;
  viewMode?: boolean;
  onCancel?: () => void;
}

const SellingOrderForm: React.FC<SellingOrderFormProps> = ({
  sellingOrderToUpdate,
  viewMode = false,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // const { user } = useLoggedInCustomer();
  // const [provinceId, setProvinceId] = useState<number>();
  // const [districtId, setDistrictId] = useState<number>();
  // const [wardCode, setWardCode] = useState<string>();
  // const [description, setDescription] = useState<string>();

  // const defaultAddress = user?.addresses.find((address) => address.isDefault);

  const { mutate: cancelOrder, isPending: isCancelOrder } = useMutation({
    mutationFn: ({
      sellingOrderId,
      sellingOrderStatus,
    }: {
      sellingOrderId: string;
      sellingOrderStatus: IBriefSellingOrderStatus;
    }) => {
      return sellingOrderService.updateOrderStatus(
        sellingOrderId,
        sellingOrderStatus,
      );
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes("selling-order") ||
          query.queryKey.includes("selling-orders") ||
          query.queryKey.includes("customers") ||
          query.queryKey.includes("vouchers") ||
          query.queryKey.includes("products") ||
          query.queryKey.includes("items") ||
          query.queryKey.includes("statistics"),
      });

      if (data.success) toast.success(data.message || "Operation successful");
      else if (!data.success) toast.error(data.message || "Operation failed");
    },

    onError: (error) => {
      toast.error(error.message || "Operation failed");
    },
  });

  const handleSubmit = () => {
    if (sellingOrderToUpdate) {
      const sellingOrderStatus: IBriefSellingOrderStatus = {
        orderStatus: OrderStatus.CANCELLED,
        paymentStatus: revertPaymentStatus(
          sellingOrderToUpdate.paymentStatus as PaymentStatus,
        ),
      };

      cancelOrder({
        sellingOrderId: sellingOrderToUpdate.sellingOrderId,
        sellingOrderStatus,
      });
    }
  };

  const initialValues = {
    ...sellingOrderToUpdate,
    orderStatus: sellingOrderToUpdate
      ? translateOrderStatus(sellingOrderToUpdate.orderStatus)
      : OrderStatus.COMPLETED,
    paymentStatus: sellingOrderToUpdate
      ? translatePaymentStatus(sellingOrderToUpdate.paymentStatus)
      : PaymentStatus.SUCCESS,
  };

  const currentOrderStatus = sellingOrderToUpdate?.orderStatus as OrderStatus;
  const currentPaymentStatus =
    sellingOrderToUpdate?.paymentStatus as PaymentStatus;
  const validOrderStatuses = useValidSellingOrderStatuses(currentOrderStatus);
  const validPaymentStatuses = useValidPaymentStatuses(currentPaymentStatus);

  const optionsOrderStatus = validOrderStatuses;
  const optionsPaymentStatus = validPaymentStatuses;

  // console.log("selectedProductsDetails", selectedProductsDetails);
  // console.log("sellingOrderToUpdate", sellingOrderToUpdate);
  // console.log("initialValues", initialValues);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      {sellingOrderToUpdate && (
        <>
          <div className="flex gap-8">
            <Form.Item
              className="flex-1"
              label="Mã đơn hàng"
              name="sellingOrderId"
            >
              <Input
                readOnly={viewMode || sellingOrderToUpdate ? true : false}
              />
            </Form.Item>
          </div>

          <div className="flex gap-8">
            <Form.Item
              className="flex-1"
              //   label="Trạng thái đơn hàng"
              label={
                sellingOrderToUpdate ? (
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">Trạng thái đơn hàng</div>

                    <SellingOrderStatusHistory
                      history={sellingOrderToUpdate?.orderStatuses}
                    />
                  </div>
                ) : (
                  "Trạng thái đơn hàng"
                )
              }
              name="orderStatus"
            >
              <Select disabled={true}>
                {optionsOrderStatus.map(({ value, label }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              className="flex-1"
              //   label="Trạng thái đơn hàng"
              label="Trạng thái thanh toán"
              name="paymentStatus"
            >
              <Select disabled={true}>
                {optionsPaymentStatus.map(({ value, label }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex gap-8">
            <Form.Item
              className="flex-1"
              label="Tên khách hàng"
              name="customerName"
            >
              <Input
                readOnly={viewMode || sellingOrderToUpdate ? true : false}
              />
            </Form.Item>

            <Form.Item className="flex-1" label="Số điện thoại" name="phone">
              <Input
                readOnly={viewMode || sellingOrderToUpdate ? true : false}
              />
            </Form.Item>
          </div>

          <div className="flex gap-8">
            <Form.Item className="flex-1" label="Email" name="email">
              <Input
                readOnly={viewMode || sellingOrderToUpdate ? true : false}
              />
            </Form.Item>

            <Form.Item className="flex-1" label="Địa chỉ" name="address">
              <Input.TextArea
                rows={1}
                readOnly={viewMode || sellingOrderToUpdate ? true : false}
              />
            </Form.Item>
          </div>

          <div className="flex gap-8">
            <Form.Item className="flex-1" label="Ghi chú" name="note">
              <Input.TextArea
                rows={1}
                readOnly={viewMode || sellingOrderToUpdate ? true : false}
              />
            </Form.Item>
          </div>

          <SellingOrderDetails sellingOrder={sellingOrderToUpdate} />
        </>
      )}

      <Form.Item className="m-0 mt-5 text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button
            disabled={isCancelOrder}
            onClick={() => {
              if (onCancel) onCancel();
              else window.history.back();
            }}
          >
            Thoát
          </Button>

          {sellingOrderToUpdate?.orderStatus === OrderStatus.PENDING && (
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#dc2626",
                },
              }}
            >
              <Button
                type="primary"
                className="bg-red-600"
                htmlType="submit"
                loading={isCancelOrder}
              >
                Hủy đơn hàng
              </Button>
            </ConfigProvider>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default SellingOrderForm;
