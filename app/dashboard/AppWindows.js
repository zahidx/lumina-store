import React, { useState, useRef, useEffect, useCallback } from "react";
import { AppWindow } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaFacebook, FaYoutube, FaLinkedin, FaGoogle, FaInstagram, 
  FaSkype, FaSlack, FaSpotify, FaYahoo, FaFigma, FaPaypal 
} from "react-icons/fa";
import { MdEmail, MdPhoto } from "react-icons/md";

const appIcons = [
  { icon: <MdEmail className="text-red-500 text-4xl" />, name: "Gmail" },
  { icon: <FaSkype className="text-blue-500 text-4xl" />, name: "Skype" },
  { icon: <FaSlack className="text-green-500 text-4xl" />, name: "Slack" },
  { icon: <FaYoutube className="text-red-600 text-4xl" />, name: "YouTube" },
  { icon: <FaGoogle className="text-yellow-500 text-4xl" />, name: "Google" },
  { icon: <FaInstagram className="text-pink-500 text-4xl" />, name: "Instagram" },
  { icon: <FaSpotify className="text-green-500 text-4xl" />, name: "Spotify" },
  { icon: <FaYahoo className="text-purple-500 text-4xl" />, name: "Yahoo" },
  { icon: <FaFacebook className="text-blue-600 text-4xl" />, name: "Facebook" },
  { icon: <FaFigma className="text-pink-500 text-4xl" />, name: "Figma" },
  { icon: <FaPaypal className="text-blue-500 text-4xl" />, name: "Paypal" },
  { icon: <MdPhoto className="text-yellow-500 text-4xl" />, name: "Photo" },
];

const AppWindowComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // This toggles the dropdown's open/close state
  };

  const closeDropdown = useCallback((event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeDropdown);
    } else {
      document.removeEventListener("mousedown", closeDropdown);
    }

    return () => document.removeEventListener("mousedown", closeDropdown);
  }, [isOpen, closeDropdown]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="cursor-pointer text-3xl pt-2 rounded-lg transition "
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <AppWindow className="text-gray-900 dark:text-gray-200" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-72 bg-white/60 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-xl p-5 
              grid grid-cols-3 gap-6 border border-gray-200 dark:border-gray-700"
          >
            {appIcons.map((app, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 cursor-pointer transition-all p-2 rounded-lg 
                  hover:bg-gray-100 dark:hover:bg-gray-800"
                tabIndex="0"
              >
                {app.icon}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{app.name}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppWindowComponent;
