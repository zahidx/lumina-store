"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../compo/Api/Firebase";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={() => setShowDialog(true)}
        className="flex items-center gap-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-all w-full"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

      {/* Logout Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
