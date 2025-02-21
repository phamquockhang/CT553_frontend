import { useQuery } from "@tanstack/react-query";
import BreadCrumb from "../common/BreadCrumb";
import Loading from "../common/Loading";
import OverviewProduct from "../features/category/products/OverviewProduct";
import { IProduct } from "../interfaces";
import { itemService, productService } from "../services";
import { useDynamicTitle } from "../utils";

const BestSellerallProducts: React.FC = () => {
  useDynamicTitle("Các sản phẩm bán chạy");

  const { data: bestSellerProducts, isLoading: isLoadingBestSellerProducts } =
    useQuery({
      queryKey: ["allProducts"],
      queryFn: productService.getAllProducts,
    });

  const { data: allItems } = useQuery({
    queryKey: ["allItems"],
    queryFn: itemService.getAllItems,
  });

  const allProducts = bestSellerProducts?.payload || [];
  allProducts.sort((a: IProduct, b: IProduct) => {
    return a.productName.localeCompare(b.productName);
  });

  if (isLoadingBestSellerProducts) return <Loading />;

  window.scrollTo(0, 0);

  const menuItems = allItems?.payload?.map((item) => ({
    key: item.itemId,
    label: <a href={`/items/${item.itemId}`}>{item.itemName}</a>,
  }));

  return (
    <div>
      <BreadCrumb menuItems={menuItems} children="Các sản phẩm bán chạy" />

      <div className="container mx-auto px-5 transition-all duration-200 sm:px-10 xl:px-20">
        {allProducts && (
          <div className="mt-10">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Các sản phẩm bán chạy</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {allProducts.map((product) => (
                <OverviewProduct product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellerallProducts;
