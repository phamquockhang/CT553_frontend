import { useQuery } from "@tanstack/react-query";
import { Pagination, Skeleton } from "antd";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../common/BreadCrumb";
import useSearchProductParams from "../features/category/products/hooks/useSearchProductParams";
import OverviewProduct from "../features/category/products/OverviewProduct";
import usePagination from "../features/components/hooks/usePagination";
import { itemService, productService } from "../services";
import { useDynamicTitle } from "../utils";

const Item: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const itemId = parseInt(pathParts[pathParts.length - 1]);

  const { paginationParams, query, filter, sort } =
    useSearchProductParams(itemId);
  const { handlePageChange, itemPaginationRender } = usePagination();

  const { data: itemData, isLoading: isItemLoading } = useQuery({
    queryKey: ["allItems"],
    queryFn: () => itemService.getAllItems(),
    select: (data) => data?.payload?.find((item) => item.itemId === itemId),
  });
  useDynamicTitle(itemData?.itemName || "Item Detail");

  const { data, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", paginationParams, query, filter, sort].filter(
      (key) => {
        if (typeof key === "string") {
          return key !== "";
        } else if (key instanceof Object) {
          return Object.values(key).some(
            (value) => value !== undefined && value !== "",
          );
        }
      },
    ),
    queryFn: () =>
      productService.getProducts(paginationParams, query, filter, sort),
  });

  const productsData = data?.payload?.data;
  const productMeta = data?.payload?.meta;

  window.scrollTo(0, 0);

  return (
    <>
      {isItemLoading ? (
        <Skeleton.Input active={true} size="large" block={false} />
      ) : (
        <BreadCrumb children={itemData?.itemName} />
      )}

      {isLoadingProducts ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <>
          {productsData && (
            <div className="my-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{itemData?.itemName}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {productsData.map((product) => (
                  <OverviewProduct product={product} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {isLoadingProducts ? (
        <>
          <Skeleton.Input active={true} size="default" block={true} />
        </>
      ) : (
        <Pagination
          align="center"
          current={productMeta?.page}
          pageSize={productMeta?.pageSize}
          total={productMeta?.total}
          showSizeChanger
          showTotal={(total) => `Tổng ${total} sản phẩm`}
          onChange={handlePageChange}
          className="pb-10 pt-5"
          itemRender={itemPaginationRender}
        />
      )}
    </>
  );
};

export default Item;
