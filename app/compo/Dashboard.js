"use client";
import { ShoppingCart, Printer, Bell, CreditCard } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Data for the sales report graph
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Months
    datasets: [
      {
        label: 'Sales ($)',
        data: [4000, 5000, 3000, 7000, 9000, 6500, 8000], // Sales data
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true, // To fill the area under the line
        tension: 0.1,
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales Report',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.raw.toLocaleString()}`; // Format numbers with commas and dollar sign
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString()}`; // Format the y-axis values with dollar sign
          },
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen p-6 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
          Settings
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Card with Graph */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex flex-col justify-between w-full">
            {/* Sales Data Card */}
            <div>
              <p className="text-2xl font-bold">$9,568</p>
              <span className="text-red-500 text-sm">▼ 8.6%</span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Average Weekly Sales</p>
            </div>

            {/* Sales Report Graph */}
            <div className="w-full mt-4">
              <Line data={salesData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Stats Cards - 2x2 Grid in the Same Row as Sales Card */}
        <div className="grid grid-cols-2 gap-4 w-full border border-gray-300 dark:border-gray-600">
          <Card icon={<ShoppingCart className="text-blue-400" />} value="85,246" label="Orders" />
          <Card icon={<Printer className="text-green-400" />} value="$96,147" label="Income" />
          <Card icon={<Bell className="text-red-400" />} value="846" label="Notifications" />
          <Card icon={<CreditCard className="text-blue-400" />} value="$84,472" label="Payment" />
        </div>
      </div>
    </div>
  );
}

// Manual Card Component with Compact Style
function Card({ icon, value, label }) {
  return (
    <div className="bg-white dark:bg-gray-700 flex items-center p-4 shadow-md w-full border-t border-r border-gray-300 dark:border-gray-600">
      <div className="mr-3">{icon}</div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
      </div>
    </div>
  );
}
