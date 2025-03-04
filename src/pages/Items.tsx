import BreadCrumb from "../common/BreadCrumb";
import CategoryItems from "../features/category/items/CategoryItems";
import { useDynamicTitle } from "../utils";

const Items: React.FC = () => {
  useDynamicTitle("Trang chủ K-Seafood");

  return (
    <>
      <BreadCrumb />

      <CategoryItems />
    </>
  );
};

export default Items;
