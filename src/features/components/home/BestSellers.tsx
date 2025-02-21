import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { productService } from "../../../services";
import { useQuery } from "@tanstack/react-query";

const BestSellers: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["allProducts"],
    queryFn: productService.getAllProducts,
  });

  const products = data?.payload?.slice(0, 5) || undefined;

  return (
    <>
      {products && (
        <div className="mt-10 px-20">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Bán chạy nhất</h2>
            <Link
              to="/items"
              className="flex items-center gap-2 text-xl leading-none underline hover:text-[#003F8F]"
            >
              Xem thêm
              <FaArrowRightLong />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border bg-white shadow-md"
              >
                <img
                  src={
                    product?.productImages[0]?.imageUrl
                      ? product.productImages[0].imageUrl
                      : "https://placehold.co/400"
                  }
                  alt={product.productName}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {product.productName}
                  </h3>
                  <p className="text-xl font-bold text-[#003F8F]">
                    {product.sellingPrice.sellingPriceValue.toLocaleString()}đ
                  </p>
                  {/* {product.oldPrice && (
                <p className="text-sm text-gray-500 line-through">
                  {product.oldPrice}
                </p>
              )} */}
                  {/* {product.discount && (
                <span className="rounded bg-red-500 px-2 py-1 text-xs text-white">
                  {product.discount}
                </span>
              )} */}
                  <button className="mt-3 w-full rounded border bg-[#003F8F] py-1 font-semibold text-white transition-all duration-500 hover:border-[#003F8F] hover:bg-white hover:text-[#003F8F]">
                    CHỌN MUA 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellers;
