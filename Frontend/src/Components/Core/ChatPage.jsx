import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { Input } from "../ui/input";
import { MessageCircleCode } from "lucide-react";
import { Button } from "../ui/button";
import Messages from "./Messages";
import { message } from "../../Services/apis";
import { apiconnector } from "@/Services/apiconnector";
import { setMessages } from "@/redux/chatSlice";
import { useGetAllChatUser } from "@/Services/Operations/Message";

const { SEND_MESSAGE } = message;

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, chatUser, selectedUser } = useSelector(
    (state) => state.auth
  );
  useGetAllChatUser();
  const { onlineUsers, messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const response = await apiconnector(
        "POST",
        `${SEND_MESSAGE}/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      //(response);

      if (response.data.success) {
        dispatch(setMessages([...messages, response.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      //(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="flex  h-screen overflow-hidden">
      <section className="w-[35%] md:w-[30%]   overflow-auto  my-1 h-full border-r-2 ">
        <h1 className="font-bold  ml-4 mb-4 py-3 text-xl">{user?.username}</h1>
        <hr className=" border-gray-300 mb-4" />
        <div className="flex flex-col gap-5 md:ml-7">
          {chatUser?.length >= 1 ? (chatUser.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);

            return (
              <div
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex flex-col md:flex-row gap-3 items-center  hover:bg-gray-50 cursor-pointer"
              >
                <Avatar className="w-14 h-14">
                <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col  items-center md:items-start ">
                  <span className="font-medium ">
                    {suggestedUser?.username}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isOnline ? "text-green-600" : "text-red-600"
                    } `}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })) : 
            
          <div className="sm:text-2xl  lg:text-4xl xl:text-5xl p-3 font-semibold">

              To Chat with People <h1 className="text-purple-800">First Start</h1> following them...
          </div>
          } 
        </div>
      </section>

      <div className="flex w-[70%] md:w-[70%] h-[90%] lg:h-[100%] items-center justify-center">
      {selectedUser ? (
        <section className=" flex-1 py-4 border-l border-l-gray-300 flex flex-col h-full">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <Messages selectedUser={selectedUser} />

          <div className="flex items-center p-4 border-t border-t-gray-300">
            <Input
              type="text"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              className="flex-1 mr-2 focus-visible:ring-transparent"
              placeholder="Messages...."
            />
            <Button onClick={() => sendMessageHandler(selectedUser._id)}>
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium text-xl">Your Message</h1>
          <span>Send a Message to start a chat </span>
        </div>
      )}

</div>
    </div>
  );
};

export default ChatPage;
