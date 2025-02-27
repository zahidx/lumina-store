"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const footerRef = useRef(null);

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  // Back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Footer reveal animation using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.3 }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative text-gray-300 overflow-hidden transition-colors duration-500"
    >
      {/* SVG Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 animate-gradientBG bg-gradient-to-r from-gray-900 via-gray-800 to-black opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section with Logo & Language Selector */}
          <div>
            <img src="/logo.png" alt="Lumina Store Logo" className="w-32 mb-4 rounded-xl" />
            <p className="text-sm leading-relaxed">
              Lumina Store offers premium, curated products that redefine style and quality.
            </p>
            <div className="mt-4">
              <select className="bg-gray-800 text-sm p-2 rounded-md focus:outline-none">
                <option>🇺🇸 English</option>
                <option>🇪🇸 Español</option>
                <option>🇫🇷 Français</option>
                <option>🇩🇪 Deutsch</option>
              </select>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Shop", "About Us", "Contact", "FAQs"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group relative inline-block hover:text-white transition-all duration-300 ease-in-out"
                    aria-label={link}
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
              Customer Service
            </h4>
            <ul className="space-y-2">
              {[
                "Shipping & Returns",
                "Privacy Policy",
                "Terms & Conditions",
                "Order Tracking",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group relative inline-block hover:text-white transition-all duration-300 ease-in-out"
                    aria-label={link}
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm">
              <p>
                Call us:{" "}
                <a href="tel:+1234567890" className="text-white hover:text-yellow-400">
                  +1 (234) 567-890
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@luminastore.com"
                  className="text-white hover:text-yellow-400"
                >
                  support@luminastore.com
                </a>
              </p>
              <p>
                Address:{" "}
                <a
                  href="https://www.google.com/maps/place/123+Lumina+St"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400"
                >
                  123 Lumina St, Suite 456, City, Country
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter, Social, App Download & Trusted By */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
              Stay Connected
            </h4>
            <p className="text-sm mb-4">
              Subscribe for the latest updates & exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-100 text-black border border-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md transition-colors"
                aria-label="Subscribe"
              >
                Subscribe
              </button>
            </form>
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
            {subscribed && <p className="text-green-400 text-sm mb-4">Subscribed successfully!</p>}
            <div className="flex space-x-4 mb-4">
              {[
                { icon: <FaFacebookF />, link: "#", label: "Facebook" },
                { icon: <FaTwitter />, link: "#", label: "Twitter" },
                { icon: <FaInstagram />, link: "#", label: "Instagram" },
                { icon: <FaLinkedinIn />, link: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="relative group p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-transform transform hover:scale-110 hover:rotate-6"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
            <div className="mb-4">
              <h5 className="text-lg font-semibold mb-2">Download Our App</h5>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="flex items-center bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md transition-transform transform hover:scale-105"
                  aria-label="Download on the App Store"
                >
                  <FaApple className="mr-2" />
                  <span className="text-sm">App Store</span>
                </a>
                <a
                  href="#"
                  className="flex items-center bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md transition-transform transform hover:scale-105"
                  aria-label="Get it on Google Play"
                >
                  <FaGooglePlay className="mr-2" />
                  <span className="text-sm">Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-gray-600 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Lumina Store. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a
                key={link}
                href="#"
                className="group relative inline-block text-sm hover:text-white transition-all duration-300 ease-in-out"
                aria-label={link}
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Back to Top"
        >
          &#8679;
        </button>
      )}

      {/* Cookie Consent Banner */}
      {/* No change needed for Cookie consent */}
    </footer>
  );
};

export default Footer;
