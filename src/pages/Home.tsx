import Items from "../features/category/items/Items";
import Banners from "../features/components/home/Banners";
import BestSellers from "../features/components/home/BestSellers";
import { useDynamicTitle } from "../utils";

const Home: React.FC = () => {
  useDynamicTitle("Trang chủ K-Seafood");

  return (
    <>
      <Banners />
      <BestSellers />
      <Items itemId={1} />
      <Items itemId={2} />
      <Items itemId={3} />
      <Items itemId={4} />
      <Items itemId={5} />
    </>
  );
};

export default Home;
