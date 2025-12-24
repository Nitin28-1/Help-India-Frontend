import { useDispatch, useSelector } from "react-redux";
import { apiconnector } from "../apiconnector";
import { setPosts } from "@/redux/postSlice";
import { useEffect } from "react";
import { message } from "../apis";
import { setMessages } from "@/redux/chatSlice";
import {setChatUser} from "@/redux/authSlice"
const {
  GET_ALL_MESSAGE,CHAT_USER
}=message;

export const useGetAllMessages = () => {
    const dispatch = useDispatch();
    const {selectedUser} =useSelector(state=>state.auth);

    useEffect(() => {
      const fetchAllMessages = async () => {
        try {
          const response = await apiconnector("GET",`${GET_ALL_MESSAGE}/${selectedUser?._id}`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
         
          console.log("Finding message or nOt", response);
          if (response.data.success) {
            console.log(response.data.messages);
           dispatch(setMessages(response.data.messages));
          }
        } catch (error) {
          console.log(error);
        }
      };

  
      fetchAllMessages();
    }, [selectedUser]);
  };
  


  export const useGetRTM = () => {
    const dispatch = useDispatch();
    const {socket}=useSelector(state=>state.socketio)
    const {messages}=useSelector(state=>state.chat)

    useEffect(() => {

      socket?.on('newMessage',(newMessage)=>{
        dispatch(setMessages([...messages, newMessage]));
      })


      return ()=>{
        socket?.off('newMessage');
      }
    
    }, [messages,setMessages]);
  };
  

export const useGetAllChatUser=()=>{
    
  const dispatch=useDispatch();
  const {user}=useSelector(state=>state.auth);

  useEffect(()=>{
    const fetchAllChatUser = async () => {
      try {
        const response = await apiconnector("GET",`${CHAT_USER}/${user?._id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
       
        console.log("Finding message or nOt", response);
        if (response.data.success) {
          console.log(response.data.users);
         dispatch(setChatUser(response.data.users));
        }
      } catch (error) {
        console.log(error);
      }
    };


    fetchAllChatUser();
  },[user])
   
  }