"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "../compo/Api/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import { motion } from "framer-motion";

const CheckoutWrapper = () => {
  return (
    <Suspense fallback={<p className="text-center text-gray-600 dark:text-gray-400">Loading checkout...</p>}>
      <CheckoutComponent />
    </Suspense>
  );
};

const CheckoutComponent = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const docRef = doc(db, "electronics", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such product!");
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(0.1); // 10% discount logic
    } else {
      alert("Invalid coupon code");
    }
  };

  const handleConfirmPayment = () => {
    if (!shippingAddress || !paymentMethod) {
      alert("Please fill in all details before proceeding.");
      return;
    }

    const totalPrice = product
      ? ((product.price * quantity) - (product.price * quantity * discount)).toFixed(2)
      : "0.00";

    router.push(
      `/order-confirmation?productId=${product.id}&quantity=${quantity}&paymentMethod=${paymentMethod}&totalPrice=${totalPrice}`
    );
  };

  const totalPrice = product
    ? ((product.price * quantity) - (product.price * quantity * discount)).toFixed(2)
    : "0.00";

  if (loading) {
    return <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white pt-24">
      <div className="max-w-3xl mx-auto p-8 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 space-y-6">
        <h2 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">Checkout</h2>

        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <motion.div className="w-1/3 text-center py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md">
            Step 1: Address
          </motion.div>
          <motion.div className="w-1/3 text-center py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md">
            Step 2: Payment
          </motion.div>
          <motion.div className="w-1/3 text-center py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md">
            Step 3: Review
          </motion.div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-lg shadow-md" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{product.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">${product.price}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Quantity</span>
            <button className="text-xl px-4 py-2" onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
            <span className="text-lg font-semibold">{quantity}x</span>
            <button className="text-xl px-4 py-2" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Total</h3>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">${totalPrice}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Shipping Address</h3>
          <input
            type="text"
            placeholder="Enter your shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full mt-2 p-4 border rounded-lg"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Payment Method</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <motion.button className="py-4 bg-blue-600 text-white rounded-lg" onClick={() => setPaymentMethod("credit")}>
              <FaCreditCard /> Credit Card
            </motion.button>
            <motion.button className="py-4 bg-yellow-500 text-white rounded-lg" onClick={() => setPaymentMethod("paypal")}>
              <FaPaypal /> PayPal
            </motion.button>
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-3/4 p-4 border rounded-lg"
          />
          <motion.button className="py-3 px-6 bg-green-600 text-white rounded-lg" onClick={handleApplyCoupon}>
            Apply
          </motion.button>
        </div>

        <motion.button className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg" onClick={handleConfirmPayment}>
          Confirm & Pay
        </motion.button>

        <motion.button className="w-full mt-4 py-3 bg-gray-600 text-white rounded-lg" onClick={() => router.push("/")}>
          Cancel & Back to Store
        </motion.button>
      </div>
    </div>
  );
};

export default CheckoutWrapper;
