import { UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Form } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PaymentMethodSelector from "../features/booking/check-out/PaymentMethodSelector";
import ShippingInfoForm from "../features/booking/check-out/ShippingInfoForm";
import { TbLogin2 } from "react-icons/tb";
import {
  IBriefTransaction,
  ICustomer,
  ISellingOrder,
  ISellingOrderDetail,
  OrderStatus,
  PaymentStatus,
  TransactionType,
} from "../interfaces";
import useCartData from "../redux";
import {
  productService,
  sellingOrderService,
  transactionService,
} from "../services";
import { useDynamicTitle } from "../utils";
import { clearCart } from "../redux/slices/cartSlice";

const CheckOut: React.FC = () => {
  useDynamicTitle("Thanh toán");
  // Lấy thông tin khách hàng từ localStorage to Json
  const user: ICustomer | null = JSON.parse(
    localStorage.getItem("customer") || "null",
  );

  const [customer] = useState<ICustomer | undefined>(user || undefined);
  const addresses = customer?.addresses;
  const [form] = Form.useForm();
  const [provinceId, setProvinceId] = useState<number | undefined>();
  const [districtId, setDistrictId] = useState<number | undefined>();
  const [wardCode, setWardCode] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [formattedAddress, setFormattedAddress] = useState<
    string | undefined
  >();
  const [selectedMethod, setSelectedMethod] = useState<number>(1);
  const { cartState, cartDispatch } = useCartData();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const productsIdFormRedux = cartState.cartDetails.map(
    (product) => product.productId,
  );

  const { data } = useQuery({
    queryKey: ["productsInCart", productsIdFormRedux],
    queryFn: async () => {
      if (!productsIdFormRedux || productsIdFormRedux.length === 0) return [];
      return await Promise.all(
        productsIdFormRedux.map((id) => productService.getProduct(id)),
      );
    },
    enabled: productsIdFormRedux?.length > 0,
  });
  const products = data ? data.flatMap((result) => result.payload || []) : [];

  function findQuantity(productId: number) {
    return cartState.cartDetails.find(
      (cartDetail) => cartDetail.productId === productId,
    )?.quantity;
  }

  function findProductImage(productId: number) {
    const product = products.find((product) => product.productId === productId);
    return product && product.productImages && product?.productImages.length > 0
      ? product.productImages[0].imageUrl
      : "https://placehold.co/400";
  }

  const sellingOrderDetails: ISellingOrderDetail[] = products.map(
    (product) => ({
      ...product,
      productId: product.productId,
      productName: product.productName,
      unit: product.productUnit,
      quantity: findQuantity(product.productId) || 1,
      unitPrice: product.sellingPrice.sellingPriceValue,
      totalPrice:
        (findQuantity(product.productId) || 1) *
        product.sellingPrice.sellingPriceValue,
    }),
  );

  const { mutate: createTransaction, isPending: isCreatingTransaction } =
    useMutation({
      mutationFn: (newTransaction: IBriefTransaction) => {
        return transactionService.createTransaction(newTransaction);
      },

      onSuccess: (data) => {
        if (data.success) {
          console.log(data.payload?.paymentMethod.paymentUrl);
          if (data.payload?.paymentMethod.paymentUrl) {
            window.location.href = data.payload?.paymentMethod.paymentUrl;
          } else {
            navigate(
              "/order/success?sellingOrderId=" +
                data.payload?.sellingOrder.sellingOrderId,
            );
          }
        } else if (!data.success)
          toast.error(data.message || "Operation failed");
      },

      onError: (error) => {
        toast.error(error.message || "Operation failed");
      },
    });

  const { mutate: createSellingOrder, isPending: isCreatingSellingOrder } =
    useMutation({
      mutationFn: (newSellingOrder: Omit<ISellingOrder, "sellingOrderId">) => {
        return sellingOrderService.create(newSellingOrder);
      },

      onSuccess: (data) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey.includes("selling_orders") ||
            query.queryKey.includes("selling_order") ||
            query.queryKey.includes("customers"),
        });
        if (!data.success)
          toast.success(data.message || "Operation successful");
        // if (data.success) toast.success(data.message || "Operation successful");
        // else if (!data.success) toast.error(data.message || "Operation failed");
      },

      onError: (error) => {
        toast.error(error.message || "Operation failed");
      },
    });

  const handleSubmit = (values: ISellingOrder) => {
    const newValues: Omit<ISellingOrder, "sellingOrderId"> = {
      // ...values,
      customerId: customer ? customer.customerId : undefined,
      customerName: values.customerName,
      phone: values.phone,
      email: values.email,
      note: values.note || undefined,
      address: formattedAddress,
      totalAmount: sellingOrderDetails.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      ),
      usedScore: 0,

      paymentStatus:
        selectedMethod === 1 ? PaymentStatus.PENDING : PaymentStatus.COD,

      orderStatus: OrderStatus.PENDING,
      sellingOrderDetails: sellingOrderDetails,
      earnedScore: 0,
      orderStatuses: [],
    };

    console.log("Received values:", newValues);

    createSellingOrder(newValues, {
      onSuccess: (data) => {
        if (data.success) {
          console.log(data);

          const newTransaction: IBriefTransaction = {
            sellingOrder: {
              sellingOrderId:
                (data && data.payload && data.payload.sellingOrderId) || "",
            },
            transactionType: TransactionType.PAYMENT,
            paymentMethod: {
              paymentMethodId: selectedMethod,
              paymentMethodName: selectedMethod === 1 ? "VN_PAY" : "COD",
            },
          };

          createTransaction(newTransaction);

          cartDispatch(clearCart());
        }
      },
    });
  };

  // console.log(cartState);
  // console.log(products);
  // console.log(sellingOrderDetails);

  useEffect(() => {
    if (customer && customer.addresses[0]) {
      const address = customer.addresses[0];
      form.setFieldsValue({
        provinceId: address?.provinceId || undefined,
        districtId: address?.districtId || undefined,
        wardCode: address?.wardCode || undefined,
        description: address?.description || undefined,
      });
      setProvinceId(address?.provinceId);
      setDistrictId(address?.districtId);
      setWardCode(address?.wardCode);
      setDescription(address?.description);
    }

    if (customer) {
      form.setFieldsValue({
        customerName: `${customer.lastName} ${customer.firstName}`,
        email: customer.email,
        // phone: customer.phone,
      });
    }
  }, [form, customer]);

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <div className="mx-auto flex max-w-6xl rounded-lg bg-white p-6 shadow-md">
        {/* Thông tin giao hàng */}
        <div className="w-2/3 rounded-lg pr-6">
          <div className="w-full pr-8">
            <img src="/logo_512.png" alt="Logo" className="mb-4 w-32" />
            <h2 className="text-lg font-semibold">Thông tin giao hàng</h2>

            <div className="my-4 flex items-center gap-4">
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
              {customer ? (
                <>
                  <div>
                    <p className="font-semibold">
                      {customer?.lastName} {customer?.firstName}
                    </p>
                    <p className="text-gray-500">{customer?.email}</p>
                    <p className="text-gray-500">
                      Điểm tích lũy hiện có:{" "}
                      <span className="font-semibold text-blue-900">
                        {customer?.score.newValue}
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="font-semibold">Khách hàng vãng lai</p>
                    <p className="text-gray-500">
                      Đăng nhập để tích điểm và nhận ưu đãi!
                    </p>
                    <TbLogin2
                      className="cursor-pointer text-xl"
                      onClick={() => navigate("/login")}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <ShippingInfoForm
            form={form}
            provinceId={provinceId}
            setProvinceId={setProvinceId}
            districtId={districtId}
            setDistrictId={setDistrictId}
            wardCode={wardCode}
            setWardCode={setWardCode}
            description={description}
            setDescription={setDescription}
            formattedAddress={formattedAddress}
            setFormattedAddress={setFormattedAddress}
            addresses={addresses}
          />

          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />

          <Form.Item>
            <Button
              loading={isCreatingSellingOrder || isCreatingTransaction}
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Xác nhận
            </Button>
          </Form.Item>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="w-1/3 rounded-lg p-6">
          {sellingOrderDetails.map((product) => (
            <div key={product.productId} className="mb-4 flex items-center">
              <img
                src={findProductImage(product.productId)}
                alt={product.productName}
                className="h-12 w-12 rounded"
              />
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold">{product.productName}</h3>
                <p className="text-xs text-gray-500">
                  {product.quantity} {product.unit} x{" "}
                  {product.unitPrice.toLocaleString()}đ
                </p>
              </div>
              <p className="text-sm font-bold">
                {product.totalPrice.toLocaleString()}đ
              </p>
            </div>
          ))}

          {/* Mã giảm giá */}
          <div className="my-4 flex items-center">
            <input
              type="text"
              placeholder="Mã giảm giá"
              className="flex-1 rounded-l-lg border p-2"
            />
            <div className="cursor-pointer rounded-r-lg bg-blue-800 px-4 py-2 text-white">
              SỬ DỤNG
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="border-t pt-4">
            <p className="flex justify-between">
              <span className="text-gray-500">Tạm tính:</span>
              <span className="font-semibold">
                {sellingOrderDetails
                  .reduce((sum, item) => sum + item.totalPrice, 0)
                  .toLocaleString()}
                đ
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Phí ship sẽ được xác nhận qua điện thoại
            </p>
            <p className="mt-2 flex justify-between text-lg font-semibold">
              <span>Tổng cộng:</span>
              <span className="text-black">
                {sellingOrderDetails
                  .reduce((sum, item) => sum + item.totalPrice, 0)
                  .toLocaleString()}
                đ
              </span>
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CheckOut;
