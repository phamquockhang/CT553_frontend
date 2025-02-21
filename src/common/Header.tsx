import {
  Anchor,
  Menu as AntdMenu,
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICustomer, IStaff, PRIMARY_COLOR } from "../interfaces";
import { customerService, staffService } from "../services";
import AccountMenu from "./components/AccountMenu";
import Menu from "./components/Menu";
import Search from "./components/Search";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [user, setUser] = useState<ICustomer | IStaff | null>(null);
  const accessToken = localStorage.getItem("access_token");

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
      key: "products",
      title: "Các sản phẩm của chúng tôi",
      href: "/products",
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
    <header className="sticky top-0 z-50 rounded-b-3xl bg-white shadow-md">
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
          <Search />
          <Divider type="vertical" className="h-6 bg-black" />
          {showAccountMenu ? (
            <AccountMenu />
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
    </header>
  );
};

export default Header;
