import { useState } from "react";

export default function Order() {
  const [cart, setCart] = useState([
    { id: 1, name: "Smart Watch", price: 129.99, qty: 1, img: "/watch.jpg" },
    { id: 2, name: "Wireless Headphones", price: 89.99, qty: 1, img: "/headphones.jpg" },
  ]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQty = (id, qty) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, qty: qty } : item)));
  };

  const applyCoupon = () => {
    if (coupon === "SAVE10") setDiscount(0.1);
    else setDiscount(0);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.1;
  const total = subtotal - discountAmount + tax;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center p-6">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          🛒 Order Summary
        </h1>

        {/* Order Items */}
        <div className="space-y-6 border-b pb-6 border-gray-200 dark:border-gray-700">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {item.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                className="w-16 p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
            </div>
          ))}
        </div>

        {/* Coupon & Pricing */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
            <button
              onClick={applyCoupon}
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Apply
            </button>
          </div>

          <div className="border-t pt-4 space-y-2 border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Discount Applied</span>
                <span>- ${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Tax (10%)</span>
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span className="text-gray-800 dark:text-gray-100">Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Proceed to Payment */}
        <button className="mt-6 w-full bg-green-600 dark:bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
