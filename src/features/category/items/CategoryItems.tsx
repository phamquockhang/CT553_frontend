import { useQuery } from "@tanstack/react-query";
import { itemService } from "../../../services";
import Item from "./Item";

const CategoryItems: React.FC = () => {
  const { data: allItem } = useQuery({
    queryKey: ["allItems"],
    queryFn: itemService.getAllItems,
    select: (data) => data.payload?.filter((item) => item.isActivated),
  });

  return (
    <>
      {allItem?.map((item) => <Item key={item.itemId} itemId={item.itemId} />)}
    </>
  );
};

export default CategoryItems;
