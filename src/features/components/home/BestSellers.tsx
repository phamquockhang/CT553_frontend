import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IProduct } from "../../../interfaces";
import { productService } from "../../../services";
import OverviewProduct from "../../category/products/OverviewProduct";

const BestSellers: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: productService.getAllProducts,
  });

  const allProducts = data?.payload || [];
  allProducts.sort((a: IProduct, b: IProduct) => {
    return a.productName.localeCompare(b.productName);
  });
  const products = allProducts.slice(0, 10);

  if (isLoading) return;

  return (
    <>
      {products && (
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
            {products.map((product) => (
              <OverviewProduct product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellers;
