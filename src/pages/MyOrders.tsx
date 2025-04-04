import { useQuery } from "@tanstack/react-query";
import { DatePicker, DatePickerProps, Input, Select } from "antd";
import { SearchProps } from "antd/es/input";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoggedInCustomer } from "../features/auth/hooks";
import SellingOrdersTable from "../features/booking/selling-order/SellingOrdersTable";
import {
  PaymentStatus,
  SellingOrderFilterCriteria,
  SortParams,
  TimeRange,
} from "../interfaces";
import { sellingOrderService } from "../services";
import { useDynamicTitle } from "../utils";

const { Option } = Select;
const { RangePicker } = DatePicker;

const SellingOrder: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useLoggedInCustomer();
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [orderStatus, setOrderStatus] = useState<string | undefined>(
    searchParams.get("orderStatus") || undefined,
  );
  const [paymentStatus, setPaymentStatus] = useState<string | undefined>(
    searchParams.get("paymentStatus") || undefined,
  );

  const timeRange: TimeRange | undefined =
    dateRange[0] && dateRange[1]
      ? {
          startDate: dateRange[0].format("YYYY-MM-DD"),
          endDate: dateRange[1].format("YYYY-MM-DD"),
        }
      : undefined;
  const pagination = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 9,
  };
  const query = searchParams.get("query") || "";
  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "createdAt",
    direction: searchParams.get("direction") || "",
  };
  const filter: SellingOrderFilterCriteria = {
    orderStatus: searchParams.get("orderStatus") || undefined,
    paymentStatus: searchParams.get("paymentStatus") || undefined,
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "selling-orders",
      timeRange,
      pagination,
      query,
      sort,
      filter,
    ].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () =>
      user &&
      sellingOrderService.getSellingOrdersByCustomer(
        user.customerId,
        pagination,
        query,
        filter,
        sort,
        timeRange,
      ),
  });

  const handleSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      searchParams.set("query", value);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
  };

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null]) => {
    if (dates) {
      setDateRange(dates);
      searchParams.set("startDate", dates[0]?.format("YYYY-MM-DD") || "");
      searchParams.set("endDate", dates[1]?.format("YYYY-MM-DD") || "");
    } else {
      setDateRange([null, null]);
      searchParams.delete("startDate");
      searchParams.delete("endDate");
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (value: string) => {
    if (value) {
      searchParams.set("sortBy", value);
    } else {
      searchParams.delete("sortBy");
    }
    setSearchParams(searchParams);
  };

  const handleOrderStatusChange = (value: string) => {
    if (value) {
      setOrderStatus(value);
      searchParams.set("orderStatus", value);
    } else {
      setOrderStatus(undefined);
      searchParams.delete("orderStatus");
    }
    setSearchParams(searchParams);
  };

  const handlePaymentStatusChange = (value: string) => {
    if (value) {
      setPaymentStatus(value);
      searchParams.set("paymentStatus", value);
    } else {
      setPaymentStatus(undefined);
      searchParams.delete("paymentStatus");
    }
    setSearchParams(searchParams);
  };

  useDynamicTitle("Danh sách đơn hàng");

  console.log("data", data);

  const disabledDate: DatePickerProps["disabledDate"] = (current) => {
    return current && dayjs(current).isAfter(dayjs().endOf("day"));
  };

  return (
    <div className="card">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách đơn hàng</h2>

        <div className="w-[45%]">
          <div className="flex gap-3">
            <Input.Search
              placeholder="Nhập mã hóa đơn bán hàng để tìm kiếm..."
              defaultValue={query}
              enterButton
              allowClear
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <RangePicker
          disabledDate={disabledDate}
          onChange={(dates) => {
            if (dates) {
              setDateRange(dates as [Dayjs | null, Dayjs | null]);
              handleDateRangeChange(dates as [Dayjs | null, Dayjs | null]);
            } else {
              setDateRange([null, null]);
            }
          }}
        />

        <div className="flex justify-end gap-3">
          <Select
            value={orderStatus ?? undefined} // Set undefined if orderStatus is null or undefined
            style={{ width: 170 }}
            onChange={handleOrderStatusChange}
            placeholder="Trạng thái đơn hàng"
            allowClear
          >
            <Option value="PENDING">Đang chờ xác nhận</Option>
            <Option value="CONFIRMED">Đã xác nhận</Option>
            <Option value="PREPARING">Đang chuẩn bị</Option>
            <Option value="DELIVERING">Đang giao hàng</Option>
            <Option value="DELIVERED">Đã giao hàng</Option>
            <Option value="COMPLETED">Hoàn thành</Option>
            <Option value="CANCELLED">Đã hủy</Option>
          </Select>

          <Select
            value={paymentStatus ?? undefined} // Set undefined if paymentStatus is null or undefined
            style={{ width: 210 }}
            onChange={handlePaymentStatusChange}
            placeholder="Trạng thái thanh toán"
            allowClear
          >
            <Option value={PaymentStatus.SUCCESS}>Đã thanh toán</Option>
            <Option value={PaymentStatus.COD}>Thanh toán khi nhận hàng</Option>
          </Select>

          <Select
            defaultValue={sort.sortBy}
            style={{ width: 150 }}
            onChange={handleSortChange}
            placeholder="Sắp xếp theo"
          >
            <Option value="totalAmount">Giá trị đơn hàng</Option>
            <Option value="createdAt">Ngày tạo</Option>
          </Select>
        </div>
      </div>

      <SellingOrdersTable
        sellingOrderPage={data?.payload}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </div>
  );
};

export default SellingOrder;
