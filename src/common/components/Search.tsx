import { Dropdown, Space } from "antd";
import { IoIosSearch } from "react-icons/io";
import BoxSearch from "./BoxSearch";

const Search: React.FC = () => {
  return (
    <Dropdown
      className="flex items-center"
      dropdownRender={() => <BoxSearch />}
      trigger={["click"]}
      placement="bottomRight"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space className="cursor-pointer">
          <IoIosSearch className="text-2xl" />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Search;
