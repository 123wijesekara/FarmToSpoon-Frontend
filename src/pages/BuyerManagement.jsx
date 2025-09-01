import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { cn } from "../utils/cn";

const BuyerManagement = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Suspended: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium border ${
          statusColors[status] || statusColors.pending
        }`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
      </span>
    );
  };

  const fetchBuyerData = async () => {
    setLoading(true);
    try {
      const response = await Axios(SummaryApi.getAllBuyers);
     
      if (response.data.success && Array.isArray(response.data.data)) {
        setBuyers(response.data.data);
      } else {
        setBuyers([]);
      }
    } catch (error) {
      console.error("Error fetching buyers:", error);
      setBuyers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyerData();
  }, []);

  const filteredBuyers = buyers.filter((buyer) =>
    buyer.buyerId?.toLowerCase().includes(searchId.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Buyer Management</h1>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by Buyer ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Buyer Id</th>
              <th className="p-2 border">Buyer Name</th>
              <th className="p-2 border">Profile</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Contact Number</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredBuyers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No buyers found
                </td>
              </tr>
            ) : (
              filteredBuyers.map((buyer) => (
                <tr
                  key={buyer.buyerId}
                  className={cn("border-b hover:bg-gray-50")}
                >
                  <td
                    className="p-2 border  cursor-pointer"
                    onClick={() =>
                      navigate(`/buyer/${buyer.buyerId}`)
                    }
                  >
                    {buyer.buyerId}
                  </td>
                  <td className="p-2 border">{buyer.name}</td>
                  <td className="p-2 border">
                    <img
                      src={buyer.image || "/default-avatar.png"}
                      alt={buyer.name}
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-2 border">{buyer.district}</td>
                  <td className="p-2 border">{buyer.contact}</td>
                  <td className="p-2 border">{getStatusBadge(buyer.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerManagement;
