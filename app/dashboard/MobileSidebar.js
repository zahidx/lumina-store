"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaTimes, FaHome, FaBox, FaShoppingCart, FaUsers, FaCog } from "react-icons/fa";

const MobileSidebar = ({ isOpen, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when sidebar is open
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto"); // Cleanup
  }, [isOpen]);

  if (!isOpen) return null; // Hide when not open

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/dashboard" },
    { name: "Products", icon: <FaBox />, link: "/products" },
    { name: "Orders", icon: <FaShoppingCart />, link: "/orders" },
    { name: "Customers", icon: <FaUsers />, link: "/customers" },
    { name: "Settings", icon: <FaCog />, link: "/settings" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative bg-white dark:bg-gray-900 w-64 h-full shadow-lg p-6"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-700 dark:text-gray-300">
          <FaTimes size={24} />
        </button>

        {/* Navigation */}
        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg cursor-pointer text-lg font-medium 
              text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              onClick={() => {
                router.push(item.link);
                onClose();
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};

export default MobileSidebar;
