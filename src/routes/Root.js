import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div>hello</div>
      <Outlet />
    </>
  );
};

export default Root;
