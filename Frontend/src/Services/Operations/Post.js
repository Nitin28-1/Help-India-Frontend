import { toast, Toaster } from "sonner";
import { apiconnector } from "../apiconnector";
import { postOperation } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/postSlice";
import { useEffect } from "react";
import store from "@/redux/store";
import { setUserLocation } from "@/redux/authSlice";

const { CREATE_POST, GET_ALL_POST,
  DELETE_POST_HANDLER, 
  LIKE_UNLIKE_HANDLER,
  COMMENT,
} = postOperation;


export const CreateNewPost = async (formData) => {

  try {
    const response = await apiconnector("POST", CREATE_POST, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data;
    } else {
      throw new error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};




export const DeletePost=async (id)=>
{
   try {
    
    const response = await apiconnector("DELETE",`http://localhost:8000/api/v1/post/delete/${id}`, {
      withCredentials: true,
    });

        if(response.data.message)
        {
           toast.success("Post Deleted SuccessFully");
           return true;
        }
        else
        {
          throw new error (response.data.message);
        }

   } catch (error) {

     toast.error(error);
     return false;
    
   }
}


export const likeAndUnlikePost=async (postId,action)=>
{ 
  console.log();
    try {
      const response = await apiconnector(
        "GET",
        `${LIKE_UNLIKE_HANDLER}/${postId}/${action}`,
        {
          withCredentials: true,
        }
      );

      if(response.data.message)
      {
        toast.success(response.data.message);
        return true;
      }
        

    } catch (error) {
      
      console.log(error);
      toast.error(error);
      return false;
    }
}

export const serializeParams = (params) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};





