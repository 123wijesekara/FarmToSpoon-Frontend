 // components/FarmerReport.jsx
import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import SummaryApi from '../common/SummaryApi'; 
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const FarmerReport = ({ userId }) => {
  const [range, setRange] = useState("monthly");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getSalesReport,
        data: { farmerId: userId, range }
      });

      if (response.data.success) {
        setReport(response.data.data);
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
    const interval = setInterval(fetchReport, 10000);
    return () => clearInterval(interval);
  }, [range, userId]);

  if (loading) return <div className="p-4">Loading reports...</div>;
  if (!report) return <div className="p-4">No report data available</div>;

  // ✅ Line Chart
  const lineData = {
    labels: report.salesByDate.map(d => `${d._id.year}-${d._id.month}-${d._id.day}`),
    datasets: [
      {
        label: "Total Sales (LKR)",
        data: report.salesByDate.map(d => d.totalSales),
        fill: false,
        borderColor: "#538c11",
        backgroundColor: "#a4e25e",
        tension: 0.3
      }
    ]
  };

  // ✅ Bar Chart
  const barData = {
    labels: report.salesByDate.map(d => `${d._id.year}-${d._id.month}-${d._id.day}`),
    datasets: [
      {
        label: "Total Orders",
        data: report.salesByDate.map(d => d.totalOrders),
        backgroundColor: "#538c11"
      }
    ]
  };

  // ✅ Pie Chart - use backend sales count
  const pieData = {
    labels: report.topProducts.map(p => p.name),
    datasets: [
      {
        label: "Top Products Sold",
        data: report.topProducts.map(p => p.sales || 0),
        backgroundColor: ["#538c11", "#a4e25e", "#7f8c8d", "#95a5a6", "#2e4d0a"]
      }
    ]
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold text-gray-800">Sales Reports</h2>

      {/* Range Selector */}
      <div className="flex gap-2 mb-4">
        {["daily", "weekly", "monthly", "yearly"].map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 rounded ${range === r ? "bg-green-700 text-white" : "bg-gray-200"}`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Sales Over Time</h3>
        <Line data={lineData} />
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Orders Over Time</h3>
        <Bar data={barData} />
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Top Selling Products</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default FarmerReport;
