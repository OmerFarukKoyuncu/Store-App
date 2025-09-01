import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import CartPage from "./pages/cart/Cart";
import LoginPage from "./pages/account/Login";
import RegisterPage from "./pages/account/Register";
import ProductDetailsPage from "./pages/ProductDetails";
import ErrorPage from "./pages/errors/Error";
import ServerError from "./pages/errors/ServerError";
import NotFoundPage from "./pages/errors/NotFound";
import { useContext, useEffect, useState } from "react";
import requests from "./api/apiClient";
import { useDispatch } from "react-redux";
import { getCart, setCart } from "./pages/cart/cartSlice";
import { getUser } from "./pages/account/accountSlice";
import MainLayout from "./layouts/MainLayout";
import Loading from "./components/Loading";
import CheckoutPage from "./pages/checkout/Checkout";
import AuthGuard from "./auth/AuthGuard";
import OrdersPage from "./pages/orders/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    //index true diyince ilk gelecek sayfa oluyor
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":id", element: <ProductDetailsPage /> },
        ],
      },

      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <AuthGuard />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "orders", element: <OrdersPage /> },
        ],
      },

      {
        path: "errors",
        children: [
          { index: "true", element: <ErrorPage /> },
          { path: "server-error", element: <ServerError /> },
          { path: "not-found", element: <NotFoundPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());
  };

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Uygulama Başlatılıyor." />;

  return <RouterProvider router={router} />;
}

export default App;
