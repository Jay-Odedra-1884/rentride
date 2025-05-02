"use client";

import React, { useEffect } from "react";
import { getAllCommentById } from "../../actions/Comment";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";

const CommentDisplay = () => {
  const { id } = useParams();

  const {
    data: GetAllComments,
    loading: allCommentLoading,
    error,
    fn: getAllCommentByIdFn,
  } = useFetch(getAllCommentById);

  useEffect(() => {
    if (id) {
      getAllCommentByIdFn(id)
        .then(function (res) {
          console.log("Response from getAllCommentByIdFn", res);
        })
        .catch((err) => {
          console.error("The error is", err);
        });
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }, [error]);

  return (
    <div className="mt-4 space-y-4">
      {allCommentLoading ? (
        <p>Loading...</p>
      ) : GetAllComments?.length ? (
        GetAllComments.map((comment, index) => (
          <div
            key={index}
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

            <button className="text-sm text-white bg-red-500 hover:bg-red-600 px-3.5 rounded-lg cursor-pointer py-2 font-medium ml-5">
              Delete
            </button>
            
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentDisplay;
