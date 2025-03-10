import { Card, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services";
import Loading from "../common/Loading";

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const transactionId = searchParams.get("transactionId");

  const { data: orderId, isPending } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => transactionService.getTransactionById(Number(transactionId)),
    select: (data) => data.payload?.sellingOrder.sellingOrderId,
  });

  return (
    <>
      {transactionId === null || isPending ? (
        <Loading />
      ) : (
        <div className="bg--100 flex items-center justify-center py-10">
          <Card className="rounded-2xl p-8 text-center shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]">
            <CheckCircleOutlined className="mb-4 text-5xl text-green-500" />
            <h2 className="text-2xl font-semibold">Thanh toán thành công!</h2>
            <p className="mt-2 text-gray-600">
              Mã đơn hàng:{" "}
              <span className="font-bold text-black">{orderId}</span>
            </p>
            <Button
              type="primary"
              className="mt-4"
              onClick={() => navigate("/")}
            >
              Về trang chủ
            </Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
