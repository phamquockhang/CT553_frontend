import { useQuery } from "@tanstack/react-query";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IProduct } from "../../../interfaces";
import { itemService } from "../../../services";
import OverviewProduct from "../products/OverviewProduct";

interface ItemsProps {
  itemId: number;
}

const Items: React.FC<ItemsProps> = ({ itemId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => itemService.getItem(itemId),
  });

  const allProducts = data?.payload?.products || [];
  allProducts.sort((a: IProduct, b: IProduct) => {
    return a.productName.localeCompare(b.productName);
  });
  const products = allProducts.slice(0, 10);

  if (isLoading) return;
  return (
    <>
      {products && (
        <div className="my-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{data?.payload?.itemName}</h2>
            {products.length > 10 && (
              <Link
                //   to="/items/best-seller-products"
                to={`/items/${itemId}`}
                className="flex items-center gap-2 text-xl leading-none underline hover:text-[#003F8F]"
              >
                Xem thêm
                <FaArrowRightLong />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <OverviewProduct product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Items;
