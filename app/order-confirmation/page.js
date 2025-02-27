"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const OrderConfirmation = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching order details from a server or database
  useEffect(() => {
    const fetchOrderDetails = async () => {
      // In a real-world scenario, you would fetch this data from an API or database
      const orderData = {
        orderId: "12345",
        totalAmount: "$299.99",
        items: [
          { title: "Product A", quantity: 1, price: "$149.99" },
          { title: "Product B", quantity: 1, price: "$150.00" },
        ],
        shippingAddress: "123 Street, City, Country",
        paymentMethod: "Credit Card",
        estimatedDelivery: "March 10, 2025",
        status: "Confirmed",
      };

      setOrderDetails(orderData);
      setLoading(false);
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 dark:text-gray-400">Loading order details...</p>;
  }

  if (!orderDetails) {
    return <p className="text-center text-red-500">Order not found!</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white pt-24">
      <div className="max-w-3xl mx-auto p-8 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 space-y-6">
        <h2 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">Order Confirmed!</h2>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-4 bg-green-100 dark:bg-green-700 p-4 rounded-lg shadow-md text-green-600 dark:text-white"
        >
          <FaCheckCircle size={24} />
          <span className="text-lg font-semibold">Your order has been successfully placed!</span>
        </motion.div>

        {/* Order Summary */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-300 dark:border-gray-600">
                <span className="text-gray-800 dark:text-white">{item.title} x{item.quantity}</span>
                <span className="text-gray-700 dark:text-gray-300">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Shipping Address</h3>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{orderDetails.shippingAddress}</p>
        </div>

        {/* Payment Method */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Payment Method</h3>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{orderDetails.paymentMethod}</p>
        </div>

        {/* Estimated Delivery */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Estimated Delivery</h3>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{orderDetails.estimatedDelivery}</p>
        </div>

        {/* Total Amount */}
        <div className="mt-6 flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total</h3>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{orderDetails.totalAmount}</p>
        </div>

        {/* Order Tracking & Next Steps */}
        <div className="mt-6 flex flex-col items-center space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => router.push("/order-tracking")}
          >
            Track My Order
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() => router.push("/")}
          >
            Return to Store
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
