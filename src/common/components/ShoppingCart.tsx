import { Badge } from "antd";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import useCartData from "../../redux";

const ShoppingCart: React.FC = () => {
  const { cartState } = useCartData();

  return (
    <Link to="/cart" className="ml-2 cursor-pointer">
      <div className="relative flex items-center" id="cart-icon">
        <Badge count={cartState.cartDetails.length}>
          <PiShoppingCartFill className="text-3xl text-[#003F8F]" />
        </Badge>
      </div>
    </Link>
  );
};

export default ShoppingCart;
