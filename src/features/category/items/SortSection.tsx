import { Select } from "antd";
import { FaSortAmountDown } from "react-icons/fa";
import useSearchProductParams from "../products/hooks/useSearchProductParams";

const SortSection: React.FC = () => {
  const { searchParams, setSearchParams } = useSearchProductParams();

  function handleChange(value: string) {
    const [sortBy, direction] = value.split("-");

    if (sortBy && direction) {
      searchParams.set("sortBy", sortBy);
      searchParams.set("direction", direction);
    } else {
      searchParams.delete("direction");
      searchParams.delete("sortBy");
    }

    setSearchParams(searchParams);
  }

  const defaultValue = searchParams.get("sortBy")
    ? `${searchParams.get("sortBy")}-${searchParams.get("direction")}`
    : "Không";

  return (
    <div>
      <Select
        suffixIcon={<FaSortAmountDown />}
        defaultValue={defaultValue}
        style={{ width: 150 }}
        onChange={handleChange}
        options={[
          { value: "productName-asc", label: "Tên (A-Z)" },
          { value: "productName-desc", label: "Tên (Z-A)" },
          {
            value: "sellingPrices.sellingPriceValue-asc",
            label: "Giá (Tăng dần)",
          },
          {
            value: "sellingPrices.sellingPriceValue-desc",
            label: "Giá (Giảm dần)",
          },
        ]}
      />
    </div>
  );
};

export default SortSection;
