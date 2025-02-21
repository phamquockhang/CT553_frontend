import { useQuery } from "@tanstack/react-query";
import {
  Anchor,
  Menu as AntdMenu,
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { PiCodesandboxLogoBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useStickyScroll from "../features/components/hooks/useStickyScroll";
import { ICustomer, IStaff, PRIMARY_COLOR } from "../interfaces";
import { customerService, itemService, staffService } from "../services";
import AccountMenu from "./components/AccountMenu";
import BoxSearch from "./components/BoxSearch";
import Menu from "./components/Menu";
import ShoppingCart from "./components/ShoppingCart";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [user, setUser] = useState<ICustomer | IStaff | null>(null);
  const accessToken = localStorage.getItem("access_token");
  const isSticky = useStickyScroll();

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/");

  // console.log(pathParts[pathParts.length - 1]);

  const { data } = useQuery({
    queryKey: ["allItems"],
    queryFn: itemService.getAllItems,
  });
  // console.log(data);

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const customerResponse = await customerService.getLoggedInCustomer();
          const staffResponse = await staffService.getLoggedInStaff();

          const userData = customerResponse.success
            ? customerResponse.payload
            : staffResponse.success
              ? staffResponse.payload
              : null;

          if (userData) {
            setUser(userData);
            setShowAccountMenu(true);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        setShowAccountMenu(false);
      }
    };

    fetchUserData();
  }, [accessToken]);

  const handleLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleSignupClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const menuItems = [
    {
      key: "items",
      title: "Các mặt hàng của chúng tôi",
      href: "/items",
      submenu: data?.payload?.map((item) => ({
        title: item.itemName,
        href: `/items/${item.itemId}`,
        key: `item-${item.itemId}`,
      })),
    },
    {
      key: "policy",
      title: "Chính sách",
      href: "/policy",
      submenu: [
        {
          title: "Tuyển dụng",
          href: "/policy/recruitment",
          key: "policy-recruitment",
        },
        {
          title: "Chính sách bảo mật",
          href: "/policy/privacy",
          key: "policy-privacy",
        },
      ],
    },
    {
      key: "about-us",
      title: "Giới thiệu",
      href: "/about-us",
    },
    {
      key: "support",
      title: "Hỗ trợ",
      href: "/support",
    },
  ];

  return (
    <header
      className={`${isSticky ? "-translate-y-0" : `-translate-y-[100%]`} sticky top-0 z-50 rounded-b-3xl bg-white shadow-md transition-all duration-500`}
    >
      <img
        src="src/assets/image/banners/banner-header.jpg"
        alt="Banner Header"
      />
      <div className="mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo_512.png"
            alt="DaViKa Airways"
            className="w- h-20 transition-all duration-1000 ease-in-out hover:scale-110"
          />
        </Link>

        {/* Menu Navigation */}
        <div className="hidden items-center lg:flex">
          <ConfigProvider
            theme={{
              token: {
                fontSize: 16,
              },
            }}
          >
            <Anchor
              direction="horizontal"
              items={menuItems.map((item) => ({
                key: item.key,
                title: item.submenu ? (
                  <Dropdown
                    overlay={
                      <AntdMenu className="mt-2 border-none shadow-lg">
                        {item.submenu.map((subItem) => (
                          <AntdMenu.Item key={subItem.key}>
                            <Link to={subItem.href} className="block px-4 py-2">
                              {subItem.title}
                            </Link>
                          </AntdMenu.Item>
                        ))}
                      </AntdMenu>
                    }
                    trigger={["hover"]}
                    overlayClassName="custom-dropdown"
                  >
                    <Link
                      to={item.href}
                      className="px-0 py-2 font-bold transition-all duration-500 hover:text-[#003F8F] lg:px-3 xl:px-8"
                    >
                      {item.title.toUpperCase()}
                    </Link>
                  </Dropdown>
                ) : (
                  <Link
                    to={item.href}
                    className="px-0 py-2 font-bold transition-all duration-500 hover:text-[#003F8F] lg:px-3 xl:px-8"
                  >
                    {item.title.toUpperCase()}
                  </Link>
                ),
                href: item.href,
              }))}
            />
          </ConfigProvider>
        </div>

        {/* Right Side Menus */}
        <div className="flex items-center">
          {/* <Search /> */}
          <BoxSearch />
          <Divider type="vertical" className="h-6 bg-black" />
          {showAccountMenu ? (
            <>
              <AccountMenu />
              <ShoppingCart />
            </>
          ) : (
            <>
              <Button
                onClick={handleLoginClick}
                type="primary"
                className="min-w-28 py-5 font-semibold max-[565px]:hidden"
              >
                Đăng nhập
              </Button>

              <Button
                onClick={handleSignupClick}
                type="default"
                className="ml-2 min-w-24 py-5 max-[565px]:hidden"
              >
                <p
                  style={{
                    color: PRIMARY_COLOR,
                  }}
                  className="font-semibold"
                >
                  Đăng ký
                </p>
              </Button>
            </>
          )}

          <div className="lg:hidden">
            <Menu
              menuItems={menuItems}
              showMenuItemsSecondary={!showAccountMenu}
            />
          </div>
        </div>
      </div>

      {pathParts[pathParts.length - 1] !== "login" &&
        pathParts[pathParts.length - 1] !== "register" && (
          <div className="hidden justify-center border-t border-gray-200 py-4 transition-all duration-500 md:flex md:gap-1 lg:gap-16 xl:gap-32">
            <div className="flex items-center justify-center gap-2">
              <div className="rounded-full bg-[#003F8F] p-2">
                <AiFillLike className="text-2xl text-white" />
              </div>

              <div>
                <p className="text-xl leading-none">Cam kết chất lượng</p>
                <p className="text-xl leading-none">An toàn xuất xứ</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="rounded-full bg-[#003F8F] p-2">
                <MdOutlinePublishedWithChanges className="text-2xl text-white" />
              </div>

              <div>
                <p className="text-xl leading-none">1 đổi 1 trong 2h</p>
                <p className="text-xl leading-none">Nhanh chóng, tận nhà</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="rounded-full bg-[#003F8F] p-2">
                <PiCodesandboxLogoBold className="text-2xl text-white" />
              </div>

              <div>
                <p className="text-xl leading-none">Chuẩn đóng gói</p>
                <p className="text-xl leading-none">Sạch sẽ, tiện lợi</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="rounded-full bg-[#003F8F] p-2">
                <FaShippingFast className="text-2xl text-white" />
              </div>

              <div>
                <p className="text-xl leading-none">Giao hàng nhanh</p>
                <p className="text-xl leading-none">Free Ship</p>
              </div>
            </div>
          </div>
        )}
    </header>
  );
};

export default Header;
