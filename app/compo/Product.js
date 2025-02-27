import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import both components
const AdminCarousel = dynamic(() => import("./admin-panel/AdminCarousel.js"), { ssr: false });
const ElectronicsAdmin = dynamic(() => import("./admin-panel/ElectronicsAdmin.js"), { ssr: false });

const EcommercePage = () => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [showElectronicsAdmin, setShowElectronicsAdmin] = useState(false);

  // Handle click for "Manage Carousel"
  const handleCarouselClick = () => {
    setShowCarousel(true);
    setShowElectronicsAdmin(false); // Hide Electronics Admin if showing carousel
  };

  // Handle click for "New Products"
  const handleNewProductsClick = () => {
    setShowElectronicsAdmin(true);
    setShowCarousel(false); // Hide Admin Carousel if showing Electronics Admin
  };

  return (
    <div className="ecommerce-page flex flex-col items-center p-6 font-sans bg-gray-100 dark:bg-gray-900 transition-all">
      
      {/* Dashboard Cards Section */}
      <div className="dashboard-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

        {/* Carousel Management Card */}
        <div
          className="card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:translate-y-1 cursor-pointer"
          onClick={handleCarouselClick}
        >
          <div className="card-header bg-gray-100 dark:bg-gray-700 p-4 rounded-t-xl text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Manage Carousel</h2>
          </div>
        </div>

        {/* New Products Card */}
        <div
          className="card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:translate-y-1 cursor-pointer"
          onClick={handleNewProductsClick}
        >
          <div className="card-header bg-gray-100 dark:bg-gray-700 p-4 rounded-t-xl text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Electronics Page</h2>
          </div>
        </div>

        {/* Offers Card */}
        <div className="card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:translate-y-1 cursor-pointer">
          <div className="card-header bg-gray-100 dark:bg-gray-700 p-4 rounded-t-xl text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Special Offers</h2>
          </div>
        </div>

      </div>

      {/* Dynamically loaded Admin Carousel */}
      {showCarousel && <AdminCarousel />}

      {/* Dynamically loaded Electronics Admin */}
      {showElectronicsAdmin && <ElectronicsAdmin />}
      
    </div>
  );
};

export default EcommercePage;
