import { Button, Card, Descriptions, Tooltip } from "antd";
import { useLoggedInCustomer } from "../features/auth/hooks";
import { useAddressData } from "../features/components/hooks/useAddressData";
import AddressItem from "../features/profile/components/AddressItem";
import UpdatePersonalInfo from "../features/profile/UpdatePersonalInfo";
import { formatAddressName } from "../utils";
import AddAddress from "../features/profile/AddAddress";

const MyAccount: React.FC = () => {
  const { user } = useLoggedInCustomer();
  const addressDefault = user?.addresses.find((addr) => addr.isDefault);
  const {
    provinceData,
    districtData,
    wardData,
    // isLoadingProvince,
    // isLoadingDistrict,
    // isLoadingWard,
  } = useAddressData({
    provinceId: addressDefault?.provinceId,
    districtId: addressDefault?.districtId,
  });

  const address = formatAddressName(
    addressDefault?.provinceId,
    addressDefault?.districtId,
    addressDefault?.wardCode,
    addressDefault?.description,
    provinceData,
    districtData,
    wardData,
  );

  window.scrollTo(0, 0);

  const sortedAddress = user?.addresses?.sort((a, b) => {
    return (a.createdAt ?? 0) > (b.createdAt ?? 0) ? -1 : 1;
  });

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Thông tin tài khoản"
        className="max-xl w-full transition-all duration-700 hover:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.24)]"
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Họ tên">
            {user?.lastName} {user?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {user?.dob
              ? new Date(user.dob).toLocaleDateString("vi-VN")
              : "Chưa có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {user?.gender === "MALE" ? "Nam" : "Nữ"}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ mặc định">
            {address}
          </Descriptions.Item>
          <Descriptions.Item label="Điểm tích lũy">
            {user?.score.newValue.toLocaleString()}
          </Descriptions.Item>
        </Descriptions>

        <div className="mt-4 text-center">
          {user && <UpdatePersonalInfo user={user} />}
        </div>
      </Card>

      <Card
        title="Danh sách địa chỉ"
        className="max-xl w-full transition-all duration-700 hover:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.24)]"
        extra={
          <div className="flex items-center gap-2">
            {user && <AddAddress user={user} />}
          </div>
        }
      >
        {sortedAddress && sortedAddress?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {sortedAddress.map((addr) => {
              return (
                <div className="relative" key={addr.addressId}>
                  <AddressItem address={addr} />
                  {!addr.isDefault && (
                    <div
                      className="absolute right-0 top-1"
                      style={{ zIndex: 100 }}
                    >
                      <Tooltip title="Chọn làm địa chỉ mặc định mới">
                        <Button
                          type="link"
                          className=""
                          onClick={() => {
                            // Handle set default address
                          }}
                        >
                          Chọn
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có địa chỉ nào.</p>
        )}
      </Card>
    </div>
  );
};

export default MyAccount;
