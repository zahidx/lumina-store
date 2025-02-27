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
    <div className="dark:bg-gray-900 dark:text-white bg-white text-gray-800 transition-colors duration-300 p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Electronics Store</h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) => (
          <div key={product.id} className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex flex-col space-y-2">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{product.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">${product.price}</p>
              <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
            </div>
            <button
              className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg mt-4"
              onClick={() => router.push(`/product/${product.id}`)} // Navigate to details page
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsStore;
