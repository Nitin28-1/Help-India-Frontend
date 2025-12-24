import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import EditProfile from "./EditProfile";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="w-full h-screen lg:flex bg-[white]">
      
      <Navbar  />

      <LeftSideBar />

      <div className="w-full h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
