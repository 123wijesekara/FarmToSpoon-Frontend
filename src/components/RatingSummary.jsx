import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RatingSummary = () => {
  const { itemId } = useParams(); // ← Get item ID from URL
  const [summary, setSummary] = useState({ averageRating: 0, total: 0 });

  useEffect(() => {
    const fetchRatings = async () => {
      const res = await axios.get(`http://localhost:5000/api/ratings/${itemId}`);
      setSummary(res.data);
    };
    fetchRatings();
  }, [itemId]);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-2">Rating Summary</h2>
      <p>⭐ {summary.averageRating} / 5 ({summary.total} reviews)</p>
    </div>
  );
};

export default RatingSummary;
