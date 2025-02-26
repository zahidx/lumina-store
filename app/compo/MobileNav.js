import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { FaHome, FaStore, FaList, FaTags, FaPhoneAlt, FaUser, FaTimes } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const MobileNav = ({ isOpen, closeMenu }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(currentTheme);
    AOS.init({ duration: 800, once: true });
    if (isOpen) {
      AOS.refresh();
    }
  }, [isOpen]);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    closeMenu();
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const navItems = [
    { name: "Home", icon: <FaHome />, iconColorLight: "#FF5722", iconColorDark: "#FF4081" },
    { name: "Shop", icon: <FaStore />, iconColorLight: "#4CAF50", iconColorDark: "#388E3C" },
    { name: "Categories", icon: <FaList />, iconColorLight: "#2196F3", iconColorDark: "#1976D2" },
    { name: "Deals", icon: <FaTags />, iconColorLight: "#FFC107", iconColorDark: "#FFA000" },
    { name: "Contact", icon: <FaPhoneAlt />, iconColorLight: "#FF9800", iconColorDark: "#F57C00" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0" onClick={closeMenu}>
          <motion.div
            initial={{ opacity: 0, x: "100%" }}  // Entry from the right
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}  // Exit to the left
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="md:hidden bg-gray-100 dark:bg-gray-800 py-4 shadow-lg transition-all duration-500 ease-in-out w-64 h-full fixed right-0 top-0 z-50"  // Right-aligned
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-between items-center px-6"
            >
              <span className="text-lg font-bold text-gray-700 dark:text-gray-300">Menu</span>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 180 }} 
                whileTap={{ scale: 0.9 }}
                onClick={closeMenu} 
                className="text-gray-700 dark:text-gray-300 text-2xl"
              >
                <FaTimes />
              </motion.button>
            </motion.div>
            <div className="flex flex-col space-y-6 px-6 mt-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="nav-item"
                  initial={{ opacity: 0, x: 30 }}  // Start from the right
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}  // Exit towards the right
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                >
                  <Link href={`/${item.name.toLowerCase()}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, translateX: 8 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 text-xl hover:text-[#FF5722] transition-all duration-300"
                      onClick={closeMenu}
                    >
                      <motion.div 
                        initial={{ rotate: -20 }} 
                        animate={{ rotate: 0 }} 
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{ color: isDarkMode ? item.iconColorDark : item.iconColorLight }}
                      >
                        {item.icon}
                      </motion.div>
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, translateX: 8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openLoginModal}
                  aria-label="Login"
                  title="Login"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 text-xl hover:text-[#FF5722] transition-all duration-300 text-left"
                >
                  <FaUser style={{ color: isDarkMode ? "#FF4081" : "#FF5722" }} />
                  <span>Login</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
