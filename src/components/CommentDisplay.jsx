"use client";

import React, { useEffect,useState } from "react";
import { deleteComment, getAllCommentById } from "../../actions/Comment";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { SyncLoader } from "react-spinners";

const CommentDisplay = ({ currentUserClerkId }) => {
  const { id:PostId } = useParams();
  const [deletingId, setDeletingId] = useState(null);

  const {
    data: GetAllComments,
    loading: allCommentLoading,
    error,
    fn: getAllCommentByIdFn,
  } = useFetch(getAllCommentById);

  useEffect(() => {
    if (PostId) {
      getAllCommentByIdFn(PostId)
        .then(function (res) {
          console.log("Response from getAllCommentByIdFn", res);
        })
        .catch((err) => {
          console.error("The error is", err);
        });
    }
  }, [PostId]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }, [error]);

  //deleting comments

  const {
    data: deletedComment,
    loading: commentDeleteLoading,
    error: commentDeletionError,
    fn: deleteCommentFn,
  } = useFetch(deleteComment);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
     const data = await deleteCommentFn(id);
     console.log("here is data in commentDisplay",data);
      if (data.status == true) {
       toast.success("Comment Deleted!!");
       await getAllCommentByIdFn(PostId);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (commentDeletionError) {
      toast.error(commentDeletionError.message);
    }
  }, [commentDeletionError]);

  return (
    <div className="mt-4 space-y-4">
      {allCommentLoading ? (
        <div className="m-3 h-4 w-full flex items-center justify-center">
          {" "}
          <SyncLoader color="#3b82f6" height={6} width={150} />
        </div>
      ) : GetAllComments?.length ? (
        GetAllComments.map((comment) => {
          return (
            <div
              key={comment.id}
              className="flex items-start gap-4 p-4 bg-white rounded-xl shadow border"
            >
              <img
                src={comment.user.imageUrl}
                className="w-10 h-10 rounded-full border"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">
                    {comment.user.name}
                  </p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    {comment.rating}⭐
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-lg mt-1">{comment.msg}</p>
                </div>
              </div>
              {comment.user.clerkUserId == currentUserClerkId && (
                <button
                  className="text-sm text-white bg-red-500 hover:bg-red-600 px-3.5 rounded-lg cursor-pointer py-2 font-medium ml-5"
                  onClick={() => handleDelete(comment.id)}
                  disabled={deletingId === comment.id}
                >
                  {/* {commentDeleteLoading ? "Deleting..." : "Delete"} */}
                  {deletingId === comment.id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          );
        })
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentDisplay;
