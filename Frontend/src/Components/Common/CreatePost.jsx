import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { readFileAsDataURL } from "@/lib/utils";
import { toast, Toaster } from "sonner";
import { CreateNewPost } from "../../Services/Operations/Post";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";
import { Input } from "../ui/input";
import { setUserLocation } from "@/redux/authSlice";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { user,location } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();


  const FindMyLocation=()=>
  { 
    //("find Location called");
    setLoading2(true);
    navigator.geolocation.getCurrentPosition(
      (position)=>
      {
        //("Your Current Location is :", position);
        //("Location kItne Time Set Ho rhi hai");
        dispatch(setUserLocation(JSON.stringify(position.coords)));
        setLoading2(false);
        
      },
      (error)=>
      {
      //("Failed To Fetch Your Current location",error) 
      toast.error("Check Your GPS Settings...") 
      setLoading2(false);
      }
    )
  }

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUri = await readFileAsDataURL(file);
      setImagePreview(dataUri);
    }
  };

  const createPostHandler = async (e) => {
    const formData = new FormData();
    //(location);
     formData.append("caption", caption);
   
    formData.append("location", location);

    if (imagePreview) {
      formData.append("image", file);
    }
    setLoading(true);
    const data = await CreateNewPost(formData);
    dispatch(setPosts(data.posts));
    setLoading(false);
    setOpen(false);
    setCaption(" ")
    setFile(" ")
    setImagePreview("")
  };

  return (
    
    <Dialog open={open} >
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center font-semibold">
          Create New Post
        </DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">{user?.username}</h1>
            <span className="text-gray-600 text-xs">{user?.bio}</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="focus-visible:ring-transparent border-none "
          placeholder="Write a Caption"
        /> 

       

        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="preview_image"
              className="object-fill w-full h-[300px] rounded-md"
            />
          </div>
        )}
        <Input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={fileChangeHandler}
        />
        <Button
          onClick={() => imageRef.current.click()}
          className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bc]"
        >
          Select From Computer
        </Button>

        {
          location ? (<h1 className="font-semibold mx-auto">Location Fetched Successfully...</h1>
          ) : (loading2 ? (<Button>
            <Loader2 className="mr-2 h-4  w-4  animate-spin" />
            Please Wait...
          </Button>) :(<Button onClick={FindMyLocation}>Give Your Post Live Location..</Button>))
        }

        
        {imagePreview && location &&
          (loading ? (
            <Button>
              <Loader2 className="mr-2 h-4  w-4  animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              onClick={createPostHandler}
              type="submit"
              className="w-full"
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>

  );
};

export default CreatePost;

