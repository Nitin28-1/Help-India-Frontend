import { useGetUserProfile } from "@/Services/Operations/User";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { apiconnector } from "@/Services/apiconnector";
import { userOperation } from "@/Services/apis";
import FollowBtn from "./FollowBtn";

const {SUPPORTORUNSUPPORT}=userOperation;

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const dispatch=useDispatch();
  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((state) => state.auth);
  const displayPost =
    activeTab == "posts" ? userProfile?.posts : userProfile?.bookmarks;

  const isLoggedUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // const handleFollowUnfollowRequest=async(SupporterId ,targetUser)=>
  //     {
  //       console.log("follow on chat page")
    
  //       try {
         
  //         const res=await apiconnector("POST",SUPPORTORUNSUPPORT,{
  //           SupporterId ,targetUser
  //         },
  //         { withCredentials: true }
  //        );
         
  //        console.log("Follow after data handling ");
  //        console.log(user)
  //        console.log(res.data.user);
    
  //        if(res.data.follow == false)
  //        {
         
  //        dispatch(setAuthUser(res.data.user));
  //         toast.success('UnFollow User Successfully...');
  //        }
  //        else if(res.data.follow == true)
  //        {
  //        dispatch(setAuthUser(res.data.user));
  //         toast.success('Follow User Successfully...');
  //        }
    
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  
  console.log(userProfile)

  return (
    <div className="flex w-full justify-center mx-auto md:pl-10">
      <div className="flex flex-col gap-5 md:gap-10 p-8">
        <div className="flex flex-col gap-[20px]  sm:flex-row items-center justify-center sm:gap-[100px]">
          <section className="">
            <Avatar className=" h-[180px] w-[180px] md:h-[250px]  md:w-[250px]">
              <AvatarImage src={userProfile?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>

          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button>EditProfile</Button>{" "}
                    </Link>
                    <Button>View Archive</Button>
                  </>
                ) : (
                    <Button className="bg-[#3980cc] hover:bg-[#2e609d]" >
                   <FollowBtn  SupporterId={user._id} targetUser={userId} />
                  </Button>)
                }
              </div>

              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts?.length}{" "}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.supporters?.length}{" "}
                  </span>{" "}
                  Supporters
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.impacter?.length}{" "}
                  </span>{" "}
                  Impacters
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold">
                  {userProfile?.bio || "bio here...."}{" "}
                </span>
                <Badge className="w-fit " variant="secondary">
                  <AtSign />{" "}
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge>
                <span>Learn Code With Me </span>
                <span>Turn Code In Fun.... </span>
                <span>DM FOR COLLAB </span>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-4 text-sm">
            <span
              className={`py-1 cursor-pointer ${
                activeTab == "posts" ? "font-semibold" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <hr className="border-l-2 border-black bg-black  h-5" />
            <span
              className={`py-1 cursor-pointer ${
                activeTab == "saved" ? "font-semibold" : ""
              }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {displayPost?.map((post) => {
            return (
              <div key={post?._id} className="relative group cursor-pointer w-[30%]">
                <img
                  src={post.image}
                  className="rounded-sm my-2 w-full aspect-square object-cover"
                  alt="postimage"
                />
                <div className="absolute rounded-sm inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <Button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart />
                      <span>{post?.likes.length}</span>
                    </Button>
                    <Button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle />
                      <span>{post?.likes.length}</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
