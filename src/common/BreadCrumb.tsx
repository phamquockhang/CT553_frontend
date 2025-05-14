import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { itemService } from "../services";

interface BreadCrumbProps {
  displayMenu?: boolean;
  children?: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  displayMenu = true,
  children,
}) => {
  const { data: allItems } = useQuery({
    queryKey: ["allItems"],
    queryFn: itemService.getAllItems,
    select: (data) => data.payload?.filter((item) => item.isActivated),
  });

  const menuItems = allItems?.map((item) => ({
    key: item.itemId,
    label: <a href={`/items/${item.itemId}`}>{item.itemName}</a>,
  }));

  return (
    <Breadcrumb
      className="rounded-lg p-2 text-base font-semibold transition-all duration-200 hover:bg-slate-200"
      items={
        displayMenu
          ? [
              {
                title: "Trang chủ",
                href: "/",
              },
              {
                title: "Các sản phẩm của chúng tôi",
                className: "cursor-pointer",
                menu: { items: menuItems?.filter((item) => item !== null) },
              },
              {
                title: children,
                className: "cursor-pointer text-blue-900",
              },
            ]
          : [
              {
                title: "Trang chủ",
                href: "/",
              },
              {
                title: children,
                className: "cursor-pointer text-blue-900",
              },
            ]
      }
    />
  );
};

export default BreadCrumb;
