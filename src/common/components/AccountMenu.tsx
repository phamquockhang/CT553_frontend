import { Dropdown, Space } from "antd";
import React, { useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useLoggedInCustomer,
  useLoggedInStaff,
  useLogout,
} from "../../features/auth/hooks";

const AccountMenu: React.FC = () => {
  const { logout } = useLogout();
  const { user: customer } = useLoggedInCustomer();
  const { user: staff } = useLoggedInStaff();
  const loggedInUser = customer || staff;

  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem("avatarUrl"); // Clear avatar URL on logout
  }, [logout]);

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
