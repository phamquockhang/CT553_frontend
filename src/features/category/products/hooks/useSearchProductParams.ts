import { useSearchParams } from "react-router-dom";
import {
  PaginationParams,
  ProductFilterCriteria,
  SortParams,
} from "../../../../interfaces";

const useSearchProductParams = (itemId?: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginationParams: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const query = searchParams.get("query") || "";

  const filter: ProductFilterCriteria = {
    isActivated: "true",
    itemId: itemId?.toString() || "",
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  return {
    searchParams,
    setSearchParams,
    paginationParams,
    query,
    filter,
    sort,
  };
};

export default useSearchProductParams;
