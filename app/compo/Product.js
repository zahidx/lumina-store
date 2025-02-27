import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import both components
const AdminCarousel = dynamic(() => import("./admin-panel/AdminCarousel.js"), { ssr: false });
const ElectronicsAdmin = dynamic(() => import("./admin-panel/ElectronicsAdmin.js"), { ssr: false });

const EcommercePage = () => {
  // Set the default active tab to the "Manage Carousel"
  const [showCarousel, setShowCarousel] = useState(true);
  const [showElectronicsAdmin, setShowElectronicsAdmin] = useState(false);
  const [showSpecialOffers, setShowSpecialOffers] = useState(false);

  // Handle click for "Manage Carousel"
  const handleCarouselClick = () => {
    setShowCarousel(true);
    setShowElectronicsAdmin(false);
    setShowSpecialOffers(false);
  };

  // Handle click for "Electronics Page"
  const handleElectronicsClick = () => {
    setShowElectronicsAdmin(true);
    setShowCarousel(false);
    setShowSpecialOffers(false);
  };

  // Handle click for "Special Offers"
  const handleSpecialOffersClick = () => {
    setShowSpecialOffers(true);
    setShowCarousel(false);
    setShowElectronicsAdmin(false);
  };

  return (
    <div className="ecommerce-page flex flex-col items-center p-6 font-sans bg-gray-100 dark:bg-gray-900 transition-all min-h-screen">

      {/* Horizontal Navbar */}
      <div className="navbar flex space-x-6 overflow-x-auto p-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-full mb-6">
        <div 
          className={`nav-item text-center cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-all border-r-2 border-gray-400 dark:border-gray-600 pr-4 ${showCarousel ? "bg-gray-700 dark:bg-gray-900 text-white p-1 rounded-md" : ""}`}
          onClick={handleCarouselClick}
        >
          <h2 className="text-lg font-semibold">Manage Carousel</h2>
        </div>

        <div 
          className={`nav-item text-center cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-all border-r-2 border-gray-400 dark:border-gray-600 pr-4 ${showElectronicsAdmin ? "bg-gray-700 dark:bg-gray-900 text-white p-1 rounded-md" : ""}`}
          onClick={handleElectronicsClick}
        >
          <h2 className="text-lg font-semibold">Electronics Page</h2>
        </div>

        <div 
          className={`nav-item text-center cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-all pr-4 ${showSpecialOffers ? "bg-gray-700 dark:bg-gray-900 text-white p-1 rounded-md" : ""}`}
          onClick={handleSpecialOffersClick}
        >
          <h2 className="text-lg font-semibold">Special Offers</h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="content w-full flex-grow mt-6">
        {/* Dynamically loaded Admin Carousel */}
        {showCarousel && <AdminCarousel />}

        {/* Dynamically loaded Electronics Admin */}
        {showElectronicsAdmin && <ElectronicsAdmin />}

        {/* Special Offers Section */}
        {showSpecialOffers && (
          <div className="special-offers-section p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Special Offers</h2>
            {/* Add content for Special Offers */}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcommercePage;
