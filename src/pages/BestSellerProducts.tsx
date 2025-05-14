import { useQuery } from "@tanstack/react-query";
import BreadCrumb from "../common/BreadCrumb";
import Loading from "../common/Loading";
import OverviewProduct from "../features/category/products/OverviewProduct";
import { IProduct } from "../interfaces";
import { productService } from "../services";
import { useDynamicTitle } from "../utils";

const BestSellerProducts: React.FC = () => {
  useDynamicTitle("Các sản phẩm bán chạy");

  const { data: bestSellerProducts, isLoading: isLoadingBestSellerProducts } =
    useQuery({
      queryKey: ["allProducts"],
      queryFn: productService.getAllProducts,
    });

  const allProducts = bestSellerProducts?.payload || [];
  allProducts.sort((a: IProduct, b: IProduct) => {
    return a.productName.localeCompare(b.productName);
  });

  if (isLoadingBestSellerProducts) return <Loading />;

  window.scrollTo(0, 0);

  return (
    <>
      <BreadCrumb children="Các sản phẩm bán chạy" />

      <>
        {allProducts && (
          <div className="my-10">
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
      </>
    </>
  );
};

export default BestSellerProducts;
