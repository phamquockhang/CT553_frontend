// import { useQuery } from "@tanstack/react-query";
// import { IoGift } from "react-icons/io5";
// import { useLocation } from "react-router-dom";
// import ErrorPage from "../common/ErrorPage";
// import Loading from "../common/Loading";
// import ProductOder from "../features/category/products/ProductOder";
// import RecommendProducts from "../features/category/products/RecommendProducts";
// import { productService } from "../services";
// import { useDynamicTitle } from "../utils";

// const Product: React.FC = () => {
//   const location = useLocation();
//   const pathParts = location.pathname.split("/");
//   const productId = parseInt(pathParts[pathParts.length - 1]);

//   const { data, isLoading: isProductLoading } = useQuery({
//     queryKey: ["product", productId],
//     queryFn: () => productService.getProduct(productId),
//   });
//   const productData = data?.payload;

//   useDynamicTitle(productData?.productName?.toString() || "Product Detail");

//   if (isProductLoading) {
//     return <Loading />;
//   }

//   window.scrollTo(0, 0);

//   return (
//     <div className="container mx-auto grid max-w-7xl px-5 py-6 shadow-lg transition-all duration-200 sm:px-10 md:grid-cols-4 xl:px-0">
//       <div className="flex space-x-4 md:col-span-3">
//         {productData ? (
//           <>
//             <div className="w-1/2">
//               <img
//                 src={
//                   productData?.productImages[0]?.imageUrl
//                     ? productData.productImages[0].imageUrl
//                     : "https://placehold.co/400"
//                 }
//                 alt={productData?.productName}
//                 className="h-auto w-full rounded-lg shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]"
//               />
//               <div className="mt-2 flex space-x-2">
//                 {productData?.productImages.map((imageObj) => (
//                   <img
//                     key={imageObj.productId}
//                     src={imageObj.imageUrl}
//                     alt={productData.productName}
//                     className="h-16 w-16 cursor-pointer rounded-lg shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]"
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="w-1/2">
//               <h2 className="text-2xl font-bold">{productData?.productName}</h2>
//               <p className="text-xl text-gray-600">
//                 Xuất xứ: Cà Mau - Việt Nam
//               </p>
//               <p className="text-xl text-gray-600">
//                 {productData?.description}
//               </p>

//               <ul className="list-disc pl-4 text-lg text-gray-700">
//                 <p>🔥 Hàng Tươi Sống Giao Nhanh 2H</p>
//                 <p>🎁 Tặng 10,000 Điểm Tích Lũy Khi Đăng Ký Thành Viên</p>
//                 <p>👍 Cam Kết 1 Đổi 1 Nếu Không Đạt Chất Lượng</p>
//                 <p>
//                   🚫 Không Dùng Hàng Ngộp - Không Dùng Hàng Đông Lạnh Chế Biến
//                   Món
//                 </p>
//                 <p>
//                   📞 Gọi Ngay Hotline{" "}
//                   <span className="font-bold text-red-500">0123 456 789</span>
//                 </p>
//               </ul>

//               <div className="mt-4 text-3xl font-bold text-blue-600">
//                 {productData?.sellingPrice.sellingPriceValue.toLocaleString()}đ/
//                 {productData?.productUnit}
//               </div>

//               <div className="mt-4 overflow-hidden rounded-lg border border-red-500">
//                 <div className="justify- flex items-center gap-4 bg-red-600 p-2 text-xl text-white">
//                   <IoGift className="" />
//                   <p className="font-semibold">Khuyến mãi</p>
//                 </div>
//                 <ul className="list-disc p-4 pb-2 text-sm text-gray-700">
//                   <p>🎁 Tặng Sốt chấm muối ớt hồng & xanh độc quyền</p>
//                   <p>🎁 Tặng Thêm 10,000 Điểm Tích Lũy</p>
//                   <p>🔥 Ưu Đãi Thành Viên Lên Đến 5%</p>
//                 </ul>
//               </div>

//               <ProductOder product={productData} />
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="w-full">
//               <ErrorPage errMessage="Product not found" />
//             </div>
//           </>
//         )}
//       </div>

