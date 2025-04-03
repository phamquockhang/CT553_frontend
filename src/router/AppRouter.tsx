import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../common/ErrorPage";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import BestSellerProducts from "../pages/BestSellerProducts";
import Product from "../pages/Product";
import Item from "../pages/Item";
import Search from "../pages/Search";
import Cart from "../pages/Cart";
import Items from "../pages/Items";
import CheckOut from "../pages/CheckOut";
import CheckoutLayout from "../layouts/CheckoutLayout";
import SuccessfulPayment from "../pages/SuccessfulPayment";
import FailedPayment from "../pages/FailedPayment";
import SuccessfulOrder from "../pages/SuccessfulOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "items",
        children: [
          {
            path: "",
            element: <Items />,
          },
          {
            path: ":itemId",
            element: <Item />,
          },
          {
            path: "best-seller-products",
            element: <BestSellerProducts />,
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            path: "",
            element: <div>Products</div>,
          },
          {
            path: ":productId",
            element: <Product />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/payment",
        children: [
          {
            path: "success",
            element: <SuccessfulPayment />,
          },
          {
            path: "fail",
            element: <FailedPayment />,
          },
        ],
      },
      {
        path: "order/success",
        element: <SuccessfulOrder />,
      },
    ],
  },
  {
    path: "/",
    element: <CheckoutLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "check-out",
        element: <CheckOut />,
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
