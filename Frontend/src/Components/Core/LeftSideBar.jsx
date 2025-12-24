import store from "@/redux/store.js";
import { logout } from "../../Services/Operations/User.js";
import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setUserLocation } from "@/redux/authSlice.js";
import CreatePost from "../Common/CreatePost.jsx";
import { useClickAway } from "react-use";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Button } from "../ui/button.jsx";
import { setLikeNotification } from "@/redux/rtnSlice.js";
import { setPosts, setSelectedPost } from "@/redux/postSlice.js";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { likeNotification } = useSelector(
    (state) => state.realTimeNotification
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);

  useClickAway(formRef, () => {
    // Perform the operation when clicking outside

    dispatch(setLikeNotification({ type: "removeData" }));
  });

  const LogOuthandler = async () => {
    const response = await logout();
    if (response) {
      //("Log Out Is cnjcdj");
      dispatch(setAuthUser(null));
      dispatch(setSelectedPost(null));
      dispatch(setPosts([]));
      dispatch(setUserLocation(""));
      navigate("/login");
    }
  };

  const sidebarHandler = (textType) => {
     //(textType);

    if (textType == "Logout") {
      LogOuthandler();
    } else if (textType == "Create") {
      setOpen(true);
    } else if (textType == "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType == "Home") {
      navigate(`/`);
    } else if (textType == "Message") {
      navigate(`/chat`);
    }
  };

  const sidebarItems = [
    { icons: <Home />, text: "Home" },

    { icons: <MessageCircle />, text: "Message" },
    { icons: <Bell />, text: "Notification" },
    { icons: <PlusSquare />, text: "Create" },
    {
      icons: (
        <Avatar className="w-7 h-7 ">
          <AvatarImage
            className="rounded-full"
            src={user?.profilePicture}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icons: <LogOut />, text: "Logout" },
  ];

  // px-4 border-r border-gray-800 w-[270px] h-screen

  return (
    <div className="z-10 flex fixed bottom-0 lg:top-0 lg:w-[250px] lg:items-start lg:relative border-r border-gray-800 w-[100%]">
      <div className="flex justify-evenly lg:flex-col w-[100%] bg-white ">
        <img
          className=" hidden lg:block ml-10 mt-5 mb-5 w-[100px] h-[80px]"

          src="Brand_logo.png"
          alt=""
        />
        {sidebarItems.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => sidebarHandler(item.text)}
              className="flex flex-col items-center text-[10px] lg:flex-row lg:items-center lg:gap-4 lg:py-3 lg:px-5  lg:text-[18px] font-semibold relative hover:bg-gray-100 cursor-pointer rounded-lg p-1 my-3 "
            >
               {item.icons}
              <span>{item.text}</span>
              {item.text === "Notification" && likeNotification?.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full bg-red-600 hover:bg-red-600 h-5 w-5 absolute  bottom-6 left-6"
                    >
                      {likeNotification.length}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent ref={formRef}>
                    <div className=" flex flex-col gap-2">
                      {likeNotification.length === 0 ? (
                        <p>No New Notification</p>
                      ) : (
                        likeNotification.map((notification) => {
                          return (
                            <div
                              key={notification}
                              className="flex items-center gap-2"
                            >
                              <Avatar>
                                <AvatarImage
                                  src={notification.userDetails?.profilePicture}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>

                              <p className="text-sm">
                                <span className="font-bold">
                                  {notification.userDetails?.username}
                                </span>{" "}
                                liked your post
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          );
        })}
      </div>

      <CreatePost open={open} setOpen={setOpen} />

      

    </div>
  );
};

export default LeftSideBar;
