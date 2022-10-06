import Checkout from "./components/Checkout";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

import Profile from "./components/Profile";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
