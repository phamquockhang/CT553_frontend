import CategoryItems from "../features/category/items/CategoryItems";
import Banners from "../features/components/home/Banners";
import BestSellers from "../features/components/home/BestSellers";
import { useDynamicTitle } from "../utils";

const Home: React.FC = () => {
  useDynamicTitle("Trang chủ K-Seafood");

  return (
    <>
      <Banners />
      <BestSellers />
      <CategoryItems />
    </>
  );
};

export default Home;
