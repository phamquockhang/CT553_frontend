import { useQuery } from "@tanstack/react-query";
import { FaArrowRightLong } from "react-icons/fa6";
import { SiCodemagic } from "react-icons/si";
import { Link } from "react-router-dom";
import { itemService } from "../../../services";
import OverviewProduct from "./OverviewProduct";
import Loading from "../../../common/Loading";

interface RecommendProductsProps {
  itemId: number;
}

const RecommendProducts: React.FC<RecommendProductsProps> = ({ itemId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => itemService.getItem(itemId),
  });

  const products = data?.payload?.products.slice(0, 3);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="bg-blue-900 px-1 font-semibold text-white">
        <p className="flex flex-row items-center justify-between">
          CÓ THỂ BẠN SẼ THÍCH <SiCodemagic />
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-1">
        {products?.map((product) => (
          <div className="p-4">
            <OverviewProduct product={product} />
          </div>
        ))}
      </div>

      <div className="bg-blue-900 px-1 font-semibold text-white hover:bg-white">
        <Link
          to={`/items/${itemId}`}
          className="flex items-center justify-between gap-2 hover:text-[#003F8F]"
        >
          XEM THÊM
          <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default RecommendProducts;
