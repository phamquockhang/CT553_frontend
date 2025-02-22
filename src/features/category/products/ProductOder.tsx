import { InputNumber, Space } from "antd";
import { IProduct } from "../../../interfaces";

interface ProductOderProps {
  product?: IProduct;
}

const ProductOder: React.FC<ProductOderProps> = ({ product }) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Số lượng:</span>
        <div className="flex items-center overflow-hidden rounded border text-red-500">
          <Space className="text-red-500">
            <InputNumber
              defaultValue={1}
              min={product?.productUnit === "kg" ? 0.1 : 1}
              max={100}
              contextMenu="Số lượng"
              //   formatter={(value) => `${value}%`}
              //   parser={(value) => value?.replace("%", "") as unknown as number}
              addonAfter={product?.productUnit}
              style={{
                width: 120,
              }}
              //   onChange={onChange}
            />
          </Space>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="flex-1 rounded-md bg-blue-900 py-2 font-semibold text-white">
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
