 
import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { cn } from '../utils/cn';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

 useEffect(() => {
     const userId = localStorage.getItem("userId");   
     setUserId(userId);
   }, 
   []);
   

  const fetchStockData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
        console.log("Received userId:", userId);
      const response = await Axios({
       
        ...SummaryApi.getAllProducts,
        data: { userId },
        
      });
console.log("userId:", userId);

      const { data: responseData } = response;

      if (responseData.success && Array.isArray(responseData.data)) {
        const stockData = responseData.data.map(product => ({
          _id: product._id,
          name: product.name,
          image: product.image,
          location: product.location || "",
          availableStock: product.stock || 0,
          isOutOfStock: product.stock === 0,
        }));
        setProducts(stockData);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchStockData();
  }, [userId]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Stock Management</h1>
      <div className="overflow-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border text-left">Name</th>
              <th className="p-2 border text-left">Location</th>
              <th className="p-2 border text-right">Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">Loading...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">No products found</td>
              </tr>
            ) : (
              products.map(product => (
                <tr
                  key={product._id}
                  className={cn(
                    "border-b hover:bg-gray-50",
                    product.isOutOfStock && "bg-red-100 text-red-700"
                  )}
                >
                  <td className="p-2 border">
                    <img
                      src={product.image?.[0] || ''}
                      alt={product.name}
                      className="h-12 w-12 object-contain"
                    />
                  </td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.location}</td>
                  <td className="p-2 border text-right">{product.availableStock}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockManagement;
