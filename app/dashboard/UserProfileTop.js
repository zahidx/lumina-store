import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdSettings, MdDownload, MdAttachMoney } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";

const UserProfile = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Profile Image in Top Bar */}
      <div
        ref={profileIconRef}
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user?.photoURL ? (
          <img src={user.photoURL} alt="Profile" className="w-7 h-7 rounded-full" />
        ) : (
          <FaUserCircle className="w-7 h-7 text-gray-600 dark:text-gray-200" />
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300"
        >
          {/* Admin Info */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            {/* User Image */}
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
            ) : (
              <FaUserCircle className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            )}

            {/* User Name & Role */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {user?.displayName || "Zahid Islam"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">UI Developer</p>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="py-2">
            {[
              { icon: <FaUserCircle />, text: "Profile" },
              { icon: <MdSettings />, text: "Settings" },
              { icon: <MdDashboard />, text: "Dashboard" },
              { icon: <MdAttachMoney />, text: "Earnings" },
              { icon: <MdDownload />, text: "Downloads" },
            ].map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                {item.icon} {item.text}
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div
            className="px-4 py-2 text-red-600 dark:text-red-400 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <FaSignOutAlt /> Logout
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={onLogout}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserProfile;
