import { useState, useEffect } from "react";
import Image from "next/image";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Customer() {
  const [customer, setCustomer] = useState({
    avatar: "/default-avatar.png",
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main Street, New York, NY",
  });

  const [orders, setOrders] = useState([
    { id: 101, date: "2025-02-20", status: "Delivered", total: 199.99 },
    { id: 102, date: "2025-02-15", status: "Shipped", total: 89.99 },
    { id: 103, date: "2025-02-10", status: "Processing", total: 149.99 },
  ]);

  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...customer });

  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Spending ($)",
        data: [200, 450, 300, 600, 350],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"],
      },
    ],
  });

  useEffect(() => {
    if (!editData.name) {
      setEditData((prev) => ({ ...prev, name: "John Doe (Suggested)" }));
    }
    if (!editData.address) {
      setEditData((prev) => ({ ...prev, address: "New York, NY (Suggested)" }));
    }
  }, [isEditing]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setCustomer(editData);
    setIsEditing(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCustomer({ ...customer, avatar: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold">👤 Customer Dashboard</h1>

        {/* Profile Section */}
        <div className="border-b pb-6 mt-6 flex items-center space-x-6">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <Image src={customer.avatar} alt="Avatar" width={80} height={80} className="rounded-full shadow" />
            <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
          </label>
          <div>
            <p className="text-lg font-semibold">{customer.name}</p>
            <p className="text-gray-600">{customer.email}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="mt-4 space-y-4">
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="Full Name"
            />
            <input
              type="email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="Email Address"
            />
            <input
              type="text"
              value={editData.address}
              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="Address"
            />
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-lg"><strong>Name:</strong> {customer.name}</p>
            <p className="text-lg"><strong>Email:</strong> {customer.email}</p>
            <p className="text-lg"><strong>Address:</strong> {customer.address}</p>
            <button
              onClick={handleEdit}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Order History with Search */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">📦 Order History</h2>
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full p-2 mb-4 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="space-y-4">
            {orders
              .filter((order) => order.id.toString().includes(search))
              .map((order) => (
                <div key={order.id} className="p-4 border rounded-lg shadow-sm">
                  <p className="text-lg font-semibold">Order #{order.id}</p>
                  <p className="text-gray-600">Date: {order.date}</p>
                  <p
                    className={`text-sm font-medium ${
                      order.status === "Delivered" ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    Status: {order.status}
                  </p>
                  <p className="text-lg font-bold">Total: ${order.total.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Spending Analytics */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">📊 Spending Analytics</h2>
          <div className="mt-4">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
