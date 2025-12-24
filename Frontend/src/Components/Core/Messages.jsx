import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useGetAllMessages, useGetRTM } from "@/Services/Operations/Message";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessages();
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar>
            <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button className="h-8 my-2" varient="secondary">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div>
        {messages &&
          messages?.map((msg) => {
            console.log(msg);
            return (
              <div
                className={`flex ${
                  msg.senderId === user?._id ? "justify-end" : "justify-start"
                } mt-3`}
              >
                <div
                  className={`p-2 rounded-lg max-x-ws break-words ${
                    msg.senderId === user?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Messages;
