import Banners from "../features/components/home/Banners";
import BestSellers from "../features/components/home/BestSellers";
import { useDynamicTitle } from "../utils";

const Home: React.FC = () => {
  useDynamicTitle("Trang chủ K-Seafood");
  return (
    <div className="container mx-auto mt-1 px-5 transition-all duration-200 sm:px-10 xl:px-20">
      <Banners />
      <BestSellers />
    </div>
  );
};

export default Home;
