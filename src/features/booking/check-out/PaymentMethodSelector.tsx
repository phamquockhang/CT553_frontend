import { useQuery } from "@tanstack/react-query";
import { Radio } from "antd";
import { paymentMethodService } from "../../../services/transaction/payment-method-service";

interface PaymentMethodSelectorProps {
  selectedMethod: number;
  setSelectedMethod: React.Dispatch<React.SetStateAction<number>>;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  setSelectedMethod,
}) => {
  const { data: paymentMethodsData } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: paymentMethodService.getAllPaymentMethods,
    select: (data) => data.payload,
  });

  const paymentMethods = paymentMethodsData
    ? paymentMethodsData.map((method) => ({
        key: method.paymentMethodId,
        value: method.paymentMethodId,
        label:
          method.paymentMethodName === "COD"
            ? "Thanh toán khi nhận hàng (COD)"
            : "Thanh toán qua VNPAY",
      }))
    : [];

  console.log(selectedMethod);

  return (
    <div className="mb-4 w-full rounded-lg bg-white p-4 pt-0 shadow-md">
      <h3 className="mb-3 text-base font-semibold">
        Chọn phương thức thanh toán
      </h3>
      <Radio.Group
        onChange={(e) => setSelectedMethod(e.target.value)}
        value={selectedMethod}
        className="flex flex-col gap-4"
      >
        {paymentMethods.map((method) => (
          <Radio
            value={method.value}
            key={method.key}
            className="m-0 flex items-center gap-4 rounded-md p-3 transition-all duration-300 hover:bg-gray-300 hover:text-blue-900"
          >
            <div className="flex items-center">{method.label}</div>
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default PaymentMethodSelector;
