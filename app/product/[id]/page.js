"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "../../compo/Api/Firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { FaShoppingCart, FaStar, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const docRef = doc(db, "electronics", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      };

      fetchProduct();
    }
  }, [id]);

  // Fetch related products (same category)
  useEffect(() => {
    if (product) {
      const fetchRelatedProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "electronics"));
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredProducts = allProducts
          .filter((p) => p.category === product.category && p.id !== id)
          .slice(0, 4);

        setRelatedProducts(filteredProducts);
      };

      fetchRelatedProducts();
    }
  }, [product]);

  // Add to Cart and Save to Local Storage
  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Added to cart successfully!");
  };

  // Redirect to Checkout
  const handleBuyNow = () => {
    router.push(`/checkout?productId=${product.id}`);
  };

  if (loading) {
    return <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-white text-gray-800 min-h-screen p-6 pt-24">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Product Image with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2"
        >
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">${product.price}</p>

          {/* Rating System */}
          <div className="flex items-center mt-2 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"} />
            ))}
            <span className="ml-2 text-gray-500">({product.rating}/5)</span>
          </div>

          {/* Stock Availability (Fixed Issue) */}
          <p className={`mt-2 text-lg font-semibold ${product.stock && product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {product.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <p className="text-gray-600 dark:text-gray-400 mt-4">{product.description}</p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              onClick={addToCart}
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              onClick={handleBuyNow}
            >
              Buy Now 🛍️
            </button>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-12"
      >
        <h3 className="text-2xl font-semibold text-center">Related Products</h3>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((related) => (
              <motion.div
                key={related.id}
                whileHover={{ scale: 1.05 }}
                className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 cursor-pointer transition"
                onClick={() => router.push(`/product/${related.id}`)}
              >
                <img
                  src={related.image}
                  alt={related.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {related.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">${related.price}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No related products found.</p>
          )}
        </div>
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center mt-8"
      >
        <button
          className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
          onClick={() => router.back()}
        >
          <FaArrowLeft /> Back to Store
        </button>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
