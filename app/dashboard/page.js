"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FaHome, FaBox, FaShoppingCart, FaUsers, FaCog, FaBars, 
  FaSearch, FaBell, FaSun, FaMoon, FaPhone,
} from "react-icons/fa";
import { AiOutlineShop } from 'react-icons/ai';

import MobileSidebar from "./MobileSidebar";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../compo/Api/Firebase";
import Dashboard from "../compo/Dashboard";
import Product from "../compo/Product";
import Order from "../compo/Order";
import Customer from "../compo/Customer";
import UserProfileTop from "./UserProfileTop";

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [hovered, setHovered] = useState(false); // state for hover expansion
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, component: "Dashboard" },
    { name: "Products", icon: <FaBox />, component: "Products" },
    { name: "Orders", icon: <FaShoppingCart />, component: "Orders" },
    { name: "Customers", icon: <FaUsers />, component: "Customers" },
    { name: "Settings", icon: <FaCog />, component: "Settings" },
  ];

  return (
    <div className="flex h-screen flex-col">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 flex items-center justify-between px-6 py-3 z-50">
        <div className="flex items-center gap-4">
          <AiOutlineShop className="text-3xl text-gray-900 dark:text-gray-100" />
          {(isOpen || hovered) && (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              E-Shop
            </h1>
          )}
        </div>

        {!hovered && (
  <FaBars 
    className={`text-gray-900 dark:text-gray-100 cursor-pointer text-xl transition-all duration-300 ${
      isOpen ? "-ml-[980px]" : "-ml-[1100px]"
    }`}
    onClick={() => setIsOpen(!isOpen)}
  />
)}

        <div className="flex items-center gap-4">
          <FaSearch className="text-gray-900 dark:text-gray-100 cursor-pointer text-xl" />
          <button onClick={toggleDarkMode}>
            {darkMode ? (
              <FaSun className="text-yellow-500 text-xl" />
            ) : (
              <FaMoon className="text-gray-400 text-xl" />
            )}
          </button>
          <FaPhone className="text-gray-900 dark:text-gray-100 cursor-pointer text-xl" />
          <FaBell className="text-gray-900 dark:text-gray-100 cursor-pointer text-xl" />
          <FaBars 
            className="text-gray-900 dark:text-gray-100 cursor-pointer text-xl md:hidden"
            onClick={() => setMobileNavOpen(true)}
          />
          <UserProfileTop user={user} onLogout={handleLogout} setIsModalOpen={setIsModalOpen} />
        </div>
      </div>

      {/* Sidebar & Main Content */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <motion.div
          onMouseEnter={() => { if (!isOpen) setHovered(true); }}
          onMouseLeave={() => { if (!isOpen) setHovered(false); }}
          initial={{ width: 0 }}
          animate={{ width: isOpen || hovered ? 260 : 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="hidden md:flex fixed top-0 left-0 h-full bg-gray-100 dark:bg-gray-900 flex-col justify-between p-5 z-40"
        >
          <div className="flex flex-col gap-4 mt-10">
            {/* Navigation */}
            <nav>
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
                    activeComponent === item.component
                      ? "bg-gray-800 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveComponent(item.component)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`text-md font-medium ${isOpen || hovered ? "block" : "hidden"}`}>
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Vertical Divider */}
        <div className="fixed top-0 right-0 h-full w-1 bg-gray-300 dark:bg-gray-600 z-10"></div>

        {/* Main Content */}
        <div
          className={`flex-1 -mt-3 bg-gray-50 dark:bg-gray-800 transition-all duration-300 ${
            isOpen ? "pl-64" : "pl-20"
          }`}
        >
          {activeComponent === "Dashboard" && <Dashboard />}
          {activeComponent === "Products" && <Product />}
          {activeComponent === "Orders" && <Order />}
          {activeComponent === "Customers" && <Customer />}
          {activeComponent === "Settings" && <h1>Settings Page</h1>}
        </div>
      </div>

      {/* Overlay to cover main content on hover expansion */}
      {(!isOpen && hovered) && (
        <div 
          className="fixed inset-0 bg-black opacity-30 z-30 md:block"
          onClick={() => setHovered(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </div>
  );
};

export default Sidebar;
