import React from "react";
import Feed from "../Common/Feed";
import { Outlet } from "react-router-dom";
import RightSideBar from "../Common/RightSideBar";
import { useGetAllSuggestedUser } from "@/Services/Operations/User";
import Navbar from "./Navbar"

const Home = () => {
 
  useGetAllSuggestedUser();

  return (
    <div className="flex  bg-[#f9f8f8f4]  ">

      <div className=" w-[90%] mx-4 lg:w-[70%] xl:w-[75%]">
        <Feed />
      </div>

      <RightSideBar  />

    </div>
  );
};

export default Home;
