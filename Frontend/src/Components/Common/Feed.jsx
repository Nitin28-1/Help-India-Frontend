import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLocationOff } from "react-icons/md";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { setUserLocation } from "@/redux/authSlice";
import { toast } from "sonner";
import { apiconnector } from "@/Services/apiconnector";
import { postOperation } from "@/Services/apis";
import { setPosts } from "@/redux/postSlice";
import { serializeParams } from "@/Services/Operations/Post";

const { GET_ALL_POST ,GETALLPOSTANYWAY} = postOperation;

const Feed = () => {
  const { location } = useSelector((store) => store.auth);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=> {

    //("We are finding location");
 

    const useGetAllPost = async (location) => {
      
      //(location);
      let newlocation=JSON.parse(location);
      //(newlocation);
      newlocation = {
        latitude: newlocation.latitude,
        longitude: newlocation.longitude,
      };

      //(newlocation);
  
      const queryString = serializeParams(newlocation);
  
      try {
        const response = await apiconnector(
          "GET",
          `${GET_ALL_POST}?${queryString}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
  
        if (response.data.success) {
          //(response.data.posts);
          dispatch(setPosts(response.data.posts));
        }
      } catch (error) {
        //(error);
      }
    }

    useGetAllPost(location)

  },[location])


  const findAllPostAnyway=async()=>
  {
    try {
        const response = await apiconnector(
          "GET",
          `${GETALLPOSTANYWAY}/getAllPostAnyway`,
        );
  
        if (response.data.success) {
          //(response.data.posts);
          dispatch(setPosts(response.data.posts));
        }

    } catch (error) {
      toast.error(error);
    }
  }
 

  const FindMyLocation = async () => {
    setLoading2(true);
    //("Trying To find Location")
    const newPosition = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //(position);
          dispatch(setUserLocation(JSON.stringify(position.coords)));
          setLoading2(false);
          resolve(position.coords);
        },
        (error) => {
          //("Failed To Fetch Your Current location",error);
          toast.error("Check Your GPS Settings...");
          setLoading2(false);
          reject(error);
        }
      );
    });

    //(newPosition);
   
    if(!newPosition)
    {
      findAllPostAnyway()
    }
    
  }

  return (  <div className="flex flex-col  justify-center w-full">
      {location ? (
        <>
         
          <Posts FindMyLocation={FindMyLocation} loading2={loading2}></Posts>
        </>
      ) : (
        <div className="flex flex-col p-10 gap-5 items-center">
          <MdOutlineLocationOff size={`200px`} className=" mt-20" />

          <div className="w-[65%] text-xl ml-10">
            <h1 className=" font-semibold">
              🔍 Ready to explore what’s happening around you? Turn on your
              location to see the latest posts and happenings within a 25 km
              radius. Don’t miss out on local adventures! 🌟
            </h1>
          </div>

          {location ? (
            <h1 className="font-semibold mx-auto">
              Location Fetched Successfully...
            </h1>
          ) : loading2 ? (
            <Button>
              <Loader2 className="mr-2 h-4  w-4  animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button onClick={FindMyLocation}>
              Give Your Post Live Location..
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
