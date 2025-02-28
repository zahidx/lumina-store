"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
    }
  };

  const infoCards = [
    { icon: FaPhoneAlt, title: "Phone Support", content: "+1 234 567 890" },
    { icon: FaEnvelope, title: "Email Support", content: "support@example.com" },
    { icon: MdLocationOn, title: "Our Location", content: "1234 E-commerce St, Cityville, Country" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 pt-28 sm:pt-28">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center"
      >
        Contact Us
      </motion.h2>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          {/* Contact Form Section */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Send a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name required" })}
                    className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                    className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="3"
                    {...register("message", { required: "Message required" })}
                    className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    aria-invalid={errors.message ? "true" : "false"}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors dark:bg-indigo-800 dark:hover:bg-indigo-700"
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </button>
                </div>
                {status === "success" && <p className="text-green-600 text-center mt-2">Message sent!</p>}
                {status === "error" && <p className="text-red-600 text-center mt-2">Error sending message.</p>}
              </form>
            </div>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 pt-28"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {infoCards.map(({ icon: Icon, title, content }, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <Icon className="text-indigo-600 dark:text-indigo-500 text-3xl" />
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mt-2">{title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{content}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">Find Us On The Map</h3>
          <div className="relative h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799088659!2d-74.259873!3d40.6976701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a16f16885e7%3A0xe88a14e7b78d1eb6!2sBrooklyn%2C%20NY%2011231%2C%20USA!5e0!3m2!1sen!2sin!4v1677687386769!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
