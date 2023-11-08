import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Homepage/Home/HomePage.tsx";
import Dashboard from "../pages/Homepage/Dashboard/Dashboard.tsx";
import { ErrorPage } from "../components/ErrorPage.tsx";
import Login from "../pages/Authenticate/auth/Login.tsx";
import Signup from "../pages/Authenticate/auth/Signup.tsx";
import { AccountDetails } from "../pages/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/account",
    element: <AccountDetails />,
  },
  {
    path: "*",
    element: (
      <ErrorPage
        status={"404"}
        message={"Oops! Something went wrong."}
        description={"The page you are looking for was not found."}
      />
    ),
  },
]);

export default router;
