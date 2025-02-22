import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { itemService } from "../services";

interface BreadCrumbProps {
  children?: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ children }) => {
  const { data: allItems } = useQuery({
    queryKey: ["allItems"],
    queryFn: itemService.getAllItems,
  });

  const menuItems = allItems?.payload?.map((item) => ({
    key: item.itemId,
    label: <a href={`/items/${item.itemId}`}>{item.itemName}</a>,
  }));

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
