import { CloseCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../common/Loading";
import {
  IBriefTransaction,
  PaymentStatus,
  TransactionType,
} from "../interfaces";
import { transactionService } from "../services";

const FailedPayment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const transactionId = searchParams.get("transactionId");

  const { data: transactionData, isPending } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => transactionService.getTransactionById(Number(transactionId)),
    select: (data) => data.payload,
  });

  const { mutate: createTransaction, isPending: isCreatingTransaction } =
    useMutation({
      mutationFn: (newTransaction: IBriefTransaction) => {
        return transactionService.createTransaction(newTransaction);
      },

      onSuccess: (data) => {
        if (data.success) {
          console.log(data.payload?.paymentMethod.paymentUrl);
          if (data.payload?.paymentMethod.paymentUrl) {
            window.location.href = data.payload?.paymentMethod.paymentUrl;
          }
        } else if (!data.success)
          toast.error(data.message || "Operation failed");
      },

      onError: (error) => {
        toast.error(error.message || "Operation failed");
      },
    });

  function handleRetryPayment() {
    const newTransaction: IBriefTransaction = {
      sellingOrder: {
        sellingOrderId: transactionData?.sellingOrder.sellingOrderId || "",
      },
      transactionType: TransactionType.PAYMENT,
      paymentMethod: {
        paymentMethodId: 1,
        paymentMethodName: "VN_PAY",
      },
    };

    createTransaction(newTransaction);
  }

  // console.log(transactionData);

  return (
    <>
      {transactionId === null || isPending ? (
        <Loading />
      ) : (
        <div className="bg--100 flex items-center justify-center py-10">
          <Card className="rounded-2xl p-8 text-center shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]">
            {/* <CheckCircleOutlined className="mb-4 text-5xl text-green-500" /> */}
            <CloseCircleOutlined className="mb-4 text-5xl text-red-500" />
            <h2 className="text-2xl font-semibold">Thanh toán thất bại!</h2>
            <p className="mt-2 text-gray-600">
              Mã đơn hàng:{" "}
              <span className="font-bold text-black">
                {transactionData?.sellingOrder.sellingOrderId}
              </span>
            </p>

            <div className="flex gap-2">
              <Button
                type="default"
                className="mt-4"
                onClick={() => navigate("/")}
              >
                Về trang chủ
              </Button>

              {transactionData?.sellingOrder.paymentStatus !==
                PaymentStatus.EXPIRED && (
                <Button
                  loading={isCreatingTransaction}
                  type="primary"
                  className="mt-4"
                  onClick={handleRetryPayment}
                >
                  Thanh toán lại
                </Button>
              )}
              <Button
                type="primary"
                className="mt-4"
                onClick={() => navigate("/check-out")}
              >
                Chỉnh sửa đơn hàng
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default FailedPayment;
