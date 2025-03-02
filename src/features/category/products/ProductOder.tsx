import { InputNumber, Space } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { ICustomer, IProduct } from "../../../interfaces";
import useCartData from "../../../redux";
import { addProduct } from "../../../redux/slices/cartSlice";
import { AddProductToCart } from "../../../services";

interface ProductOderProps {
  product?: IProduct;
}

const ProductOder: React.FC<ProductOderProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { cartDispatch } = useCartData();
  const customer: ICustomer | null = JSON.parse(
    localStorage.getItem("customer") || "null",
  );
  const cartId = customer?.cart.cartId;
  const { addProductToCart } = AddProductToCart();

  const handleAddToCart = () => {
    if (product?.productId) {
      if (cartId) {
        addProductToCart(
          {
            cartId: cartId,
            cartDetails: [
              {
                productId: product.productId,
                quantity: quantity,
              },
            ],
          },
          {
            onSuccess: (data) => {
              const newCartDetail = data.payload?.find(
                (cartDetail) => cartDetail.productId === product.productId,
              );
              cartDispatch(
                addProduct({
                  cartDetailId: newCartDetail?.cartDetailId,
                  productId: product.productId,
                  quantity: quantity,
                }),
              );
              toast.success("Đã thêm sản phẩm vào giỏ hàng");
            },
            onError: () => {
              toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng");
            },
          },
        );
      } else {
        cartDispatch(
          addProduct({
            productId: product.productId,
            quantity: quantity,
          }),
        );
        toast.success("Đã thêm sản phẩm vào giỏ hàng");
      }
    } else {
      console.error("Product ID is missing");
      toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Số lượng:</span>
        <div className="flex items-center overflow-hidden rounded border text-red-500">
          <Space className="text-red-500">
            <InputNumber
              defaultValue={1}
              min={1}
              size="large"
              max={100}
              contextMenu="Số lượng"
              addonAfter={product?.productUnit}
              step={product?.productUnit === "kg" ? 0.1 : 1}
              style={{
                width: 120,
              }}
              onChange={(value) => setQuantity(value as number)}
            />
          </Space>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          className="flex-1 rounded-md bg-blue-900 py-2 font-semibold text-white"
          onClick={handleAddToCart}
        >
          THÊM VÀO GIỎ
        </button>
        <button className="flex-1 rounded-md bg-red-600 py-2 font-semibold text-white">
          MUA NGAY
        </button>
      </div>
    </div>
  );
};

export default ProductOder;
