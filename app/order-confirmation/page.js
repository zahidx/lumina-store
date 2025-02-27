"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "../compo/Api/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaCreditCard, FaPaypal } from "react-icons/fa";

// Reusable component for order progress steps
const OrderProgressStep = ({ step, title, description }) => (
  <li className="mb-8 flex items-center">
    <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full z-10">
      {step}
    </div>
    <div className="ml-6">
      <p className="text-lg font-medium text-gray-900 dark:text-white">{title}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </li>
);

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("productId");
  const quantityParam = searchParams.get("quantity") || "1";
  const paymentMethodParam = searchParams.get("paymentMethod") || "credit";
  const totalPriceParam = searchParams.get("totalPrice") || "0.00";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (productId) {
      try {
        const docRef = doc(db, "electronics", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Product not found!");
        }
        setOrderNumber("ORD-" + Math.floor(Math.random() * 1000000));
        const now = new Date();
        setOrderDate(now.toLocaleString());
        const deliveryDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
        setEstimatedDelivery(deliveryDate.toLocaleDateString());
      } catch (error) {
        setError("Error fetching product: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <p className="mt-10 text-center text-gray-600 dark:text-gray-400">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-10 text-center text-red-500">{error}</p>
    );
  }

  const quantity = parseInt(quantityParam, 10);
  const PaymentIcon = paymentMethodParam === "paypal" ? FaPaypal : FaCreditCard;

  return (
    <main className="min-h-screen mt-10 bg-gray-100 dark:bg-[#111827] py-12 px-4 sm:px-6 lg:px-8">
      <motion.article
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
      >
        {/* Confirmation Header */}
        <header className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-7xl mb-4" aria-hidden="true" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </header>

        {/* Order Details */}
        <section className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
              Order Number
            </span>
            <span className="block text-lg font-semibold text-gray-900 dark:text-white">
              {orderNumber}
            </span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
              Order Date
            </span>
            <span className="block text-lg font-semibold text-gray-900 dark:text-white">
              {orderDate}
            </span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
              Estimated Delivery
            </span>
            <span className="block text-lg font-semibold text-gray-900 dark:text-white">
              {estimatedDelivery}
            </span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
              Payment Method
            </span>
            <div className="flex items-center space-x-1">
              <PaymentIcon className="text-2xl text-gray-900 dark:text-white" aria-hidden="true" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {paymentMethodParam === "paypal" ? "PayPal" : "Credit Card"}
              </span>
            </div>
          </div>
        </section>

       {/* Order Summary */}
<section className="mt-8">
  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
    Order Summary
  </h2>
  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Product Info */}
    <div className="flex items-center space-x-6">
      <img
        src={product.image}
        alt={product.title || "Product image"}
        className="w-16 h-12 object-cover rounded-md shadow-md"
        loading="lazy" // Lazy loading
      />
      <div>
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          {product.title}
        </p>
      </div>
    </div>

    {/* Price Info */}
    <div className="flex flex-col items-start sm:items-end sm:flex-row sm:justify-end sm:space-x-6 mt-4 sm:mt-0">
      <div className="flex flex-col sm:items-end">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Quantity: {quantity}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Unit Price: ${product.price}
        </p>
        <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
          Total: ${totalPriceParam}
        </p>
      </div>
    </div>
  </div>
</section>


        {/* Order Progress Timeline */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Order Progress
          </h2>
          <div className="relative">
            <div className="border-r-2 border-gray-200 dark:border-gray-600 absolute h-full top-0 left-4"></div>
            <ul className="list-none m-0 p-0">
              {[
                { step: 1, title: "Order Placed", description: "We received your order" },
                { step: 2, title: "Processing", description: "Your order is being processed" },
                { step: 3, title: "Shipped", description: "Your order has been shipped" },
                { step: 4, title: "Out for Delivery", description: "Your order is on its way" }
              ].map((item, index) => (
                <OrderProgressStep key={index} {...item} />
              ))}
            </ul>
          </div>
        </section>

        {/* Action Buttons */}
        <footer className="mt-12 flex flex-col sm:flex-row justify-between items-center">
          <button
            onClick={() => router.push("/order-details?orderNumber=" + orderNumber)}
            className="w-full sm:w-auto flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 transition mb-6 sm:mb-0"
          >
            View Order Details <FaArrowRight className="ml-2" aria-hidden="true" />
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-md text-blue-600 bg-white hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
        </footer>
      </motion.article>
    </main>
  );
};

export default OrderConfirmation;
