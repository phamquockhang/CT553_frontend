import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Loading from "../common/Loading";
import OverviewProduct from "../features/category/products/OverviewProduct";
import { ItemFilterCriteria, SortParams } from "../interfaces";
import { itemService } from "../services";
import { useDynamicTitle } from "../utils";

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();

  const pagination = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const query = searchParams.get("query") || "";

  useDynamicTitle(`Tìm kiếm cho: ${query}`);

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const filter: ItemFilterCriteria = {
    isActivated: "true",
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["items", pagination, query, sort, filter].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => itemService.getItems(pagination, query, filter, sort),
  });

  const itemsId = data?.payload?.data?.map((item) => item.itemId);

  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ["itemsDetails", itemsId],
    queryFn: async () => {
      if (!itemsId || itemsId.length === 0) return [];
      return await Promise.all(itemsId.map((id) => itemService.getItem(id)));
    },
    enabled: !!itemsId?.length, // Chỉ chạy khi có itemsId
  });
  const products = searchResults?.flatMap(
    (result) => result.payload?.products || [],
  );

  if (isLoading || isFetching || isSearching) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h2 className="text-center text-3xl font-semibold">Tìm kiếm</h2>
      <p className="text-center text-gray-600">
        {products
          ? `Tìm thấy ${products.length} sản phẩm cho từ khóa "${query}"`
          : `Không tìm thấy sản phẩm nào cho từ khóa "${query}"`}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products?.map((product) => (
          <div className="p-4">
            <OverviewProduct product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
