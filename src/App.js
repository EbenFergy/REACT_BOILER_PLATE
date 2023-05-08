import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./pages/HomePage/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      children: [{ path: "", element: <Home /> }],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
