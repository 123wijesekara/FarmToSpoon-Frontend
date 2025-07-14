import React, { useState, useEffect } from "react";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import StarRating from "./StarRating";

import './RatingForm.css';

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); 

   useEffect(() => {
      const userId = localStorage.getItem("userId");   
      setUserId(userId);
    }, []);

 

  
  const submitRating = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setLoading(true);
      const orderId ="ORD-68641e161319b108c913dd05";
      
    
      
      const response = await Axios({
        
        ...SummaryApi.submitRating,
        data: {
          userId,
          orderId,
          rating,
          review,
        },
         
      });

       

      if (response.data.success) {
        toast.success("Rating submitted successfully!");
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
    <div className="rating-form max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Rate Your Order</h2>

      {/* Star Rating Component */}
      <StarRating onRate={setRating} initialRating={rating} />

      {/* Review Textarea */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave a review (optional)"
        rows={4}
        className="w-full border border-gray-300 rounded p-2 mt-4 mb-4"
      />

      {/* Submit Button */}
      <button
        onClick={submitRating}
        disabled={loading}
        className={`w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Submit Rating"}
      </button>
    </div>
  );
};

export default RatingForm;
