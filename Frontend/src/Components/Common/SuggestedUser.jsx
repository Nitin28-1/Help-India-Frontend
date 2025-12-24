import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { userOperation } from "@/Services/apis";
import { apiconnector } from "@/Services/apiconnector";
const {SUPPORTORUNSUPPORT}=userOperation
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";
import FollowBtn from "../Core/FollowBtn";

const SuggestedUser = ({ sideTitle }) => {
  const { suggestedUsers,user } = useSelector((state) => state.auth);


  // //(suggestedUsers);
  return (
    <div className="my-10 h-[400px] border  rounded-lg  ">
      <div
        className={`flex items-center justify-between   text-sm mb-2 p-3 h-[10%] rounded-t-md`}
      >
        <h1 className="font-bold text-[20px] text-grey-600">{sideTitle} </h1>
        {/* <span className="font-medium cursor-pointer">See All</span> */}
      </div>

      <div className="flex h-[85%] flex-col  gap-3 p-3 overflow-scroll ">
        {suggestedUsers?.map((u) => {
          return (
            <div className="flex items-center justify-between " key={u._id}>
              <div className="flex items-center gap-2">
                <Link to={`/proifle/${u?._id}`}>
                  <Avatar>
                    <AvatarImage
                      className="rounded-full"
                      src={u?.profilePicture}
                      alt="post_image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>

                <div>
                  <h1 className="font-semibold text-sm">
                    <Link to={`/profile/${u._id}`}>{u?.username} </Link>
                  </h1>
                  <span className="text-gray-600 text-sm">
                    {u?.bio || "Bio Here...."}
                  </span>
                </div>
              </div>

              <span className="text-[#4c97ed] text-sm font-semibold hover:text-[rgb(0,0,255)] cursor-pointer " 
              >
               <FollowBtn SupporterId={user?._id} targetUser={u?._id} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedUser;
