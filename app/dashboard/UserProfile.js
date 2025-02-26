// components/UserProfile.js
import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const UserProfile = ({ user, isOpen, onLogout, setIsModalOpen }) => {
  return (
    user && (
      <div>
        <div className="flex items-center gap-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg transition-all">
          <FaUserCircle className="text-3xl text-gray-800 dark:text-gray-100" />
          <div className={`text-md ${isOpen ? "block" : "hidden"}`}>
            <p className="font-semibold dark:text-gray-50">{user.displayName || "Admin"}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">E-Shop Owner</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-4 bg-red-500 hover:bg-red-600 text-white p-3 mt-4 rounded-lg transition-all w-full"
        >
          <FaSignOutAlt />
          <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
        </button>
      </div>
    )
  );
};

export default UserProfile;
