import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUser from "./SuggestedUser";

const RightSideBar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-[50%] lg:w-[40%] xl:w-[35%] my-2 p-2 hidden md:block  ">
      <div className="flex flex-col p-4  gap-4  bg-[#f4f4f4b5]   rounded-md">
        <h1 className="font-semibold">User Information</h1>
        <div className="flex items-center gap-2">
          <Link to={`/proifle/${user?._id}`}>
            <Avatar className="w-[60px] h-[60px]">
              <AvatarImage
                className="rounded-full"
                src={user?.profilePicture}
                alt="post_image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <div>
            <h1 className="font-semibold text-sm">
              <Link to={`/profile/${user?._id}`}>{user?.username} </Link>
            </h1>
            <span className="text-gray-600 text-sm">
              {user?.bio || "Bio Here...."}
            </span>
          </div>
        </div>
      </div>

      <SuggestedUser sideTitle={"Suggested User"} />
      <SuggestedUser sideTitle={"Most Popular Contributor"} />
    </div>
  );
};

export default RightSideBar;
