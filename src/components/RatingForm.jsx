import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import ReactStars from "react-rating-stars-component";  
import './RatingForm.css';




const RatingForm = ({ orderId, userId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRating = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.submitRating,
        data: {
          userId,
          orderId,
          rating,
          review,
        },
      
      });
         console.log("data",data)

      if (response.data.success) {
        toast.success("Rating submitted!");
        setRating(0);
        setReview("");
      } else {
        toast.error(response.data.message || "Failed to submit rating");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating-form">
      <ReactStars    count={5} size={30} value={rating} onChange={setRating} />
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave a review (optional)"
        rows={4}
      />
      <button onClick={submitRating} disabled={loading}>
        {loading ? "Submitting..." : "Submit Rating"}
      </button>
    </div>
  );
};

export default RatingForm;
