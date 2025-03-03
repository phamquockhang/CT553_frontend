import { useQuery } from "@tanstack/react-query";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { itemService, productService } from "../../../services";
import { useDynamicTitle } from "../../../utils";
import OverviewProduct from "../products/OverviewProduct";
import useSearchProductParams from "../products/hooks/useSearchProductParams";

interface ItemProps {
  itemId: number;
}

const Item: React.FC<ItemProps> = ({ itemId }) => {
  const { paginationParams, query, filter, sort } =
    useSearchProductParams(itemId);

  const { data: itemData } = useQuery({
    queryKey: ["allItems"],
    queryFn: () => itemService.getAllItems(),
    select: (data) => data?.payload?.find((item) => item.itemId === itemId),
  });
  useDynamicTitle(itemData?.itemName || "Item Detail");

  const { data, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", paginationParams, query, filter, sort].filter(
      (key) => {
        if (typeof key === "string") {
          return key !== "";
        } else if (key instanceof Object) {
          return Object.values(key).some(
            (value) => value !== undefined && value !== "",
          );
        }
      },
    ),
    queryFn: () =>
      productService.getProducts(paginationParams, query, filter, sort),
  });

  const productsData = data?.payload?.data;
  const productMeta = data?.payload?.meta;

  if (isLoadingProducts) return;

  return (
    <>
      {productsData && (
        <div className="my-5 border-t border-t-black pt-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {itemData?.itemName} (
              {productMeta && productMeta.total < 10
                ? productMeta.total
                : "10+"}
              )
            </h2>
            {productMeta && productMeta.total > 10 && (
              <Link
                to={`/items/${itemId}`}
                className="flex items-center gap-2 text-xl leading-none underline hover:text-[#003F8F]"
              >
                Xem thêm
                <FaArrowRightLong />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {productsData.map((product) => (
              <OverviewProduct product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
