import { useQuery } from "@tanstack/react-query";
import { Button, Input, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../common/BreadCrumb";
import OverviewProductInCart from "../features/category/products/OverviewProductInCart";
import BestSellers from "../features/components/home/BestSellers";
import useCartData from "../redux";
import { removeProduct, updateQuantity } from "../redux/slices/cartSlice";
import { productService } from "../services";
import { useDynamicTitle } from "../utils";

const Cart: React.FC = () => {
  useDynamicTitle("Giỏ hàng");
  const { cartProducts, cartDispatch } = useCartData();
  const navigate = useNavigate();

  const productsId = cartProducts.products.map((product) => product.productId);
  const { data } = useQuery({
    queryKey: ["productsInCart", productsId],
    queryFn: async () => {
      if (!productsId || productsId.length === 0) return [];
      return await Promise.all(
        productsId.map((id) => productService.getProduct(id)),
      );
    },
    enabled: !!productsId?.length, // Chỉ chạy khi có productsId
  });
  const products = data ? data.flatMap((result) => result.payload || []) : [];

  console.log(products);

  function updateQuantityShoppingCart(id: number, quantity: number) {
    cartDispatch(
      updateQuantity({
        id,
        quantity,
      }),
    );
  }

  function removeProductShoppingCart(id: number) {
    cartDispatch(removeProduct(id));
  }

  const total =
    products.length > 0 &&
    cartProducts.products.reduce(
      (acc, product, index) =>
        acc + product.quantity * products[index].sellingPrice.sellingPriceValue,
      0,
    );

  return (
    <div className="mb-10">
      <BreadCrumb children="Giỏ hàng" displayMenu={false} />

      <div className="rounded-lg bg-[#003F8F] px-6 py-3 text-center font-semibold text-yellow-300">
        Chúng tôi biết bạn có nhiều lựa chọn, cảm ơn bạn đã chọn sản phẩm của
        K-Seafood
      </div>
      <h1 className="mt-2 text-center text-2xl font-bold text-gray-900">
        Giỏ hàng của bạn
      </h1>
      <p className="mt-2 text-center text-gray-600">
        Có {cartProducts.products.length} sản phẩm trong giỏ hàng
      </p>
      <div className="mx-auto my-4 h-1 w-20 bg-gray-800"></div>

      {cartProducts.products.length === 0 ? (
        <>
          <p className="text-center text-gray-500">
            Giỏ hàng của bạn đang trống
          </p>
          <div className="flex items-center justify-center">
            <Button
              className="mt-3 rounded border bg-[#003F8F] py-6 font-semibold text-white transition-all duration-500 hover:border-[#003F8F] hover:bg-white hover:text-[#003F8F]"
              onClick={() => {
                navigate("/products");
              }}
            >
              <span className="mr-2">&#x1F6D2;</span> TIẾP TỤC MUA HÀNG
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
            {products?.length > 0 ? (
              <>
                {products?.map((product, index) => (
                  <OverviewProductInCart
                    key={product.productId}
                    product={product}
                    quantity={cartProducts.products[index].quantity}
                    updateQuantity={updateQuantityShoppingCart}
                    removeProduct={removeProductShoppingCart}
                  />
                ))}
              </>
            ) : (
              <>
                <Skeleton active />
              </>
            )}

            <Input.TextArea
              className="mt-4 rounded-md p-3"
              placeholder="Ghi chú"
            />

            <div className="mt-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Tổng tiền:{" "}
                <span className="text-xl text-black">
                  {total?.toLocaleString()}đ
                </span>
              </h3>
              <div className="flex gap-3">
                <Button
                  type="default"
                  className="rounded border py-6 font-semibold text-[#003F8F] transition-all duration-200 hover:border-[#003F8F]"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  <span className="mr-2">&#x1F6D2;</span> TIẾP TỤC MUA HÀNG
                </Button>
                <Button
                  type="primary"
                  className="rounded border bg-[#003F8F] py-6 font-semibold text-white transition-all duration-500"
                  // onClick={() => {
                  //   navigate("/products");
                  // }}
                >
                  TIẾN HÀNH ĐẶT HÀNG
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <BestSellers />
    </div>
  );
};

export default Cart;
