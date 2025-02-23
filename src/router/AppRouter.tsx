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
            element: <div>Items</div>,
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
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
