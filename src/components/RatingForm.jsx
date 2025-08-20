import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
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
  const [orderId, setOrderId] = useState(null);
  const [alreadyRated, setAlreadyRated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    const oid = localStorage.getItem("selectedOrderId");
    setUserId(uid);
    setOrderId(oid);

    // Check if this order is already rated
    const checkRating = async () => {
      try {
        const res = await Axios({
          ...SummaryApi.checkOrderRating,
          data: { userId: uid, orderId: oid },
        });
        if (res.data.alreadyRated) setAlreadyRated(true);
      } catch (err) {
        console.log(err);
      }
    };
    checkRating();
  }, []);

  const submitRating = async () => {
    if (alreadyRated) {
      toast.error("You have already rated this order");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.submitRating,
        data: { userId, orderId, rating, review },
      });

      if (response.data.success) {
        toast.success("Rating submitted successfully!");
        setRating(0);
        setReview("");
        setAlreadyRated(true);

        setTimeout(() => navigate("/"), 1000);

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
    <div className="rating-form max-w-md mx-auto bg-white p-6 rounded shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Rate Your Order</h2>

      {alreadyRated && <p className="text-green-600 mb-4">✅ You already rated this order</p>}

      <StarRating onRate={setRating} initialRating={rating} disabled={alreadyRated} />

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave a review (optional)"
        rows={4}
        className="w-full border border-gray-300 rounded p-2 mt-4 mb-4"
        disabled={alreadyRated}
      />

      <button
        onClick={submitRating}
        disabled={loading || alreadyRated}
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
