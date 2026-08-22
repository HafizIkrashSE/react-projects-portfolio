import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(starNumber) {
    setRating(starNumber);
  }

  function handleMouseEnter(starNumber) {
    setHover(starNumber);
  }

  function handleMouseLeave() {
    setHover(0);
  }

  return (
    <div className="star-rating">
      <h1>Star Rating Project</h1>

      <div className="stars">
        {[...Array(noOfStars)].map((_, index) => {
          const starNumber = index + 1;

          return (
            <FaStar
              key={starNumber}
              size={40}
              className={
                starNumber <= (hover || rating) ? "active" : "inactive"
              }
              onClick={() => handleClick(starNumber)}
              onMouseEnter={() => handleMouseEnter(starNumber)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>

      <p>
        {rating === 0 ? "Select a rating" : `You rated this ${rating} stars`}
      </p>
    </div>
  );
}