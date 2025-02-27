"use client";
import React, { useState, useEffect } from "react";
import { db } from "../Api/Firebase"; // ✅ Import Firestore
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const AdminCarousel = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  // Fetch images from Firestore
  const fetchImages = async () => {
    const querySnapshot = await getDocs(collection(db, "carousel"));
    const fetchedImages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setImages(fetchedImages);
  };

  // Convert Image to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // ✅ Convert to Base64
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle File Selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // ✅ Show preview before storing
      const base64 = await convertToBase64(file);
      setImage(base64);
    }
  };

  // Store Image Link, Title, Price, and Description in Firestore
  const addProduct = async () => {
    if (!image || !title || !price || !description) {
      setMessage("❌ Please fill in all fields!");
      return;
    }
    setLoading(true);

    try {
      await addDoc(collection(db, "carousel"), {
        url: image,
        title: title,
        price: price,
        description: description,
      });

      setMessage("✅ Product stored successfully!");
      setTimeout(() => setMessage(null), 3000);
      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);
      setPreview(null);
      fetchImages();
    } catch (error) {
      setMessage("❌ Failed to store product. Try again!");
      console.error("Error adding product:", error);
    }

    setLoading(false);
  };

  // Delete Product from Firestore
  const removeProduct = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      await deleteDoc(doc(db, "carousel", id));
      fetchImages();
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-white text-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex space-x-8">
          {/* Left side: Form */}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-6 text-center">Admin Panel - Carousel Manager</h2>

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

            <button
              className={`w-full py-3 rounded-lg ${loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              onClick={addProduct}
              disabled={loading}
            >
              {loading ? "Storing..." : "Store Product"}
            </button>
          </div>

          {/* Right side: Product List */}
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Stored Products</h3>
            <div className="overflow-y-auto max-h-[500px]"> {/* Make this section scrollable */}
              <ul className="space-y-4">
                {images.map((product) => (
                  <li key={product.id} className="flex items-center justify-between p-4 border-b-2 border-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <img src={product.url} alt="Product" className="w-24 h-24 object-cover rounded-lg" />
                    <div className="ml-4 flex-1">
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{product.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
                      <p className="text-lg font-bold text-blue-500">${product.price}</p>
                    </div>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      onClick={() => removeProduct(product.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCarousel;
