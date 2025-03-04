import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { productService } from "../../../services";
import OverviewProduct from "../../category/products/OverviewProduct";
import useSearchProductParams from "../../category/products/hooks/useSearchProductParams";

const BestSellers: React.FC = () => {
  const { paginationParams, query, filter, sort } = useSearchProductParams();

  // const { data: itemData } = useQuery({
  //   queryKey: ["allItems"],
  //   queryFn: () => itemService.getAllItems(),
  //   select: (data) => data?.payload?.filter((item) => item.isActivated),
  // });

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
    // select: (data) =>
    //   data?.payload?.data.filter((product) => {
    //     return itemData?.some((item) => item.itemId === product.itemId);
    //   }),
  });

  const productsData = data?.payload?.data;
  // const productsData = data;
  // console.log(productsData);
  // console.log(itemData);

  if (isLoadingProducts) return;

  return (
    <>
      {productsData && (
        <div className="my-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Các sản phẩm bán chạy</h2>
            <Link
              to="/items/best-seller-products"
              className="flex items-center gap-2 text-xl leading-none underline hover:text-[#003F8F]"
            >
              Xem thêm
              <FaArrowRightLong />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {productsData.map((product) => (
              <OverviewProduct product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellers;
