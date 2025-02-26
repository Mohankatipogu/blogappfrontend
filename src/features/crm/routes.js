import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import BlogUpload from "./pages/BlogUpload";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./features/crm/protected/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      // ✅ Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/blogupload", element: <BlogUpload /> },
        ],
      },
    ],
  },
]);

const Root = () => <RouterProvider router={router} />;
export default Root;
