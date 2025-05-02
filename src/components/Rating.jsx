"use client";

import { Star } from "lucide-react";
import { useState } from "react";

const StarRating = ({ totalStars = 5, value = 0, onChange }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const isFilled = (hovered ?? value) > index;

        return (
          <Star
            key={index}
            onMouseEnter={() => setHovered(index + 1)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(index + 1)}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              isFilled ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={isFilled ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
