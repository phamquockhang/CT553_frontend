import { useQuery } from "@tanstack/react-query";
import { productService } from "../services";
import Loading from "../common/Loading";
import { useDynamicTitle } from "../utils";
import ProductOder from "../features/category/products/ProductOder";
import { IoGift } from "react-icons/io5";
import RecommendProducts from "../features/category/products/RecommendProducts";

const Product: React.FC = () => {
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/");
  const productId = parseInt(pathParts[pathParts.length - 1]);

  const { data, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProduct(productId),
  });

  const productData = data?.payload;

  useDynamicTitle(productData?.productName?.toString() || "Product Detail");

  if (isProductLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto grid max-w-7xl px-5 py-6 shadow-lg transition-all duration-200 sm:px-10 md:grid-cols-4 xl:px-20">
      <div className="flex space-x-4 md:col-span-3">
        <div className="w-1/2">
          <img
            src={productData?.productImages[0].imageUrl}
            alt="Tôm Hùm Xanh"
            className="h-auto w-full rounded-lg shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]"
          />
          <div className="mt-2 flex space-x-2">
            {productData?.productImages.map((imageObj) => (
              <img
                key={imageObj.productId}
                src={imageObj.imageUrl}
                alt={productData.productName}
                className="h-16 w-16 cursor-pointer rounded-lg shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]"
              />
            ))}
          </div>
        </div>

        <div className="w-1/2">
          <h2 className="text-2xl font-bold">{productData?.productName}</h2>
          <p className="text-xl text-gray-600">Xuất xứ: Cà Mau - Việt Nam</p>
          <p className="text-xl text-gray-600">{productData?.description}</p>

          <ul className="list-disc pl-4 text-lg text-gray-700">
            <p>🔥 Hàng Tươi Sống Giao Nhanh 2H</p>
            <p>🎁 Tặng 100,000đ Khi Đăng Ký Thành Viên</p>
            <p>👍 Cam Kết 1 Đổi 1 Nếu Không Đạt Chất Lượng</p>
            <p>
              🚫 Không Dùng Hàng Ngộp - Không Dùng Hàng Đông Lạnh Chế Biến Món
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
              <p>🎁 Tặng 100,000đ khi đăng ký khách hàng</p>
              <p>🔥 Ưu Đãi Thành Viên Lên Đến 10%</p>
            </ul>
          </div>

          <ProductOder product={productData} />
        </div>
      </div>

      <div className="bg-red-50">
        <RecommendProducts itemId={productData?.itemId ?? 1} />
      </div>
    </div>
  );
};

export default Product;
