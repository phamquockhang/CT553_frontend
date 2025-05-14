import { Pagination } from "antd";
import { PaginationMeta } from "../../interfaces";
import usePagination from "../../features/components/hooks/usePagination";

interface CustomPaginationProps {
  productMeta?: PaginationMeta;
  showTotal?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  productMeta,
  showTotal,
}) => {
  const { handlePageChange, itemPaginationRender } = usePagination();

  return (
    <Pagination
      align="center"
      current={productMeta?.page}
      pageSize={productMeta?.pageSize}
      total={productMeta?.total}
      showSizeChanger
      //   showTotal={(total) => `Tổng ${total} sản phẩm`}
      showTotal={(total) => {
        if (showTotal) {
          return `Tổng ${total} ${showTotal}`;
        }
        return;
      }}
      onChange={handlePageChange}
      className="pb-10 pt-5"
      itemRender={itemPaginationRender}
    />
  );
};

export default CustomPagination;
