import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom";
import { sellingOrderService } from "../services";
import { useDynamicTitle } from "../utils";
import SellingOrderForm from "../features/booking/selling-order/SellingOrderForm";

const SellingOrderInfo: React.FC = () => {
  const { sellingOrderId } = useParams<{
    sellingOrderId: string;
  }>();
  const mode = useLocation().search.split("=")[1];

  const { data: orderData, isLoading: isOrderLoading } = useQuery({
    queryKey: ["selling-order", sellingOrderId],
    queryFn: () => sellingOrderService.getSellingOrder(sellingOrderId || ""),
    select: (data) => data.payload,
  });

  // console.log("sellingOrderId", sellingOrderId);
  console.log("mode", mode);
  console.log("orderData", orderData);

  useDynamicTitle("Xem chi tiết đơn hàng " + sellingOrderId);

  return (
    <>
      <div className="rounded-md bg-white p-6 pt-4">
        <Skeleton loading={isOrderLoading} active>
          <div className="mb-5 flex items-center gap-4">
            <div
              className="cursor-pointer rounded-md bg-white p-2 text-xl text-black shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]"
              onClick={() => window.history.back()}
            >
              <IoMdArrowRoundBack />
            </div>
            <h2 className="text-xl font-semibold">Xem chi tiết đơn hàng</h2>
          </div>

          <SellingOrderForm sellingOrderToUpdate={orderData} viewMode={false} />
        </Skeleton>
      </div>
    </>
  );
};

export default SellingOrderInfo;
