import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import useCartData from "../../redux";

const ShoppingCart: React.FC = () => {
  const { cartProducts } = useCartData();

  return (
    <Link to="/cart" className="ml-2 cursor-pointer">
      <div className="relative" id="cart-icon">
        <PiShoppingCartFill className="text-3xl text-[#003F8F]" />
        <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {cartProducts.products.length}
        </div>
      </div>
    </Link>
  );
};

export default ShoppingCart;
