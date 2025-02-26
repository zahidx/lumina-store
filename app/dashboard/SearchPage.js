import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle search bar expansion
  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative flex items-center">
      {/* Search Icon */}
      <button
        onClick={toggleSearch}
        className="rounded-full cursor-pointer text-xl text-gray-600 dark:text-gray-200 transition-all"
      >
        <FaSearch />
      </button>

      {/* Expanding Search Bar */}
      <div
        className={`transition-all -ml-8 duration-300 ease-in-out absolute left-full ${isExpanded ? 'w-64' : 'w-0'} overflow-hidden`}
        style={{
          transition: 'width 0.3s ease-in-out',
          transform: 'translateX(-100%)', // Ensures it starts off-screen
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full p-2 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchPage;
