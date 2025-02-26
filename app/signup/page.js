"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { auth, db } from "../compo/Api/Firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Mail, Lock, User, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isClient) {
      const redirectTo = searchParams.get("redirectTo");
      if (redirectTo) router.push(redirectTo);
    }
  }, [searchParams, isClient, router]);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        createdAt: new Date(),
      });

      // Redirect to verification page
      router.push(`/verify?email=${encodeURIComponent(data.email)}`);

    } catch (error) {
      setErrorMessage(
        error.code === "auth/email-already-in-use" ? "This email is already registered." :
        error.code === "auth/weak-password" ? "Password should be at least 6 characters." :
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) 
    return <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-[450px] border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">✨ Join Us Now! ✨</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            {["firstName", "lastName"].map((field, index) => (
              <motion.div key={field} className="relative"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-gray-50" size={18} />
                <input
                  type="text"
                  placeholder={index === 0 ? "First Name" : "Last Name"}
                  {...register(field, { required: `${index === 0 ? "First" : "Last"} name is required` })}
                  className="pl-10 p-3 border rounded-lg text-sm dark:bg-gray-700 dark:text-white w-full focus:outline-none transition-all placeholder-gray-900 dark:placeholder-gray-200"
                />
                {errors[field] && <p className="text-red-500 text-xs">{errors[field].message}</p>}
              </motion.div>
            ))}
          </div>

          {/* Email */}
          <motion.div className="relative" whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-200" size={18} />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
              className="pl-10 p-3 border rounded-lg text-sm dark:bg-gray-700 dark:text-white w-full focus:outline-none transition-all placeholder-gray-900 dark:placeholder-gray-100"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </motion.div>

          {/* Password */}
          <motion.div className="relative" whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-200" size={18} />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 characters" } })}
              className="pl-10 p-3 border rounded-lg text-sm dark:bg-gray-700 dark:text-white w-full focus:outline-none transition-all placeholder-gray-900 dark:placeholder-gray-100"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </motion.div>

          {/* Phone Number */}
          <motion.div className="relative" whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-200" size={18} />
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phone", { required: "Phone number is required" })}
              className="pl-10 p-3 border rounded-lg text-sm dark:bg-gray-700 dark:text-white w-full focus:outline-none transition-all placeholder-gray-900 dark:placeholder-gray-100"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </motion.div>

          {/* Gender Selection */}
          <div className="flex justify-between">
            {["Male", "Female", "Other"].map((gender) => (
              <motion.label key={gender} className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <input type="radio" value={gender.toLowerCase()} {...register("gender", { required: "Select gender" })} className="hidden peer" />
                <span className="px-4 py-2 border rounded-lg text-sm flex items-center space-x-2 peer-checked:bg-blue-600 peer-checked:text-white dark:text-gray-100">
                  {gender}
                </span>
              </motion.label>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}

          {/* Submit Button */}
          <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all disabled:bg-gray-400" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>

          {errorMessage && <p className="text-red-500 text-xs text-center">{errorMessage}</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
