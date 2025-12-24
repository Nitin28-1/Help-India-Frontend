import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import { TbDatabaseOff } from "react-icons/tb";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";


const Posts = ({FindMyLocation,loading2}) => {
  const { posts } = useSelector((state) => state.post);
  //("let see loading 2",loading2);

  return (
    <div className="flex  ">
      {posts.length == 0 ? (
        <div className="flex flex-col items-center mx-auto my-48 ">
          <TbDatabaseOff size={'150px'} />
          <h1 className="font-semibold text-gray-950 text-[30px]">No Posts Available in Your Area</h1>
        <h2 className="font-semibold text-gray-950 text-[34px] mb-5">Try Searching in a Different Area</h2>
        {loading2 ? (<Button>
            <Loader2 className="mr-2 h-4  w-4  animate-spin" />
            Please Wait...
          </Button>) :(<Button onClick={FindMyLocation}>Refresh Location</Button>)}
        </div>

      ) : (
        <div className="flex flex-col w-full overflow-x-hidden overflow-y-hidden ">

          <h1 className="ml-5 w-[100%] lg:w-[50%] p-2 rounded-r-3xl mt-5  text-3xl font-semibold font-postTitle">
            Trending Posts
          </h1>
        
          <div className="flex  flex-col  items-center lg:flex-row lg:flex-wrap w-full gap-5 justify-evenly">
          {posts?.map((post) => (
            // //(post)
            <Post key={post?._id} post={post} />
          ))}
          </div>
          
          
        </div>
      )}
    </div>
  );
};

export default Posts;
