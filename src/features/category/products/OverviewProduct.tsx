import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../interfaces";

interface OverviewProductProps {
  product: IProduct;
}

const OverviewProduct: React.FC<OverviewProductProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg border bg-white shadow-md transition-all duration-500 hover:shadow-[#7a7a7a]"
      onClick={() => {
        navigate(`/products/${product.productId}`);
      }}
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
        <h3 className="line-clamp-1 text-lg font-semibold">
          {product.productName}
        </h3>
        <p className="line-clamp-1 text-xl font-bold text-[#003F8F]">
          {product.sellingPrice.sellingPriceValue.toLocaleString()}
          đ/
          {product.productUnit}
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
  );
};

export default OverviewProduct;
