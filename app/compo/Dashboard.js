"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, ShoppingCart, DollarSign } from "lucide-react";

const salesData = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 18000 },
  { name: "Mar", revenue: 14000 },
  { name: "Apr", revenue: 20000 },
  { name: "May", revenue: 22000 },
  { name: "Jun", revenue: 25000 },
];

const orders = [
  { id: "#12456", status: "Completed", amount: "$89.99", color: "text-green-500" },
  { id: "#12457", status: "Pending", amount: "$125.49", color: "text-yellow-500" },
  { id: "#12458", status: "Cancelled", amount: "$45.00", color: "text-red-500" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 grid gap-6 lg:grid-cols-3 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Stats Cards */}
      {[
        { title: "Sales", value: "$128,590", change: "+12%", Icon: DollarSign, color: "text-green-500" },
        { title: "Orders", value: "1,540", change: "+8%", Icon: ShoppingCart, color: "text-blue-500" },
        { title: "Customers", value: "12,875", change: "+5%", Icon: Users, color: "text-purple-500" },
      ].map(({ title, value, change, Icon, color }, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all flex justify-between items-center border border-gray-200 dark:border-gray-800"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{change} from last month</p>
          </div>
          <Icon className={`w-10 h-10 ${color}`} />
        </div>
      ))}

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md col-span-3 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Revenue Overview</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis dataKey="name" stroke="#888888" tick={{ fill: "currentColor" }} />
              <YAxis stroke="#888888" tick={{ fill: "currentColor" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1E293B", color: "#ffffff", borderRadius: "8px" }} />
              <Bar dataKey="revenue" fill="url(#gradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md col-span-3 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {orders.map(({ id, status, amount, color }, index) => (
            <div
              key={index}
              className="flex justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">{id}</span>
              <span className={`text-sm ${color} font-semibold`}>{status}</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
