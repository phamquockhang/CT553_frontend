import { Badge, Card, Pagination, Spin } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ISellingOrder, Page } from "../../../interfaces";
import {
  formatTimestamp,
  getColorOrderStatus,
  getColorPaymentStatus,
  translateOrderStatus,
  translatePaymentStatus,
} from "../../../utils";

interface SellingOrdersTableProps {
  sellingOrderPage?: Page<ISellingOrder>;
  isLoading: boolean;
  isFetching: boolean;
}

const SellingOrdersTable: React.FC<SellingOrdersTableProps> = ({
  sellingOrderPage: orderPage,
  isLoading,
  isFetching,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 9,
  );

  useEffect(() => {
    searchParams.set("page", String(page));
    searchParams.set("pageSize", String(pageSize));
    setSearchParams(searchParams);
  }, [page, pageSize, searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mb-6 flex items-end justify-center">
        <Pagination
          current={page}
          total={orderPage?.meta.total || 0}
          pageSize={pageSize}
          //   showSizeChanger
          onChange={(p, ps) => {
            setPage(p);
            setPageSize(ps);
          }}
          showTotal={(total) => `Tổng ${total} đơn hàng`}
        />
      </div>

      {isLoading || isFetching ? (
        <div className="flex h-60 items-center justify-center">
          <Spin tip="Đang tải dữ liệu..." size="large" />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {orderPage?.data.map((order) => (
            <Card key={order.sellingOrderId} className="shadow-md">
              <h3 className="text-base font-semibold">
                🛒 Mã đơn: {order.sellingOrderId}
              </h3>
              <p className="text-xs text-gray-600">
                Ngày tạo đơn: {formatTimestamp(order.createdAt || "")}
              </p>
              <p className="mt-2 font-semibold text-gray-700">
                💰 {order.totalAmount.toLocaleString()} VNĐ
              </p>

              <div className="mt-2 flex justify-between text-sm">
                <Badge
                  text={translatePaymentStatus(order.paymentStatus)}
                  color={getColorPaymentStatus(order.paymentStatus)}
                />
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <Badge
                  text={translateOrderStatus(order.orderStatus)}
                  color={getColorOrderStatus(order.orderStatus)}
                />

                <a
                  className="underline hover:underline"
                  href={`/selling-orders/${order.sellingOrderId}`}
                >
                  Xem chi tiết
                </a>
              </div>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SellingOrdersTable;
