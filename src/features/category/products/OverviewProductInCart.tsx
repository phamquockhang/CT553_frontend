import { InputNumber } from "antd";
import React from "react";
import { IProduct } from "../../../interfaces";

interface ProductItemProps {
  product: IProduct;
  quantity: number;
  updateQuantity: (productId: number, amount: number) => void;
  removeProduct: (productId: number) => void;
}

const OverviewProductInCart = React.memo(
  ({ product, quantity, updateQuantity, removeProduct }: ProductItemProps) => {
    const handleDirectChange = (value: number | null) => {
      const newQuantity = value ?? 1;
      updateQuantity(product.productId, newQuantity);
    };

    const handleDeltaChange = (delta: number) => {
      let temp = quantity + delta;
      temp = Math.round(temp * 10) / 10;
      const newQuantity = temp < 1 ? 1 : temp > 100 ? 100 : temp;

      updateQuantity(product.productId, newQuantity);
    };

    return (
      <div className="flex items-center border-b py-4">
        <img
          src={product.productImages[0].imageUrl}
          alt={product.productName}
          className="h-20 w-20 rounded"
        />
        <div className="ml-4 flex-1">
          <h2 className="font-semibold">{product.productName}</h2>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-lg font-bold text-[#003F8F]">
            {product.sellingPrice.sellingPriceValue.toLocaleString()}đ/
            {product.productUnit}
          </p>
        </div>

        <InputNumber
          size="large"
          min={1}
          max={100}
          className="centered-input"
          controls={false}
          addonBefore={
            <button
              onClick={() => {
                if (product.productUnit === "kg") {
                  handleDeltaChange(-0.1);
                } else {
                  handleDeltaChange(-1);
                }
              }}
              className="px-4 py-3"
            >
              -
            </button>
          }
          addonAfter={
            <button
              onClick={() => {
                if (product.productUnit === "kg") {
                  handleDeltaChange(0.1);
                } else {
                  handleDeltaChange(1);
                }
              }}
              className="px-4 py-3"
            >
              +
            </button>
          }
          style={{ width: 150 }}
          value={quantity}
          onChange={(value) => {
            if (typeof value === "number") {
              handleDirectChange(value);
            } else {
              handleDirectChange(1);
            }
          }}
        />

        <p className="ml-6 min-w-32 text-center font-semibold text-[#003F8F]">
          {(product.sellingPrice.sellingPriceValue * quantity).toLocaleString()}
          đ
        </p>
        <button
          onClick={() => removeProduct(product.productId)}
          className="ml-4 text-gray-500 hover:text-red-500"
        >
          ✖
        </button>
      </div>
    );
  },
);

export default OverviewProductInCart;
