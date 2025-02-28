"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "../compo/Api/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaCreditCard, FaPaypal } from "react-icons/fa";

const OrderConfirmationContent = () => {
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
          const productData = docSnap.data();
          setProduct({
            id: docSnap.id,
            title: productData.title || "Unknown Product", // Use title field
            image: productData.image || "/placeholder.jpg",
            price: productData.price || "0.00",
          });
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
    return <p className="mt-10 text-center text-gray-600 dark:text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="mt-10 text-center text-red-500">{error}</p>;
  }

  const quantity = parseInt(quantityParam, 10);
  const totalPrice = parseFloat(totalPriceParam).toFixed(2);
  const PaymentIcon = paymentMethodParam === "paypal" ? FaPaypal : FaCreditCard;

  return (
    <main className="min-h-screen mt-10 bg-gray-100 dark:bg-[#111827] py-12 px-4 sm:px-6 lg:px-8">
      <motion.article
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
      >
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

        {/* Product Details */}
        {product && (
          <section className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Product Details</h2>
            <div className="mt-4 flex justify-between items-center">
              {/* Left Side: Image and Title */}
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.title}  // Updated to `title`
                  className="w-20 h-20 object-cover rounded-lg shadow"
                />
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.title}  {/* Updated to `title` */}
                </p>
              </div>
              {/* Right Side: Price Details */}
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {quantity}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Price: ${product.price}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Total: ${totalPrice}
                </p>
              </div>
            </div>
          </section>
        )}

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

const OrderConfirmation = () => {
  return (
    <Suspense fallback={<p className="mt-10 text-center text-gray-600 dark:text-gray-400">Loading...</p>}>
      <OrderConfirmationContent />
    </Suspense>
  );
};

export default OrderConfirmation;
