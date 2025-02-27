"use client";

import React, { useState, useEffect, useCallback } from "react";
import { db } from "../Api/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const OptimizedCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data from Firestore
  const fetchProducts = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "carousel"));
      const fetchedProducts = querySnapshot.docs.map((doc) => doc.data());
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen -mt-10 bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-800 flex flex-col justify-center items-center py-20 px-4">
      <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-12 tracking-wide bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent animate-[fadeIn_1.5s_ease-in-out]">
        🚀 Featured Products
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="flex space-x-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="w-64 h-64 bg-gray-300 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      ) : products.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} w-3 h-3 bg-white rounded-full mx-1 transition-all duration-300 hover:opacity-100"></span>`,
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
          className="w-full max-w-6xl h-auto relative"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-xl transition-transform duration-700 ">
                <img
                  src={product.url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute inset-0 flex flex-col justify-end items-center p-6 md:p-8 z-10 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
                    {product.title}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-200 mt-2 mb-4 max-w-lg drop-shadow">
                    {product.description}
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <p className="text-2xl md:text-3xl font-bold text-yellow-400 drop-shadow">
                      ${product.price}
                    </p>
                    <button className="bg-gradient-to-r from-green-500 to-green-500  text-white px-6 py-3 rounded-lg text-base md:text-lg font-semibold transition-transform duration-300  shadow-md">
                       Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute top-1/2 left-4 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 rounded-full cursor-pointer text-white text-xl md:text-3xl">
            &#10094;
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 right-4 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 rounded-full cursor-pointer text-white text-xl md:text-3xl">
            &#10095;
          </div>
        </Swiper>
      ) : (
        <p className="text-center text-gray-300 text-xl">🚧 No products available</p>
      )}
    </div>
  );
};

export default OptimizedCarousel;
