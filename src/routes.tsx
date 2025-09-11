import { createBrowserRouter } from "react-router-dom";
import { Dash } from "./pages/app/dashboard/dash";
import { SignIn } from "./pages/auth/sign-in";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignUp } from "./pages/auth/sing-up";
import { Orders } from "./pages/app/orders/orders";
import { NotFound } from "./pages/404";
import { ErrorPage } from "./pages/error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement : <ErrorPage/>,
    children: [
      { path: "/", element: <Dash /> },
      { path: "/orders", element: <Orders /> },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);
