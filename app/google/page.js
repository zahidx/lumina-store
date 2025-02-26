"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "../compo/Api/Firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
        router.push(redirect);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [router, redirect]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Login Success:", result.user);
      router.push(redirect);
    } catch (error) {
      console.error("Google Login Error:", error);
      setError(error.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
        <FaGoogle className="text-red-500 text-4xl mx-auto mb-4" />
        <h2 className="text-xl font-semibold dark:text-gray-100">
          {loading ? "Signing in..." : "Sign in with Google"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {loading ? "Please wait while we authenticate your account." : "Click the button below to continue."}
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {!loading && (
          <div className="flex justify-center items-center w-full">
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-center"
          >
            <FaGoogle />
            Sign in with Google
          </button>
        </div>
        
        )}
      </div>
    </div>
  );
};

export default GoogleLogin;