//       <div className="ml-4 bg-slate-100 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]">
//         <RecommendProducts
//           itemId={productData?.itemId ?? 1}
//           productId={productId}
//         />
//       </div>
//     </div>
//   );
// };

// export default Product;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoGift } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import ErrorPage from "../common/ErrorPage";
import Loading from "../common/Loading";
import ProductOder from "../features/category/products/ProductOder";
import RecommendProducts from "../features/category/products/RecommendProducts";
import { productService } from "../services";
import { useDynamicTitle } from "../utils";

const Product: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const productId = parseInt(pathParts[pathParts.length - 1]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProduct(productId),
  });
  const productData = data?.payload;

  useDynamicTitle(productData?.productName?.toString() || "Product Detail");

  if (isProductLoading) {
    return <Loading />;
  }

  // window.scrollTo(0, 0);

  return (
    <div className="container mx-auto grid max-w-7xl px-5 py-6 shadow-lg transition-all duration-200 sm:px-10 md:grid-cols-4 xl:px-0">
      <div className="flex space-x-4 md:col-span-3">
        {productData ? (
          <>
            <div className="w-1/2">
              <img
                src={
                  selectedImage ||
                  productData?.productImages[0]?.imageUrl ||
                  "https://placehold.co/400"
                }
                alt={productData?.productName}
                className="h-auto w-full rounded-lg shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]"
              />
              <div className="mt-2 flex space-x-2">
                {productData?.productImages.map((imageObj) => (
                  <img
                    key={imageObj.productId}
                    src={imageObj.imageUrl}
                    alt={productData.productName}
                    onClick={() => setSelectedImage(imageObj.imageUrl)}
                    className="h-16 w-16 cursor-pointer rounded-lg shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)] transition-transform duration-150 hover:scale-105"
                  />
                ))}
              </div>
            </div>

            <div className="w-1/2">
              <h2 className="text-2xl font-bold">{productData?.productName}</h2>
              <p className="text-xl text-gray-600">
                Xuất xứ: Cà Mau - Việt Nam
              </p>
              <p className="text-xl text-gray-600">
                {productData?.description}
              </p>

              <ul className="list-disc pl-4 text-lg text-gray-700">
                <p>🔥 Hàng Tươi Sống Giao Nhanh 2H</p>
                <p>🎁 Tặng 10,000 Điểm Tích Lũy Khi Đăng Ký Thành Viên</p>
                <p>👍 Cam Kết 1 Đổi 1 Nếu Không Đạt Chất Lượng</p>
                <p>
                  🚫 Không Dùng Hàng Ngộp - Không Dùng Hàng Đông Lạnh Chế Biến
                  Món
                </p>
                <p>
                  📞 Gọi Ngay Hotline{" "}
                  <span className="font-bold text-red-500">0123 456 789</span>
                </p>
              </ul>

              <div className="mt-4 text-3xl font-bold text-blue-600">
                {productData?.sellingPrice.sellingPriceValue.toLocaleString()}đ/
                {productData?.productUnit}
              </div>

              <div className="mt-4 overflow-hidden rounded-lg border border-red-500">
                <div className="justify- flex items-center gap-4 bg-red-600 p-2 text-xl text-white">
                  <IoGift className="" />
                  <p className="font-semibold">Khuyến mãi</p>
                </div>
                <ul className="list-disc p-4 pb-2 text-sm text-gray-700">
                  <p>🎁 Tặng Sốt chấm muối ớt hồng & xanh độc quyền</p>
                  <p>🎁 Tặng Thêm 10,000 Điểm Tích Lũy</p>
                  <p>🔥 Ưu Đãi Thành Viên Lên Đến 5%</p>
                </ul>
              </div>

              <ProductOder product={productData} />
            </div>
          </>
        ) : (
          <div className="w-full">
            <ErrorPage errMessage="Product not found" />
          </div>
        )}
      </div>

      <div className="ml-4 bg-slate-100 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]">
        <RecommendProducts
          itemId={productData?.itemId ?? 1}
          productId={productId}
        />
      </div>
    </div>
  );
};

export default Product;
