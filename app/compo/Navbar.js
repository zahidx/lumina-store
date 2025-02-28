"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiHome, FiUser, FiSearch, FiShoppingCart, FiList, FiTag, FiMail } from "react-icons/fi"; // Add imports for icons
import { BsSun, BsMoon } from "react-icons/bs";
import { IoMenu, IoClose } from "react-icons/io5";
import { FiLock } from "react-icons/fi"; // Import lock icon
import Link from "next/link";
import dynamic from "next/dynamic";
import LoginModal from "./LoginModal"; // Import your LoginModal component

// Dynamically import MobileNav for performance
const MobileNav = dynamic(() => import("./MobileNav"), { ssr: false });

const navLinks = [
  { label: "Home", href: "/", icon: <FiHome /> },
  { label: "Shop", href: "/shop", icon: <FiShoppingCart /> },
  { label: "Categories", href: "/categories", icon: <FiList /> },
  { label: "Deals", href: "/deals", icon: <FiTag /> },
  { label: "Contact", href: "/contact", icon: <FiMail /> },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Example cart count
  const [showLoginModal, setShowLoginModal] = useState(false); // Modal visibility state

  // Check for stored theme and system preferences on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else if (prefersDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  }, []);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Hide navbar on scroll down, show on scroll up
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  // Framer Motion hover variant for icons
  const iconHover = { scale: 1.1, transition: { duration: 0.2 } };

  return (
    <>
      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      <motion.nav
        className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50 transition-transform duration-300"
        animate={{ translateY: visible ? 0 : -100 }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FF9800] cursor-pointer hidden md:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Lumina Store
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0px 0px 8px rgba(255, 0, 0, 0.6)",
                    color: "#FF5722",
                  }}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 text-lg hover:text-[#FF5722] transition-all duration-300 cursor-pointer"
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {/* Login & Lock Icons in the same row */}
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => setShowLoginModal(true)} // Show modal on click
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 text-lg font-semibold hover:text-[#FF5722] transition-all duration-300 hidden md:block"
                whileHover={iconHover}
              >


                <span>Login</span>
              </motion.button>
            </div>

            {/* Search Icon */}
            <motion.button
              aria-label="Search"
              title="Search"
              className="focus:outline-none"
              whileHover={iconHover}
            >
              <FiSearch className="text-gray-700 dark:text-gray-300 text-2xl cursor-pointer hover:text-[#FF5722] transition-all duration-300" />
            </motion.button>

            {/* Cart Icon with Count */}
            <div className="relative">
              <motion.button
                aria-label="View Cart"
                title="View Cart"
                className="focus:outline-none"
                whileHover={iconHover}
              >
                <FiShoppingCart className="text-gray-700 mt-2 dark:text-gray-300 text-2xl cursor-pointer hover:text-[#FF5722] transition-all duration-300" />
              </motion.button>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {/* User Icon */}
            <motion.button
              aria-label="User Profile"
              title="User Profile"
              className="focus:outline-none"
              whileHover={iconHover}
            >
              <FiUser className="text-gray-700 dark:text-gray-300 text-2xl cursor-pointer hover:text-[#FF5722] transition-all duration-300" />
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              title="Toggle Dark Mode"
              className="focus:outline-none transition-colors duration-300"
              whileHover={iconHover}
            >
              {isDarkMode ? (
                <BsSun className="text-yellow-400 text-2xl" />
              ) : (
                <BsMoon className="text-blue-700 text-2xl" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              aria-label="Open Menu"
              className={`md:hidden text-3xl text-gray-700 dark:text-white focus:outline-none 
              transform active:scale-90 drop-shadow-lg transition-transform duration-300 ease-in-out -ml-44 
              ${isMobileMenuOpen ? "rotate-90" : "rotate-0"}`}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <IoMenu className="text-3xl text-gray-700 dark:text-white " />
            </button>
          </div>
        </div>

        {/* Mobile Navigation with animation */}
        <MobileNav isOpen={isMobileMenuOpen} closeMenu={closeMenu} />
      </motion.nav>
    </>
  );
};

export default Navbar;
