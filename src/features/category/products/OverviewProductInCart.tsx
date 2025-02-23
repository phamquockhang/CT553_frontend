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
        <div className="flex items-center">
          <button
            onClick={() => updateQuantity(product.productId, -1)}
            className="rounded-l border bg-gray-100 px-3 py-1"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.productId, 1)}
            className="rounded-r border bg-gray-100 px-3 py-1"
          >
            +
          </button>
        </div>
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
