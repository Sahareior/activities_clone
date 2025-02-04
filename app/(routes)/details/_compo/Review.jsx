import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating before submitting!");
      return;
    }
    console.log("Review Submitted:", { rating, review });
    alert("Thank you for your review!");
    setRating(0);
    setReview("");
  };

  return (
    <div className="w-full p-4 mt-4 mx-auto md:p-8 bg-[#FBFBFB] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Reviews Section */}
        <div className="space-y-4 border-r-2 pr-8 border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
          <div className="flex items-center justify-center h-40 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg font-medium">No reviews yet</p>
          </div>
        </div>

        {/* Review Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Share Your Feedback</h2>
            <p className="text-sm text-gray-500">
              Your email address will not be published. Required fields are marked *
            </p>
          </div>

          {/* Rating Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Rate this product *
            </label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={ratingValue} className="relative">
                    <input
                      type="radio"
                      className="sr-only"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      size={28}
                      className={`cursor-pointer transition-transform duration-150 ${
                        ratingValue <= (hover || rating)
                          ? "text-amber-400 scale-110"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Review Textarea */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Your Review *
            </label>
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all placeholder-gray-400 resize-none"
              placeholder="Share your experience with this product..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-80 bg-white text-black  py-3 px-6 rounded-lg font-semibold  hover:shadow-lg"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;