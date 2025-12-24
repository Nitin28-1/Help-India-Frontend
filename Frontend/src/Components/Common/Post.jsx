import React, { useState } from "react";
import { Button } from "../ui/button";
import { Bookmark, MessageCircle, MoreHorizontalIcon } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import CommentDialog from "./CommentDialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { DeletePost, likeAndUnlikePost } from "@/Services/Operations/Post";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { apiconnector } from "@/Services/apiconnector";
import { toast } from "sonner";
import { postOperation, userOperation } from "@/Services/apis";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { setAuthUser } from "@/redux/authSlice";
import FollowBtn from "../Core/FollowBtn";

const { COMMENT, BOOKMARK } = postOperation;
const {SUPPORTORUNSUPPORT}=userOperation

const Post = ({ post }) => {
  // ✅ Prevent crashing if post is null/undefined
  if (!post || !post._id) {
    console.warn("Invalid post:", post);
    return null;
  }

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post?.likes?.length || 0);
  const [comment, setComment] = useState(post?.comments || []);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const tempValue = e.target.value;
    if (tempValue.trim()) setText(tempValue);
  };

  const likeAndDislikeHandle = async () => {
    const action = liked ? "dislike" : "like";
    const response = await likeAndUnlikePost(post._id, action);
    if (response) {
      const updatedLike = liked ? postLike - 1 : postLike + 1;
      setPostLike(updatedLike);
      setLiked(!liked);

      const updatedPost = posts.map((p) =>
        p._id === post._id
          ? {
              ...p,
              likes: liked
                ? p.likes.filter((id) => id !== user._id)
                : [...p.likes, user._id],
            }
          : p
      );
      
      dispatch(setPosts(updatedPost));
    }
  };

  const commentHandler = async () => {
    try {
      const response = await apiconnector(
        "POST",
        `${COMMENT}/${post._id}/comment`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const updatedCommentData = [...comment, response.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(response.data.message);
        setText("");
      }
    } catch (error) {
      //(error);
      toast.error("Failed to post comment");
    }
  };

  const DeletePosthandler = async () => {
    const res = await DeletePost(post._id);
    if (res) {
      const updatedPost = posts.filter((item) => item._id !== post._id);
      dispatch(setPosts(updatedPost));
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await apiconnector(
        "GET",
        `${BOOKMARK}/${post._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      //(error);
      toast.error("Post Bookmark Failed");
    }
  };


  


  return (
    <div className="my-6 w-[350px] xl:w-[40%] lg:flex-none p-2 rounded-lg bg-white">
      {/* Top Header */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-4">
            <h1>{post.author?.username}</h1>
            {user?._id === post.author?._id && (
              <Badge className="bg-white" variant="secondary">
                Author
              </Badge>
            )}
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontalIcon className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {post.author?._id !== user?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#E04956] font-bold">
                <FollowBtn SupporterId={user._id}  targetUser={post.author?._id}  />
              </Button>
            )}
            <Button variant="ghost" className="cursor-pointer w-fit font-bold">
              Add To Favorite
            </Button>
            {user && user._id === post.author?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#E04956] font-bold"
                onClick={DeletePosthandler}
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Post Image */}
      <img
        src={post.image}
        className="aspect-square object-cover rounded-[10px] my-2 w-full"
        alt="post"
      />

      {/* Icons */}
      <div className="px-1 py-2">
        <div className="flex items-center justify-between my-2">
          {liked ? (
            <FaHeart
              size={19}
              onClick={likeAndDislikeHandle}
              className="cursor-pointer text-white box-content p-3 rounded-xl w-[15%] bg-[#0161FE]"
            />
          ) : (
            <FaRegHeart
              size={19}
              onClick={likeAndDislikeHandle}
              className="cursor-pointer text-black box-content p-3 rounded-xl w-[15%] bg-[#F7F7F7]"
            />
          )}

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer text-black box-content p-3 rounded-xl w-[15%] bg-[#F7F7F7]"
          />
          <FiSend
            size={19}
            className="cursor-pointer text-black box-content p-3 rounded-xl w-[15%] bg-[#F7F7F7]"
          />
          <Bookmark
            onClick={bookmarkHandler}
            size={19}
            className="cursor-pointer text-black box-content p-3 rounded-xl w-[15%] bg-[#F7F7F7]"
          />
        </div>
      </div>

      {/* Likes and Comments */}
      <div className="px-2 py-2">
        <span className="font-medium block mb-2 ml-1">{postLike} LIKES</span>
        <p className="mb-1 ml-1">
          <span className="font-medium mr-2">{post.author?.username}</span>
          {post.caption}
        </p>

        {comment.length > 0 && (
          <span
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="text-gray-600 ml-1 cursor-pointer"
          >
            View All {comment.length} Comments
          </span>
        )}

        {/* Add comment */}
        <div className="flex items-center gap-2 mt-2 justify-between">
          <Input
            type="text"
            placeholder="Add a comment...."
            onChange={changeEventHandler}
            value={text}
            className="outline-none w-full text-sm"
          />
          {text && (
            <span
              onClick={commentHandler}
              className="text-[#1f1fa3] cursor-pointer"
            >
              Post
            </span>
          )}
        </div>

        {/* Comment dialog */}
        {open && (
          <div className="absolute z-10 w-[40%] rounded-xl mt-[-30%] bg-slate-100">
            <CommentDialog setOpen={setOpen} open={open} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
