import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../common/ErrorPage";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import BestSellerProducts from "../pages/BestSellerProducts";

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
            element: <div>Item Detail</div>,
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
            element: <div>Product Detail</div>,
          },
        ],
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
