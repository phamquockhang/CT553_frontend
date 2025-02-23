import { useQuery } from "@tanstack/react-query";
import BreadCrumb from "../common/BreadCrumb";
import Loading from "../common/Loading";
import OverviewProduct from "../features/category/products/OverviewProduct";
import { IProduct } from "../interfaces";
import { itemService } from "../services";
import { useDynamicTitle } from "../utils";
import { useLocation } from "react-router-dom";

const Item: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const itemId = parseInt(pathParts[pathParts.length - 1]);

  const { data, isLoading: isItemLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => itemService.getItem(itemId),
  });

  const productsData = data?.payload?.products;

  useDynamicTitle(data?.payload?.itemName || "Item Detail");

  if (isItemLoading) return <Loading />;

  productsData?.sort((a: IProduct, b: IProduct) => {
    return a.productName.localeCompare(b.productName);
  });

  window.scrollTo(0, 0);

  return (
    <>
      <BreadCrumb children={data?.payload?.itemName} />

      <>
        {productsData && (
          <div className="my-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{data?.payload?.itemName}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {productsData.map((product) => (
                <OverviewProduct product={product} />
              ))}
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Item;
