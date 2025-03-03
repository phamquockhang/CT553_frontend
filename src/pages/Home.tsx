import Items from "../features/components/home/Items";
import Banners from "../features/components/home/Banners";
import BestSellers from "../features/components/home/BestSellers";
import { useDynamicTitle } from "../utils";

const Home: React.FC = () => {
  useDynamicTitle("Trang chủ K-Seafood");

  return (
    <>
      <Banners />
      <BestSellers />
      <Items />
    </>
  );
};

export default Home;
