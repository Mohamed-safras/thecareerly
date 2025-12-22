import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StarRatingProps {
  rating: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, className }) => {
  return (
    <React.Fragment>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-5 w-5",
            `${className} ${
              i < rating
                ? "fill-status-hold text-status-hold"
                : "text-muted-foreground/30"
            }`
          )}
        />
      ))}
    </React.Fragment>
  );
};

export default StarRating;
