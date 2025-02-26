const ProductPage = () => {
    return (
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto p-10">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <img
                src="https://via.placeholder.com/500x500"
                alt="Product"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
  
            {/* Product Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Product Name</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
              </p>
  
              <div className="flex items-center space-x-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$199.99</p>
                <span className="text-lg line-through text-gray-500 dark:text-gray-400">$299.99</span>
              </div>
  
              {/* Product Options */}
              <div>
                <h3 className="text-xl font-semibold">Choose Size</h3>
                <div className="flex space-x-4 mt-4">
                  {['S', 'M', 'L', 'XL'].map((size, idx) => (
                    <button
                      key={idx}
                      className="px-4 py-2 border rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
  
              {/* Add to Cart Button */}
              <button className="w-full py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-500 transition-all">
                Add to Cart
              </button>
  
              {/* Product Description */}
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
                <h4 className="text-xl font-semibold mb-4">Product Description</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Detailed description of the product goes here. You can add information about the features, materials, and any other details that would help customers make an informed purchase.
                </p>
              </div>
            </div>
          </div>
  
          {/* Reviews Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Customer Reviews</h3>
            <div className="space-y-6">
              {['John Doe', 'Jane Smith', 'Michael Brown'].map((name, idx) => (
                <div key={idx} className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                    <div>
                      <h4 className="text-xl font-semibold">{name}</h4>
                      <p className="text-gray-600 dark:text-gray-300">5 stars</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    Great product! I highly recommend it. The quality is outstanding and it arrived on time.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductPage;
  