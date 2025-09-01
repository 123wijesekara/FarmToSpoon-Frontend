import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Swal from "sweetalert2";

const BuyerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("No buyer ID provided");
      setLoading(false);
      return;
    }

    const fetchBuyer = async () => {
      try {
        const response = await Axios.post(
          SummaryApi.getBuyerById.url.replace(":id", id)
        );

        if (response.data.success) {
          setBuyer(response.data.buyer);
        } else {
          setError("Buyer not found");
        }
      } catch (err) {
        console.error("Error fetching buyer:", err);
        setError("Failed to fetch buyer details");
      } finally {
        setLoading(false);
      }
    };

    fetchBuyer();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    setActionLoading(true);
    try {
      await Axios.delete(SummaryApi.deleteBuyer.url.replace(":id", id));
      await Swal.fire("Deleted!", "The buyer has been deleted.", "success");
      navigate("/dashboard/buyermanage");
    } catch (err) {
      console.error("Delete failed", err);
      await Swal.fire("Error!", "Failed to delete buyer.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSuspend = async () => {
    const action = buyer.status === "Suspended" ? "activate" : "suspend";
    const actionTitle = buyer.status === "Suspended" ? "Activate" : "Suspend";

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${action} this buyer?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (!result.isConfirmed) return;

    setActionLoading(true);
    try {
      await Axios.patch(SummaryApi.suspendBuyer.url.replace(":id", id));
      setBuyer((prev) => ({
        ...prev,
        status: prev.status === "Suspended" ? "Active" : "Suspended",
      }));
      await Swal.fire(
        `${actionTitle}d!`,
        `Buyer has been ${action}d.`,
        "success"
      );
    } catch (err) {
      console.error(`${action} failed`, err);
      await Swal.fire("Error!", `Failed to ${action} buyer.`, "error");
    } finally {
      setActionLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading buyer details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">{error}</p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/dashboard/buyermanage")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Back to Buyer Management
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!buyer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Buyer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate("/dashboard/buyermanage")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Buyer Management</h1>
            </div>
            {getStatusBadge(buyer.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <img
                src={buyer.avatar || buyer.image || "/default-avatar.png"}
                alt={buyer.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-gray-100"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{buyer.name}</h2>
              <p className="text-gray-600 mb-4">Buyer ID: {buyer.userId || buyer._id}</p>
            </div> 
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Buyer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                    <p className="text-gray-900 font-medium">{buyer.name || ''}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">District</label>
                    <p className="text-gray-900">{buyer.district || ''}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Contact</label>
                    <p className="text-gray-900">{buyer.mobile || buyer.contact || ''}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p className="text-gray-900">{buyer.email || ''}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                    {buyer.address_details && buyer.address_details.length > 0 ? (
                      <ul className="text-gray-900 list-disc ml-5">
                        {buyer.address_details.map((addr, index) => (
                          <li key={index}>
                            {addr.address_line}, {addr.city}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-900">No address available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex gap-3">
              <button
                onClick={handleSuspend}
                disabled={actionLoading}
                className={`px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center space-x-2 ${
                  buyer.status === "Suspended"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-700 text-white hover:bg-green-600"
                }`}
              >
                {actionLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>{buyer.status === "Suspended" ? "Activate" : "Suspend"}</span>
              </button>

              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                {actionLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDetails;
