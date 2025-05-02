import { useEffect, useState } from "react";
import StarRating from "./Rating";
import useFetch from "@/hooks/useFetch";
import { createComment } from "../../actions/Comment";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const CommentBox = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const { id } = useParams();
  const router = useRouter();

  const {
    data: NewComment,
    loading: creatCommentLoading,
    error,
    fn: createCommentFn,
  } = useFetch(createComment);

  const handleCommentSubmit = async () => {
    if (comment) {
      try {
        await createCommentFn({ msg: comment, rating, vehicleId: id });
        toast.success("Comment created");
        setComment("");
        setRating(0);
        router.refresh();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }, [error]);

  return (
    <div className="mt-6 border rounded-xl px-4 py-4 space-y-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Your Rating:</span>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comments here..."
          className="text-lg w-full bg-transparent border-none focus:outline-none"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-600 cursor-pointer px-4 py-2 rounded-xl text-white hover:bg-blue-700 transition"
        >
          {creatCommentLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
