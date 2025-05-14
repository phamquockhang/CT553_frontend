import { CheckCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../common/Loading";
import { sellingOrderService } from "../services";

const SuccessfulOrder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sellingOrderId = searchParams.get("sellingOrderId");

  const { data: orderId, isPending } = useQuery({
    queryKey: ["sellingOrder", sellingOrderId],
    queryFn: () =>
      sellingOrderService.getSellingOrder(sellingOrderId as string),
    select: (data) => data.payload?.sellingOrderId,
  });

  console.log(orderId);

  return (
    <>
      {sellingOrderId === null || isPending ? (
        <Loading />
      ) : (
        <div className="bg--100 flex items-center justify-center py-10">
          <Card className="rounded-2xl p-8 text-center shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]">
            <CheckCircleOutlined className="mb-4 text-5xl text-green-500" />
            <h2 className="text-2xl font-semibold">Đặt hàng thành công!</h2>
            <p className="mt-2 text-gray-600">
              Mã đơn hàng:{" "}
              <span className="font-bold text-black">{orderId}</span>
            </p>
            <Button
              type="default"
              className="mt-4"
              onClick={() => navigate("/")}
            >
              Về trang chủ
            </Button>
            <Button
              type="primary"
              className="ml-2 mt-4"
              onClick={() => navigate("/items")}
            >
              Tiếp tục mua hàng
            </Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default SuccessfulOrder;
