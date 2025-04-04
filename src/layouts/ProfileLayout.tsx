import { Layout, Menu } from "antd";
import { MenuProps } from "antd/lib";
import { useEffect, useState } from "react";
import { FaBoxesStacked } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Loading from "../common/Loading";
import { useLoggedInCustomer } from "../features/auth/hooks";

const { Sider } = Layout;

const ProfileLayout: React.FC = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    location.pathname === "/"
      ? ["my-account"]
      : location.pathname.slice(1).split("/"),
  );
  //   const [collapsed, setCollapsed] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const { isLoading } = useLoggedInCustomer();

  //   const queryClient = useQueryClient();
  //   const navigate = useNavigate();

  useEffect(() => {
    const newKeys =
      location.pathname === "/"
        ? ["dashboard"]
        : location.pathname.slice(1).split("/");

    setSelectedKeys(newKeys);
  }, [location.pathname]);

  useEffect(() => {
    const menuItems = [
      {
        label: (
          <NavLink className="" to="/my-account">
            Quản lý tài khoản
          </NavLink>
        ),
        key: "my-account",
        icon: <MdManageAccounts />,
      },
      {
        label: (
          <NavLink className="" to="/selling-orders">
            Đơn hàng của tôi
          </NavLink>
        ),
        key: "selling-orders",
        icon: <FaBoxesStacked />,
      },
    ];

    setMenuItems(menuItems);
  }, []);

  //   const {
  //     token: { colorBgContainer },
  //   } = theme.useToken();

  //   useEffect(() => {
  //     const checkScreenWidth = () => {
  //       const mdBreakpoint = 768;
  //       if (window.innerWidth < mdBreakpoint) {
  //         setCollapsed(true);
  //       } else {
  //         setCollapsed(false);
  //       }
  //     };
  //     checkScreenWidth();
  //     window.addEventListener("resize", checkScreenWidth);

  //     return () => {
  //       window.removeEventListener("resize", checkScreenWidth);
  //     };
  //   }, []);

  if (isLoading) {
    return <Loading />;
  }

  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    // height: "100vh",
    // position: "fixed",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    scrollbarColor: "black",
    boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        style={siderStyle}
        width={230}
        trigger={null}
        collapsible
        // collapsed={collapsed}
        theme="light"
      >
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          onClick={({ key }) => {
            setSelectedKeys([key]);
          }}
        />
      </Sider>
      <Layout
        className="transition-all duration-200"
        style={{ marginInlineStart: 0 }}
      >
        {/* <Header
          style={headerStyle}
          className="max-w-screen-2xl shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between"></div>
        </Header> */}

        <Layout.Content className="max-h-screen max-w-screen-2xl overflow-auto bg-white">
          <div className="m-2">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default ProfileLayout;
