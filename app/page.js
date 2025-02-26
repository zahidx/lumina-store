"use client";
import { ShoppingCart, Search, User, Star } from "lucide-react";

const products = [
  { id: 1, name: "Smartphone X", price: "$799", image: "/images/phone.jpg" },
  { id: 2, name: "Wireless Headphones", price: "$199", image: "/images/headphones.jpg" },
  { id: 3, name: "Smart Watch", price: "$299", image: "/images/watch.jpg" },
];

export default function HomePage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">ShopMate</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            <Search className="absolute left-2 top-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <ShoppingCart className="h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-200" />
          <User className="h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-200" />
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="text-center p-6 bg-black/50 dark:bg-black/70 rounded-xl">
          <h2 className="text-4xl font-bold">Discover the Best Deals</h2>
          <p className="mt-2 text-lg">Exclusive offers on top brands</p>
          <button className="mt-4 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="p-6">
        <h3 className="text-2xl font-semibold mb-4">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mt-2">{product.name}</h4>
                <p className="text-gray-600 dark:text-gray-300">{product.price}</p>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500" />
                  ))}
                </div>
                <button className="mt-3 bg-green-500 dark:bg-green-600 text-white w-full py-2 rounded-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 text-center p-4 mt-6">
        <p>&copy; {new Date().getFullYear()} ShopMate. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
