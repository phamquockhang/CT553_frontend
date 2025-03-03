import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import CustomPagination from "../common/components/CustomPagination";
import useSearchProductParams from "../features/category/products/hooks/useSearchProductParams";
import OverviewProduct from "../features/category/products/OverviewProduct";
import { productService } from "../services";
import { useDynamicTitle } from "../utils";

const Search: React.FC = () => {
  const { paginationParams, query, filter, sort } = useSearchProductParams();
  useDynamicTitle(`Tìm kiếm cho: ${query}`);

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
    <div className="mx-auto max-w-6xl p-4">
      <h2 className="text-center text-3xl font-semibold">
        {isLoadingProducts ? (
          <p>Đang tìm kiếm sản phẩm cho từ khóa "{query}"...</p>
        ) : productsData ? (
          <>
            Tìm thấy {productMeta?.total} sản phẩm cho từ khóa "{query}"
            <p className="text-base font-normal">
              Đang hiển thị {productsData.length} trong tổng số{" "}
              {productMeta?.total} sản phẩm
            </p>
          </>
        ) : (
          `Không tìm thấy sản phẩm nào cho từ khóa "${query}"`
        )}
      </h2>

      {isLoadingProducts ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {productsData?.map((product) => (
            <div className="p-4">
              <OverviewProduct product={product} />
            </div>
          ))}
        </div>
      )}

      {isLoadingProducts ? (
        <>
          <Skeleton.Input active={true} size="default" block={true} />
        </>
      ) : (
        productsData && (
          <CustomPagination productMeta={productMeta} showTotal="sản phẩm" />
        )
      )}
    </div>
  );
};

export default Search;
