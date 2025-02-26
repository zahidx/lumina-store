"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { auth } from "../compo/Api/Firebase";
import { sendEmailVerification } from "firebase/auth";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, MailWarning, RefreshCw } from "lucide-react";

const Verify = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const user = auth.currentUser;

  const [status, setStatus] = useState("pending"); // "pending", "verified", "error"
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user) {
      setStatus("error");
      setErrorMessage("No user found. Please sign up first.");
      return;
    }

    // Polling for email verification status
    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        clearInterval(interval);
        setStatus("verified");
        setTimeout(() => router.push("/welcome"), 2000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user, router]);

  const handleResend = async () => {
    if (!user) {
      setStatus("error");
      setErrorMessage("No user found. Please sign up first.");
      return;
    }

    setResendDisabled(true);
    setTimeLeft(30);

    try {
      await sendEmailVerification(user);
    } catch (error) {
      console.error("Resend failed:", error);
      setStatus("error");
      setErrorMessage("Failed to resend email. Try again later.");
    }

    // Cooldown timer for resend button
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 px-4">
      {status === "verified" && <Confetti />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-300 dark:border-gray-700 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {status === "verified" ? "🎉 Email Verified!" : "Verify Your Email"}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          {status === "verified"
            ? "Your email has been successfully verified! Redirecting..."
            : `We've sent a verification link to ${email}. Please check your inbox and click the link.`}
        </p>

        {/* Loading Status */}
        {status === "pending" && (
          <motion.div className="flex justify-center items-center mt-4">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </motion.div>
        )}

        {/* Verified Status */}
        {status === "verified" && (
          <motion.div className="flex justify-center items-center mt-4 text-green-500">
            <CheckCircle size={48} />
          </motion.div>
        )}

        {/* Error Status */}
        {status === "error" && (
          <motion.div className="mt-4 text-red-500 flex flex-col items-center">
            <MailWarning size={48} />
            <p className="text-sm mt-2">{errorMessage}</p>
          </motion.div>
        )}

        {/* Resend Email Button */}
{status !== "verified" && (
  <motion.button
    whileHover={{ scale: resendDisabled ? 1 : 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handleResend}
    disabled={resendDisabled}
    className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all disabled:bg-gray-100 flex w-2/3 justify-center items-center space-x-2 mx-auto"
  >
    <RefreshCw size={18} />
    <span>{resendDisabled ? `Resend in ${timeLeft}s` : "Resend Email"}</span>
  </motion.button>
)}

      </motion.div>
    </div>
  );
};

export default Verify;
