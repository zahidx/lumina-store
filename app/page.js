"use client";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Carousel from "./compo/front-end/Carousel";
import ElectronicsStore from "./compo/front-end/ElectronicsStore"; // Adjust path as necessary

export default function HeroSection() {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [location, setLocation] = useState("your area");
  const [discount, setDiscount] = useState("10%");

  useEffect(() => {
    const hours = new Date().getHours();
    setTimeOfDay(
      hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening"
    );

    fetch("/api/featured-product") 
      .then(res => res.json())
      .then(data => setFeaturedProduct(data))
      .catch(err => console.error("Error fetching product:", err));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation("New York");
          setDiscount("20%");
          triggerConfetti(); // 🎉 Fire confetti when user gets a special discount
        },
        () => console.log("Geolocation not allowed")
      );
    }
  }, []);

  // 🎉 Celebration Effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="w-full">
      {/* HeroSection Content */}
      <div className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
        <img src="/hero-bg.jpg" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

        <div className="relative z-10 p-6">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">
            {timeOfDay}, Shopper! 🎉
          </h1>
          <p className="mt-4 text-lg drop-shadow-md">
            🎊 Congratulations! Enjoy {discount} off in {location} today! 🎊
          </p>

          {featuredProduct ? (
            <div className="mt-6 flex flex-col items-center">
              <h2 className="text-3xl font-bold">{featuredProduct.name}</h2>
              <p className="text-lg text-gray-200">{featuredProduct.description}</p>
              <button 
                className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg text-lg"
                onClick={triggerConfetti} // Extra confetti on button click
              >
                Shop {featuredProduct.name} 🎁
              </button>
            </div>
          ) : (
            <button 
              className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg text-lg"
              onClick={triggerConfetti}
            >
              Browse Bestsellers 🎁
            </button>
          )}
        </div>
        <Carousel />
      </div>

      {/* ElectronicsStore outside of the HeroSection div, full width */}
      <div className="w-full">
        <ElectronicsStore />
      </div>
    </div>
  );
}
