import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Tooltip } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { IAddress } from "../../../interfaces";
import { formatAddressName } from "../../../utils";
import { useLoggedInCustomer } from "../../auth/hooks";
import { useAddressData } from "../../components/hooks/useAddressData";
import { useAddressHooks } from "../hooks";
import UpdateAddress from "../UpdateAddress";

interface AddressItemInListProps {
  addr: IAddress;
}

const AddressItemInList: React.FC<AddressItemInListProps> = ({ addr }) => {
  const { user } = useLoggedInCustomer();
  const { provinceData, districtData, wardData } = useAddressData({
    provinceId: addr.provinceId,
    districtId: addr.districtId,
  });
  const { setDefaultAddress, deleteAddress } = useAddressHooks();

  function formattedAddress() {
    return formatAddressName(
      addr.provinceId,
      addr.districtId,
      addr.wardCode,
      addr.description,
      provinceData,
      districtData,
      wardData,
    );
  }
  return (
    <div className="flex justify-between">
      <div className="w-[90%]">
        <Input
          className="my-1"
          addonAfter={
            addr.isDefault ? (
              <>
                <Tooltip title="Đây là địa chỉ mặc định khi đặt hàng">
                  <FaCheckCircle className="text-green-600" />
                </Tooltip>
              </>
            ) : (
              <>
                {!addr.isDefault && (
                  <Tooltip title="Chọn làm địa chỉ mặc định mới">
                    <Button
                      className="p-0"
                      type="link"
                      onClick={() => {
                        if (user && addr.addressId) {
                          setDefaultAddress({
                            customerId: user.customerId,
                            addressId: addr.addressId,
                          });
                        }
                      }}
                    >
                      Chọn
                    </Button>
                  </Tooltip>
                )}
              </>
            )
          }
          readOnly={true}
          value={formattedAddress()}
        />
      </div>

      <div className="flex w-[10%] items-center justify-end gap-2">
        <UpdateAddress address={addr} />

        {!addr.isDefault && (
          <Popconfirm
            title="Bạn chắc chắn muốn xóa địa chỉ này?"
            onConfirm={() => {
              if (addr.addressId) {
                deleteAddress(addr.addressId);
              }
            }}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title="Xóa địa chỉ">
              <Button type="link" icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        )}
      </div>
    </div>
  );
};

export default AddressItemInList;
