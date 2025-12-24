import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { apiconnector } from "@/Services/apiconnector";
import { userOperation } from "@/Services/apis";
import { setAuthUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const { EDIT_PROFILE } = userOperation;

const EditProfile = () => {
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    profilePicture: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePicture: file });
    }
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePicture) {
      formData.append("profilePicture", input.profilePicture);
    }

    try {
      setLoading(true);
      const response = await apiconnector("POST", EDIT_PROFILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        const updatedUserData = {
          ...user,
          bio: response.data.user?.bio,
          profilePicture: response.data.user?.profilePicture,
          gender: response.data.user?.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user._id}`);
        toast.success(response.data.message);
      }
    } catch (error) {
      //(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-2xl mx-auto p-2 md:pl-10 justify-center">
      <section className="flex flex-col gap-6 my-8   w-[90%]">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <div className="flex items-center justify-between gap-2 bg-gary-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                className="rounded-full"
                src={user?.profilePicture}
                alt="post_image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-sm font-bold">{user?.username} </h1>
              <span className="text-gray-600 text-sm">
                {user?.bio || "Bio Here...."}
              </span>
            </div>
          </div>

          <input
            ref={imageRef}
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
          />
          <Button
            onClick={() => imageRef.current.click()}
            className="bg-[#2993d0] h-8 hover:bg-[#377ab5]"
          >
            Change photo
          </Button>
        </div>

        <div>
          <h1 className="font-bold text-xl">Bio</h1>
          <Textarea
            name="bio"
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            className="focus-visible:ring-transparent "
          />
        </div>

        <div>
          <h1 className="font-bold mb-2">Gender</h1>
          <Select
            defaultValue={input.gender}
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          {loading ? (
            <Button className="w-fit bg-[#216ab8] hover:bg-[#20577e]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="w-fit bg-[#216ab8] hover:bg-[#20577e]"
            >
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
