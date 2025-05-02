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
      getAllCommentByIdFn(id);
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
          <div key={index} className="p-4 bg-white rounded-xl shadow-sm">
            <p className="font-medium">Comment: {comment.msg}</p>
            <p className="text-sm text-gray-600">Rating: {comment.rating} </p>
            <p className="text-sm text-gray-500">By: {comment.user?.name}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentDisplay;
