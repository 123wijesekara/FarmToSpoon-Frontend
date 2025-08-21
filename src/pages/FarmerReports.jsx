import React, { useEffect, useState } from 'react';
import { TrendingUp, Package, Star, Award, Calendar, DollarSign, ShoppingCart, FileText, Table, ChevronLeft, ChevronRight } from 'lucide-react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { exportReportToExcel, exportReportToPDF } from '../utils/exportsUtils';

const FarmerReports = () => {
  const [report, setReport] = useState(null);
  const [range, setRange] = useState("monthly");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableYears, setAvailableYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    
    // Generate available years (last 5 years and next 1 year)
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 1; i++) {
      years.push(i);
    }
    setAvailableYears(years);
  }, []);

  const fetchReport = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getSalesReport,
        data: { 
          farmerId: userId, 
          range,
          month: range === "monthly" || range === "yearly" ? month : undefined,
          year: range === "yearly" ? year : undefined
        }
      });
      if (response.data.success) {
        setReport(response.data.data);
        setCurrentPage(1); // Reset to first page when report changes
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [range, month, year, userId]);

  const getRangeLabel = () => {
    if (range === "daily") return 'Today';
    if (range === "weekly") return 'This Week';
    if (range === "monthly") {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      return `${monthNames[month - 1]} ${year}`;
    }
    if (range === "yearly") return `Year ${year}`;
    return range;
  };

  const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars 
                ? 'fill-yellow-400 text-yellow-400' 
                : i === fullStars && hasHalfStar
                ? 'fill-yellow-200 text-yellow-400'
                : 'fill-gray-200 text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const exportToPDF = () => {
    exportReportToPDF(report, range, month, year);
  };
  
  const exportToExcel = () => {
    exportReportToExcel(report, range, month, year);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Pagination for products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = report?.topProducts?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  const totalPages = Math.ceil((report?.topProducts?.length || 0) / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#D8F6B6' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="p-3 rounded-xl mr-4" style={{ backgroundColor: '#538c11' }}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: '#2c3e50' }}>
                  Sales Dashboard
                </h1>
                <p style={{ color: '#34495e' }} className="mt-1">Track your farm's performance</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Export Buttons */}
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <button
                  onClick={exportToPDF}
                  className="flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-md"
                  style={{ 
                    backgroundColor: '#dc2626',
                    color: 'white'
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </button>
                <button
                  onClick={exportToExcel}
                  className="flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-md"
                  style={{ 
                    backgroundColor: '#16a34a',
                    color: 'white'
                  }}
                >
                  <Table className="w-4 h-4 mr-2" />
                  Export Excel
                </button>
              </div>
              
              {/* Date Range Selector */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" style={{ color: '#7f8c8d' }} />
                  <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="bg-white border-2 rounded-xl px-4 py-2 font-medium focus:outline-none focus:ring-2 transition-all duration-200 hover:border-opacity-70"
                    style={{ 
                      borderColor: '#a4e25e',
                      color: '#2c3e50'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#538c11'}
                    onBlur={(e) => e.target.style.borderColor = '#a4e25e'}
                  >
                    <option value="daily">Daily Report</option>
                    <option value="weekly">Weekly Report</option>
                    <option value="monthly">Monthly Report</option>
                    <option value="yearly">Yearly Report</option>
                  </select>
                </div>

                {(range === "monthly" || range === "yearly") && (
                  <div className="flex items-center space-x-2">
                    <select
                      value={month}
                      onChange={(e) => setMonth(parseInt(e.target.value))}
                      className="bg-white border-2 rounded-xl px-4 py-2 font-medium focus:outline-none focus:ring-2 transition-all duration-200 hover:border-opacity-70"
                      style={{ 
                        borderColor: '#a4e25e',
                        color: '#2c3e50'
                      }}
                    >
                      {monthNames.map((name, index) => (
                        <option key={index} value={index + 1}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {range === "yearly" && (
                  <div className="flex items-center space-x-2">
                    <select
                      value={year}
                      onChange={(e) => setYear(parseInt(e.target.value))}
                      className="bg-white border-2 rounded-xl px-4 py-2 font-medium focus:outline-none focus:ring-2 transition-all duration-200 hover:border-opacity-70"
                      style={{ 
                        borderColor: '#a4e25e',
                        color: '#2c3e50'
                      }}
                    >
                      {availableYears.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 rounded-full animate-spin" style={{ borderColor: '#a4e25e' }}></div>
              <div className="w-16 h-16 border-4 rounded-full animate-spin absolute top-0 left-0 border-t-transparent" style={{ borderColor: '#538c11' }}></div>
            </div>
            <p className="ml-4 text-lg font-medium" style={{ color: '#34495e' }}>Generating your report...</p>
          </div>
        ) : report ? (
          <div className="space-y-6">
            {/* Report Period Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 text-center">
              <h2 className="text-2xl font-bold" style={{ color: '#538c11' }}>
                {getRangeLabel()}
              </h2>
              <p className="text-gray-600 mt-1">Sales Report Period</p>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Sales Card */}
              <div className="rounded-2xl shadow-xl p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #538c11 0%, #2e4d0a 100%)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                      <DollarSign className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <p className="text-white text-opacity-80 text-sm font-medium">Total Sales</p>
                      <p className="text-white text-opacity-60 text-xs">{getRangeLabel()}</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2">Rs {report.totalSales.toLocaleString()}</div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Revenue Performance</span>
                  </div>
                </div>
              </div>

              {/* Total Orders Card */}
              <div className="rounded-2xl shadow-xl p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #a4e25e 0%, #538c11 100%)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <p className="text-white text-opacity-80 text-sm font-medium">Total Orders</p>
                      <p className="text-white text-opacity-60 text-xs">{getRangeLabel()}</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{report.totalOrders.toLocaleString()}</div>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Orders Processed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Average Order Value */}
            {report.totalOrders > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 rounded-xl mr-4" style={{ background: 'linear-gradient(135deg, #a4e25e 0%, #538c11 100%)' }}>
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: '#2c3e50' }}>Average Order Value</h3>
                      <p style={{ color: '#34495e' }} className="text-sm">Per order revenue</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: '#538c11' }}>
                      Rs {(report.totalSales / report.totalOrders).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </div>
                    <p className="text-sm" style={{ color: '#7f8c8d' }}>per order</p>
                  </div>
                </div>
              </div>
            )}

            {/* Top Selling Products by Revenue */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl mr-4" style={{ background: 'linear-gradient(135deg, #2e4d0a 0%, #538c11 100%)' }}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: '#2c3e50' }}>Top Selling Products</h3>
                    <p style={{ color: '#34495e' }}>Your best performers by revenue</p>
                  </div>
                </div>
                
                {/* Products per page selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm" style={{ color: '#34495e' }}>Show:</span>
                  <select
                    value={productsPerPage}
                    onChange={(e) => setProductsPerPage(parseInt(e.target.value))}
                    className="bg-white border-2 rounded-xl px-2 py-1 font-medium focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{ 
                      borderColor: '#a4e25e',
                      color: '#2c3e50'
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
              
              {report.topProducts && report.topProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentProducts.map((product, index) => {
                      const globalIndex = (currentPage - 1) * productsPerPage + index;
                      return (
                        <div key={product._id} className="rounded-xl p-4 border hover:shadow-lg transition-all duration-300 hover:-translate-y-1" 
                             style={{ 
                               backgroundColor: '#f8fdf4',
                               borderColor: '#a4e25e'
                             }}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm`}
                                   style={{ 
                                     backgroundColor: globalIndex === 0 ? '#538c11' : 
                                                     globalIndex === 1 ? '#7f8c8d' : 
                                                     globalIndex === 2 ? '#a4e25e' : 
                                                     '#95a5a6'
                                   }}>
                                {globalIndex + 1}
                              </div>
                            </div>
                            <Package className="w-5 h-5" style={{ color: '#7f8c8d' }} />
                          </div>
                          <h4 className="font-semibold mb-2" style={{ color: '#2c3e50' }}>{product.name}</h4>
                          <div className="mb-2">
                            <span className="text-sm font-medium" style={{ color: '#538c11' }}>
                              Rs {product.revenue.toLocaleString()}
                            </span>

                            <span className="text-xs text-gray-500 ml-2">
  ({product.quantity} {product.measurementType === 'kg' ? 'Kg' : 'units'} sold)
</span>

                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm" style={{ color: '#34495e' }}>Revenue Leader</span>
                            {globalIndex < 3 && (
                              <div className="px-2 py-1 rounded-full text-xs font-medium"
                                   style={{
                                     backgroundColor: globalIndex === 0 ? '#D8F6B6' : 
                                                     globalIndex === 1 ? '#e8e9ea' : 
                                                     '#f0f9e7',
                                     color: globalIndex === 0 ? '#2e4d0a' :
                                            globalIndex === 1 ? '#2c3e50' :
                                            '#538c11'
                                   }}>
                                #{globalIndex + 1}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-6 space-x-2">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => paginate(page)}
                          className={`w-8 h-8 rounded-full ${currentPage === page ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  
                  <div className="text-center mt-4 text-sm text-gray-500">
                    Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, report.topProducts.length)} of {report.topProducts.length} products
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-16 h-16 mx-auto mb-4" style={{ color: '#a4e25e' }} />
                  <p style={{ color: '#7f8c8d' }}>No products sold in this period</p>
                </div>
              )}
            </div>

            {/* Product Ratings */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl mr-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Product Ratings</h3>
                  <p className="text-gray-600">Customer satisfaction scores</p>
                </div>
              </div>
              
              {report.ratings && report.ratings.length > 0 ? (
                <div className="space-y-4">
                  {report.ratings.map((rating, index) => (
                    <div key={rating._id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">{rating.productName}</h4>
                          <div className="flex items-center space-x-4">
                            {getStarRating(rating.avgRating)}
                            <span className="text-sm text-gray-600">
                              ({rating.totalRatings} review{rating.totalRatings !== 1 ? 's' : ''})
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            rating.avgRating >= 4.5 ? 'text-green-600' :
                            rating.avgRating >= 4.0 ? 'text-blue-600' :
                            rating.avgRating >= 3.5 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {rating.avgRating.toFixed(1)}
                          </div>
                          <div className={`w-20 h-2 rounded-full mt-2 ${
                            rating.avgRating >= 4.5 ? 'bg-green-200' :
                            rating.avgRating >= 4.0 ? 'bg-blue-200' :
                            rating.avgRating >= 3.5 ? 'bg-yellow-200' :
                            'bg-red-200'
                          }`}>
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                rating.avgRating >= 4.5 ? 'bg-green-500' :
                                rating.avgRating >= 4.0 ? 'bg-blue-500' :
                                rating.avgRating >= 3.5 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${(rating.avgRating / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No ratings available for this period</p>
                </div>
              )}
            </div>

            {/* Performance Insights */}
            {report.ratings && report.ratings.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg mr-3">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  Performance Insights
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {(report.ratings.reduce((acc, r) => acc + r.avgRating, 0) / report.ratings.length).toFixed(1)}
                      </div>
                      <p className="text-sm text-blue-700 font-medium">Avg Rating</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{report.topProducts.length}</div>
                      <p className="text-sm text-green-700 font-medium">Products Sold</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {report.ratings.reduce((acc, r) => acc + r.totalRatings, 0)}
                      </div>
                      <p className="text-sm text-purple-700 font-medium">Total Reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
            <p className="text-gray-500">Select a different time range to view your sales report</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerReports;