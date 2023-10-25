import Dashboard from "../pages/Homepage/Dashboard.tsx";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default router;