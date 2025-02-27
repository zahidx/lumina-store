"use client";
import React, { useState, useEffect } from "react";
import { db } from "../Api/Firebase"; // Your Firebase config
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

const ElectronicsAdmin = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [products, setProducts] = useState([]);

  // Convert Image to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle File Selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Show preview before storing
      const base64 = await convertToBase64(file);
      setImage(base64); // Store the image in base64 format
    }
  };

  // Fetch products from Firestore
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "electronics"));
    const fetchedProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(fetchedProducts);
  };

  // Add product to Firestore
  const addProduct = async () => {
    if (!image || !title || !price || !description || !quantity) {
      setMessage("❌ Please fill in all fields!");
      return;
    }
    setLoading(true);

    try {
      const productData = {
        image,
        title,
        price: parseFloat(price),
        description,
        quantity: parseInt(quantity),
      };

      await addDoc(collection(db, "electronics"), productData);

      setMessage("✅ Product added successfully!");
      setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds

      // Reset form
      setTitle("");
      setPrice("");
      setDescription("");
      setQuantity("");
      setImage(null);
      setPreview(null);

      // Fetch updated product list
      fetchProducts();
    } catch (error) {
      setMessage("❌ Failed to add product. Try again!");
      console.error("Error adding product:", error); // Log error for troubleshooting
    }

    setLoading(false);
  };

  // Delete product from Firestore
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "electronics", id));
      fetchProducts(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Fetch products when the component is mounted
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-white text-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6 flex">
        
        {/* Left Section: Form to Add Product */}
        <div className="flex flex-col items-center space-y-6 w-1/3">
          <h2 className="text-3xl font-semibold">Admin - Add New Product</h2>

          {message && <p className="text-center mb-4 text-sm text-green-500">{message}</p>}

          {/* Image Preview */}
          {preview && (
            <div className="mb-4 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-64 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
              />
            </div>
          )}

          {/* Product Form */}
          <div className="w-full max-w-md">
            {/* File Upload Input */}
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 border-2 border-gray-300 rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              onChange={handleFileChange}
            />

            {/* Title Input */}
            <input
              type="text"
              placeholder="Product Title"
              className="w-full p-3 border-2 border-gray-300 rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Price Input */}
            <input
              type="number"
              placeholder="Price"
              className="w-full p-3 border-2 border-gray-300 rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {/* Description Input */}
            <textarea
              placeholder="Product Description"
              className="w-full p-3 border-2 border-gray-300 rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Quantity Input */}
            <input
              type="number"
              placeholder="Quantity"
              className="w-full p-3 border-2 border-gray-300 rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            {/* Submit Button */}
            <button
              className={`w-full py-3 rounded-lg ${loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              onClick={addProduct}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>

        {/* Right Section: Product List */}
        <div className="w-2/3 ml-20 h-[80vh] overflow-y-auto space-y-4">
          <h3 className="text-2xl font-semibold">Product List</h3>

          <div className="flex flex-wrap gap-6">
            {products.map((product) => (
              <div key={product.id} className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-full max-w-4xl">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-32 object-cover rounded-lg mr-4"
                />

                {/* Product Info (Title, Price, Description, Quantity) */}
                <div className="flex flex-col flex-grow">
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{product.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">${product.price}</p>
                  <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                  <p className="text-gray-600 dark:text-gray-400">Quantity: {product.quantity}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="py-2 px-4 bg-red-600 text-white hover:bg-red-700 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ElectronicsAdmin;
