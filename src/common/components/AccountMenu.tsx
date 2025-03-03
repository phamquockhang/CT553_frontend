import { Dropdown, Space } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useLoggedInCustomer,
  useLoggedInStaff,
  useLogout,
} from "../../features/auth/hooks";
import { ICartDetail } from "../../interfaces";
import useCartData from "../../redux";
import { addProduct, clearCart } from "../../redux/slices/cartSlice";
import { AddProductToCart, CreateCart } from "../../services";

const AccountMenu: React.FC = () => {
  const { logout } = useLogout();
  const { user: customer } = useLoggedInCustomer();
  const { user: staff } = useLoggedInStaff();
  const loggedInUser = customer || staff;

  const { cartState, cartDispatch } = useCartData();
  const { createCart } = CreateCart();
  const { addProductToCart } = AddProductToCart();

  const addAllProductsFromReduxToCartInDatabase = useCallback(
    (cartId: number, cartDetails: ICartDetail[]) => {
      addProductToCart({
        cartId,
        cartDetails,
      });
    },
    [addProductToCart],
  );

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const updatedCartRef = useRef(false);
  useEffect(() => {
    // console.log("customer", customer);
    // console.log("-------------------------useEffect-------------");
    if (isLoggingOut || customer === undefined) return;

    if (customer !== undefined) {
      localStorage.setItem("customer", JSON.stringify(customer));
    }

    // Load cart from database to redux store
    if (
      customer &&
      customer.cart &&
      customer.cart.cartDetails.length > 0 &&
      cartState.cartDetails.length === 0
    ) {
      // console.log("1-----------Loading cart from database to redux store");
      cartDispatch(clearCart());
      customer.cart.cartDetails.forEach((cartDetail) => {
        cartDispatch(
          addProduct({
            cartDetailId: cartDetail.cartDetailId,
            productId: cartDetail.productId,
            quantity: cartDetail.quantity,
          }),
        );
      });
    }
    // Add products from redux to cart in database
    else if (
      customer &&
      customer.cart &&
      customer.cart.cartDetails.length === 0 &&
      cartState.cartDetails.length > 0
    ) {
      // console.log("2-----------Adding products from redux to cart in database");
      if (customer && customer.cart && customer.cart.cartId) {
        addAllProductsFromReduxToCartInDatabase(
          customer.cart.cartId,
          cartState.cartDetails,
        );
      }
    } else if (
      customer &&
      customer.cart &&
      customer.cart.cartDetails.length > 0 &&
      cartState.cartDetails.length > 0
    ) {
      if (!updatedCartRef.current) {
        // console.log("3-----------Clear cart in redux and add from db");
        cartDispatch(clearCart());
        customer.cart.cartDetails.forEach((cartDetail) => {
          cartDispatch(
            addProduct({
              cartDetailId: cartDetail.cartDetailId,
              productId: cartDetail.productId,
              quantity: cartDetail.quantity,
            }),
          );
        });
        updatedCartRef.current = true; // Đánh dấu đã cập nhật
      }
    }
  }, [
    loggedInUser,
    customer,
    cartDispatch,
    createCart,
    cartState,
    addAllProductsFromReduxToCartInDatabase,
    isLoggingOut,
  ]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    cartDispatch(clearCart());
    updatedCartRef.current = false;

    setTimeout(() => {
      setIsLoggingOut(false);
    }, 1000);
  };

  type MenuItemType = {
    label: React.ReactNode;
    key: string;
    type?: undefined;
  };

  const items: MenuItemType[] = [
    {
      label: (
        <p className="block cursor-pointer border-b-2 border-[#003F8F] px-4 py-2 text-center font-bold text-[#003F8F]">
          {loggedInUser?.lastName} {loggedInUser?.firstName}
        </p>
      ),
      key: "me",
    },
    {
      label: (
        <Link
          to="/manage-account/my-account"
          className="block cursor-pointer px-4 py-2 font-bold text-gray-700"
        >
          Quản lý tài khoản
        </Link>
      ),
      key: "manage-account",
    },
    {
      label: (
        <span
          onClick={handleLogout}
          className="block cursor-pointer px-4 py-2 font-bold text-gray-700"
        >
          Đăng xuất
        </span>
      ),
      key: "logout",
    },
  ];

  return (
    <div className="flex cursor-pointer items-center">
      {loggedInUser && (
        <>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            overlayClassName="rounded-lg shadow-lg"
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              {/* <span className="text-sm font-semibold text-gray-700">
                {loggedInUser.firstName}
              </span> */}
              <Space>
                <FaUserCircle className="text-3xl text-[#003F8F]" />
              </Space>
            </a>
          </Dropdown>
        </>
      )}
    </div>
  );
};

export default React.memo(AccountMenu);
