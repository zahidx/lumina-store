"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../compo/Api/Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { FaPhone } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const PhoneLogin = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(30);
  const router = useRouter();
  const otpInputs = useRef([]);

  useEffect(() => {
    if (resendTimeout > 0) {
      const timer = setTimeout(() => setResendTimeout((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimeout]);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleVerifyOtp();
    }
  }, [otp]); // Verify OTP when all 6 digits are filled

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => console.log("Recaptcha verified"),
      });
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber.match(/^\+\d{10,}$/)) {
      return setError("Enter a valid phone number with country code.");
    }
    setError("");
    setLoading(true);
    setupRecaptcha();

    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(result);
      setResendTimeout(30);
      toast.success("OTP Sent Successfully");
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await confirmationResult.confirm(otp.join(""));
      toast.success("Login Successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      setError("Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105"
      >
        <FaPhone className="text-green-500 text-4xl mx-auto mb-4 animate-bounce" />
        <h2 className="text-xl text-gray-900 dark:text-gray-50 font-semibold text-center">{step === 1 ? "Sign in with Phone" : "Enter OTP"}</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {step === 1 ? (
          <>
<input
  type="tel"
  placeholder="Enter phone number (e.g. +1234567890)"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-4 dark:bg-gray-700 dark:text-white 
             focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none transition-all duration-200"
/>

            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mt-4 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <div id="recaptcha-container"></div>
          </>
        ) : (
          <>
            <div className="flex justify-center gap-2 mt-4">
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
      ref={(el) => (otpInputs.current[index] = el)}
      className={`w-12 h-12 text-center border-2 rounded-lg text-xl font-bold dark:bg-gray-700 dark:text-white transition-all duration-200
        ${digit ? "border-green-500" : "border-gray-300"}
        focus:ring outline-none`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              className="hidden"
              disabled={loading || otp.includes("")}
            />

            <button
              onClick={handleSendOtp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-4 disabled:opacity-50"
              disabled={resendTimeout > 0}
            >
              {resendTimeout > 0 ? `Resend OTP in ${resendTimeout}s` : "Resend OTP"}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PhoneLogin;
