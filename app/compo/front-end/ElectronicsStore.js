"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../Api/Firebase";
import { collection, getDocs } from "firebase/firestore";

const ElectronicsStore = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Fetch products from Firestore
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "electronics"));
    const fetchedProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-white text-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold text-center mb-10">Electronics Store</h2>
        
        

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{product.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-800 dark:text-white">${product.price}</p>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => router.push(`/product/${product.id}`)} // Navigate to details page
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectronicsStore;
