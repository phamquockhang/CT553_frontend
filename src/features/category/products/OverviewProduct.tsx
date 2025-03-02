import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FloatingImage from "../../../common/components/FloatingImage";
import { ICustomer, IProduct } from "../../../interfaces";
import useCartData from "../../../redux";
import { addProduct } from "../../../redux/slices/cartSlice";
import { AddProductToCart } from "../../../services";

interface OverviewProductProps {
  product: IProduct;
}

const OverviewProduct: React.FC<OverviewProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const { cartDispatch } = useCartData();
  const [floatingData, setFloatingData] = useState<{
    imageUrl: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const customer: ICustomer | null = JSON.parse(
    localStorage.getItem("customer") || "null",
  );
  const cartId = customer?.cart && customer?.cart.cartId;
  const { addProductToCart: addProductToCartService } = AddProductToCart();

  const handleAnimationEnd = () => {
    setFloatingData(null);
  };

  function addProductToCart(
    event: React.MouseEvent<HTMLButtonElement>,
    productId: number,
  ) {
    event.stopPropagation();
    if (cartId) {
      console.log("cartId", cartId);
      addProductToCartService(
        {
          cartId: cartId,
          cartDetails: [
            {
              productId: productId,
              quantity: 1,
            },
          ],
        },
        {
          onSuccess: (data) => {
            const newCartDetail = data.payload?.find(
              (cartDetail) => cartDetail.productId === productId,
            );
            cartDispatch(
              addProduct({
                cartDetailId: newCartDetail?.cartDetailId,
                productId: productId,
                quantity: 1,
              }),
            );
            toast.success("Đã thêm sản phẩm vào giỏ hàng");
          },
        },
      );
    } else {
      console.log("cartId", cartId);
      cartDispatch(
        addProduct({
          productId: productId,
          quantity: 1,
        }),
      );
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
    }
    // lấy ảnh sp
    const productImageElement = document.getElementById(
      `product-image-${product.productId}`,
    );
    if (productImageElement) {
      const rect = productImageElement.getBoundingClientRect();
      const startX = rect.left + rect.width / 4;
      const startY = rect.top + rect.height / 4;

      // vị trí đích của icon giỏ hàng tính toán từ DOM
      const cartIconElement = document.getElementById("cart-icon");
      if (cartIconElement) {
        const cartRect = cartIconElement.getBoundingClientRect();
        // console.log(cartRect);
        const endX = cartRect.left - 25;
        const endY = cartRect.top - 25 < 0 ? -50 : cartRect.top - 25;
        // console.log(endX, endY);
        // const endX = cartRect.left + cartRect.width / 4;
        // const endY = cartRect.top + cartRect.height / 4;

        // Sử dụng endX, endY làm tọa độ đích cho hiệu ứng bay
        setFloatingData({
          imageUrl: product.productImages[0].imageUrl,
          startX,
          startY,
          endX,
          endY,
        });
      }
    }
  }

  return (
    <>
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
          id={`product-image-${product.productId}`}
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
          <button
            className="mt-3 w-full rounded border bg-[#003F8F] py-1 font-semibold text-white transition-all duration-500 hover:border-[#003F8F] hover:bg-white hover:text-[#003F8F]"
            onClick={(event) => addProductToCart(event, product.productId)}
          >
            CHỌN MUA 🛒
          </button>
        </div>
      </div>

      {floatingData && (
        <FloatingImage
          imageUrl={floatingData.imageUrl}
          startX={floatingData.startX}
          startY={floatingData.startY}
          endX={floatingData.endX}
          endY={floatingData.endY}
          onAnimationEnd={handleAnimationEnd}
        />
      )}
    </>
  );
};

export default OverviewProduct;
