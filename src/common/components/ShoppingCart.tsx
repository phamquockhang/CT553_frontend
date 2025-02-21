import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const ShoppingCart: React.FC = () => {
  return (
    <Link to="/cart" className="ml-3 cursor-pointer">
      <div className="relative">
        <PiShoppingCartFill className="text-3xl text-[#003F8F]" />
        <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          0
        </div>
      </div>
    </Link>
  );
};

export default ShoppingCart;
