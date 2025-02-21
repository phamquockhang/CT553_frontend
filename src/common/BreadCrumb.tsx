import { Breadcrumb, MenuProps } from "antd";

interface BreadCrumbProps {
  menuItems: MenuProps["items"] | undefined;
  children: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ menuItems, children }) => {
  return (
    <Breadcrumb
      className="container mx-auto mb-0 px-5 text-xl transition-all duration-200 sm:px-10 xl:px-20"
      style={{
        fontFamily: "Calibri",
        fontSize: "16px",
        fontWeight: 600,
        color: "#003F8F",
      }}
      items={[
        {
          title: "Trang chủ",
        },
        {
          title: "Các sản phẩm của chúng tôi",
          menu: { items: menuItems?.filter((item) => item !== null) },
        },
        {
          title: children,
        },
      ]}
    />
  );
};

export default BreadCrumb;
