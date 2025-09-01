import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Swal from 'sweetalert2';

const FarmerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("No farmer ID provided");
      setLoading(false);
      return;
    }

    const fetchFarmer = async () => {
      try {
        const response = await Axios.post(
          SummaryApi.getFarmerById.url.replace(":id", id)
        );

        if (response.data.success) {
          setFarmer(response.data.farmer);
        } else {
          setError("Farmer not found");
        }
      } catch (err) {
        console.error("Error fetching farmer:", err);
        setError("Failed to fetch farmer details");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmer();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    setActionLoading(true);
    try {
      await Axios.delete(
        SummaryApi.deleteFarmer.url.replace(":id", id)
      );
      
      await Swal.fire(
        'Deleted!',
        'The farmer has been deleted.',
        'success'
      );
      
      navigate('/dashboard/usermanage');
    } catch (err) {
      console.error("Delete failed", err);
      await Swal.fire(
        'Error!',
        'Failed to delete farmer.',
        'error'
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleSuspend = async () => {
    const action = farmer.status === 'Suspended' ? 'activate' : 'suspend';
    const actionTitle = farmer.status === 'Suspended' ? 'Activate' : 'Suspend';
    
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${action} this farmer?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${action} it!`
    });

    if (!result.isConfirmed) return;

    setActionLoading(true);
    try {
      await Axios.patch(
        SummaryApi.suspendFarmer.url.replace(":id", id)
      );
      
      setFarmer(prev => ({
        ...prev,
        status: prev.status === 'Suspended' ? 'Active' : 'Suspended'
      }));
      
      await Swal.fire(
        `${actionTitle}d!`,
        `Farmer has been ${action}d.`,
        'success'
      );
    } catch (err) {
      console.error(`${action} failed`, err);
      await Swal.fire(
        'Error!',
        `Failed to ${action} farmer.`,
        'error'
      );
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Suspended: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-green-700 text-yellow-800 border-green-200"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status] || statusColors.pending}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading farmer details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
          <div className="mt-4">
            <button 
              onClick={() => navigate("/dashboard/usermanage")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Back to User Management
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Farmer not found</p>
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
                onClick={() => navigate("/dashboard/usermanage")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Farmer Management</h1>
            </div>
            {getStatusBadge(farmer.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <img
                  src={farmer.avatar || farmer.image || "/default-avatar.png"}
                  alt={farmer.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-gray-100"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{farmer.name}</h2>
                <p className="text-gray-600 mb-4">Farmer ID: {farmer.farmerId || farmer._id}</p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-blue-600 text-sm font-medium">Joined</p>
                    <p className="text-blue-900 font-semibold">
                      {farmer.createdAt ? new Date(farmer.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  {/* <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-green-600 text-sm font-medium">Orders</p>
                    <p className="text-green-900 font-semibold">{farmer.totalOrders || 0}</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Farmer Details</h3>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                      <p className="text-gray-900 font-medium">{farmer.name || ''}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">District</label>
                      <p className="text-gray-900">{farmer.district || ' '}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Contact</label>
                      <p className="text-gray-900">{farmer.mobile || farmer.contact || ''}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-gray-900">{farmer.email || ''}</p>
                    </div>
                    <div>
  <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
  {farmer.address_details && farmer.address_details.length > 0 ? (
    <ul className="text-gray-900 list-disc ml-5">
      {farmer.address_details.map((addr, index) => (
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
            </div>

            {/* Action Buttons */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSuspend}
                  disabled={actionLoading}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center space-x-2 ${
                    farmer.status === 'Suspended' 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-green-700 text-white hover:bg-green-600'
                  }`}
                >
                  {actionLoading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  <span>{farmer.status === 'Suspended' ? 'Activate' : 'Suspend'}</span>
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
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
    </div>
  );
};

export default FarmerDetails;