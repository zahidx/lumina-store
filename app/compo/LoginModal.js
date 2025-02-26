"use client";

import { useState, useEffect } from "react";
import { FaTimes, FaUser, FaLock, FaGoogle, FaPhone } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { auth } from "../compo/Api/Firebase";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import CryptoJS from "crypto-js";

// Validation Schema
const schema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LoginModal = ({ isOpen, onClose }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const SECRET_KEY = "mySecretKey"; // Change this for security

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const savedData = localStorage.getItem("loginData");
    if (savedData) {
      try {
        const decryptedData = JSON.parse(CryptoJS.AES.decrypt(savedData, SECRET_KEY).toString(CryptoJS.enc.Utf8));
        setValue("email", decryptedData.email);
        setValue("password", decryptedData.password);
        setRememberMe(true);
      } catch (error) {
        console.error("Failed to decrypt data", error);
      }
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);

      if (rememberMe) {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
        localStorage.setItem("loginData", encryptedData);
      } else {
        localStorage.removeItem("loginData");
      }

      router.push("/dashboard");
      onClose(); // Close modal on successful login
    } catch (error) {
      console.error("Login Error:", error);
      setError(
        error.code === "auth/invalid-email" ? "Invalid email format." :
        error.code === "auth/user-disabled" ? "This account has been disabled." :
        error.code === "auth/user-not-found" ? "No account found with this email." :
        error.code === "auth/wrong-password" ? "Incorrect password." :
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md" onClick={onClose}></div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-3xl font-semibold text-center mb-4">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-3 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 rounded-lg transition-all"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Sign Up */}
        <p className="text-center text-sm mt-6">
          Don't have an account? 
          <button
            onClick={() => {
              router.push("/signup");
              onClose(); // Close modal
            }}
            className="text-blue-500 hover:underline ml-1"
          >
            Sign up
          </button>
        </p>

        {/* Sign-in Options */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              router.push("/google");
              onClose(); // Close modal
            }}
            className="flex items-center justify-center w-1/2 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaGoogle size={40} className="mr-2 text-red-500" /> 
          </button>
          <button
            onClick={() => {
              router.push("/phone");
              onClose(); // Close modal
            }}
            className="flex items-center justify-center w-1/2 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaPhone size={40} className="mr-2 text-green-500" /> 
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
