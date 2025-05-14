import { PaginationProps } from "antd";
import { useSearchParams } from "react-router-dom";

const usePagination = () => {
  const [, setSearchParams] = useSearchParams();

  const handlePageChange: PaginationProps["onChange"] = (current, size) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("page", current.toString());
      newParams.set("pageSize", size.toString());
      return newParams;
    });
  };

  const itemPaginationRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement,
  ) => {
    if (type === "prev") {
      return (
        <p className="rounded-md bg-blue-900 px-2 font-semibold text-white">
          Trước
        </p>
      );
    }
    if (type === "next") {
      return (
        <p className="rounded-md bg-blue-900 px-2 font-semibold text-white">
          Sau
        </p>
      );
    }
    return originalElement;
  };

  return { handlePageChange, itemPaginationRender };
};

export default usePagination;
