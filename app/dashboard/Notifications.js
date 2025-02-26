import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineComment,
} from "react-icons/ai";

const notificationsData = [
  {
    id: 1,
    message: "You have received new orders",
    time: "2 min ago",
    icon: <AiOutlineShoppingCart size={30} color="#34d399" />,
    isRead: false,
  },
  {
    id: 2,
    message: "5 new users registered",
    time: "14 Sep ago",
    icon: <AiOutlineUser size={30} color="#3b82f6" />,
    isRead: false,
  },
  {
    id: 3,
    message: "The PDF files generated",
    time: "19 min ago",
    icon: <AiOutlineFileText size={30} color="#a855f7" />,
    isRead: true,
  },
  {
    id: 4,
    message: "Your new product has been approved",
    time: "2 hrs ago",
    icon: <AiOutlineCheckCircle size={30} color="#f59e0b" />,
    isRead: true,
  },
  {
    id: 5,
    message: "5.1 min average time response",
    time: "28 min ago",
    icon: <AiOutlineClockCircle size={30} color="#ef4444" />,
    isRead: false,
  },
  {
    id: 6,
    message: "New customer comments received",
    time: "4 hrs ago",
    icon: <AiOutlineComment size={30} color="#ec4899" />,
    isRead: false,
  },
];

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const closeDropdown = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        ref={buttonRef}
        className="pt-2 rounded-full cursor-pointer text-xl text-gray-600 dark:text-gray-200"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <FaBell />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Notifications
          </h3>
          {/* Wrapping the list in a scrollable container if there are more than 5 notifications */}
          <div
            style={{
              maxHeight: "24rem", 
              overflowY: "auto", 
              scrollbarWidth: "none", 
              msOverflowStyle: "none"
            }}
            className={notificationsData.length > 5 ? "" : ""}
          >
            <ul className="space-y-3">
              {notificationsData.length > 0 ? (
                notificationsData.map((notification) => (
                  <li
                    key={notification.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border-l-4 ${
                      notification.isRead
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-400"
                        : "bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-200 border-blue-500"
                    }`}
                  >
                    <span className="text-3xl">{notification.icon}</span>
                    <div>
                      <p
                        className={`text-sm ${
                          notification.isRead
                            ? "text-gray-500 dark:text-gray-400"
                            : "font-semibold text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500 dark:text-gray-400">
                  No notifications
                </li>
              )}
            </ul>
          </div>
          <div className="text-center mt-3">
            <button className="text-blue-500 text-sm font-medium hover:underline">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
