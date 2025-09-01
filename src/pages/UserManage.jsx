import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { cn } from "../utils/cn";

const UserManagement = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  // Function to render status badge
  const getStatusBadge = (status) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Suspended: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status] || statusColors.pending}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'}
      </span>
    );
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const fetchFarmerData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getAllFarmers,
       
        data: { userId },
      });
      if (response.data.success && Array.isArray(response.data.data)) {
        setFarmers(response.data.data);
      } else {
        setFarmers([]);
      }
    } catch (error) {
      console.error("Error fetching farmers:", error);
      setFarmers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchFarmerData();
  }, [userId]);

  const filteredFarmers = farmers.filter((farmer) =>
    farmer.farmerId?.toLowerCase().includes(searchId.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Farmer Management</h1>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by Farmer ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Farmer Id</th>
              <th className="p-2 border">Farmer Name</th>
              <th className="p-2 border">Profile</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Contact Number</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">Loading...</td>
              </tr>
            ) : filteredFarmers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">No farmers found</td>
              </tr>
            ) : (
              filteredFarmers.map((farmer) => (
                <tr key={farmer.farmerId} className={cn("border-b hover:bg-gray-50")}>
                  <td
                    className="p-2 border text-black-600 cursor-pointer"
                    onClick={() => {
                      if (farmer?.farmerId) navigate(`/farmer/${farmer.farmerId}`);
                      else console.error("No farmer ID available");
                    }}
                  >
                    {farmer.farmerId}
                  </td>
                  <td className="p-2 border">{farmer.name}</td>
                  <td className="p-2 border">
                    <img
                      src={farmer.image}
                      alt={farmer.name}
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-2 border">{farmer.district}</td>
                  <td className="p-2 border">{farmer.contact}</td>
                  <td className="p-2 border">{getStatusBadge(farmer.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
