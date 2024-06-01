import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  Routes,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";

export default function App() {
  function Redirect({ childeren }) {
    let user = JSON.parse(localStorage.getItem("user")) ?? false;

    return user ? childeren : <Navigate to="/" />;
  }
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ]
    // createRoutesFromElements(
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/signup" element={<SignUp />} />
    //     <Route
    //       path="/dashboard"
    //       element={
    //           <Dashboard />
    //       }
    //     ></Route>
    //   </Routes>
    // )
  );

  return <RouterProvider router={router} />;
}
