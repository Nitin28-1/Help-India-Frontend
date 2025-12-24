import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "./Comment";
import { apiconnector } from "@/Services/apiconnector";
import { postOperation } from "@/Services/apis";
import { setPosts } from "@/redux/postSlice";
import { toast } from "sonner";

const { COMMENT } = postOperation;

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((state) => state.post);
  const [comment, setComment] = useState(selectedPost.comments);
  const dispatch = useDispatch();

  const changeEventListener = (e) => {
    const tempValue = e.target.value;

    if (tempValue.trim()) {
      setText(tempValue);
    } else {
      setText("");
    }
  };

  const sendComment = async () => {
    try {
      const response = await apiconnector(
        "POST",
        `${COMMENT}/${selectedPost?._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const updatedCommentData = [...comment, response.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id == selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        setText(" ");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-5xl  p-0 flex flex-col"
      >
        <div className="flex  w-full ">
          <div className="w-[600px] h-[600px]  ">
            <img
              className="w-full h-full  rounded-l-lg"
              src={selectedPost?.image}
              alt=""
            />
          </div>

          <div className="w-1/2 flex flex-col justify-between ">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage
                      className="rounded-full"
                      src={selectedPost?.author?.profilePicture}
                      alt="post_image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>

                <div>
                  <Link className="font-semibold text-xs">
                    {selectedPost?.author?.username}
                  </Link>
                  {/* <span className="text-gray-600 text-sm">Bio here....</span> */}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>

                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="cursor-pointer  text-[#E04956] font-bold">
                    Unfollow
                  </div>
                  <div className="cursor-pointer  text-[#E04956] font-bold">
                    Add to Favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr className="mt-2" />

            <div className="flex flex-col justify-between h-full">
              <div className="flex-1 overflow-y-auto max-h-96 px-6 py-2 ">
                {comment?.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </div>

              <div className="p-4 ">
                <div className="flex gap-3">
                  <input
                    type="text"
                    onChange={changeEventListener}
                    placeholder="Add a Comment"
                    className="w-full outline-none border border-gray-300 p-2 rounded text-sm"
                    value={text}
                  />
                  <Button
                    disabled={!text.trim()}
                    onClick={sendComment}
                    variant="outline"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
