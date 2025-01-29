import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "+1234567890",
    profileImage: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [wallet, setWallet] = useState({
    balance: 150, // User's token balance
    transactions: [
      { id: 1, date: "2025-01-01", amount: 50, type: "Earned" },
      { id: 2, date: "2025-01-05", amount: -20, type: "Spent" },
      { id: 3, date: "2025-01-10", amount: 120, type: "Earned" },
    ],
  });

  const navigate = useNavigate();

  // Fetch images from localStorage on component mount
  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setUploadedImages(savedImages);
  }, []);

  // Remove an uploaded image
  const handleDeleteImage = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
  };

  return (
    <div className="min-h-screen text-white bg-gray-900">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-10">
        {/* Profile Image */}
        <div className="w-32 h-32 overflow-hidden rounded-full shadow-lg">
          <img
            src={user.profileImage}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>

        {/* User Info */}
        <h1 className="mt-4 text-3xl font-semibold">{user.name}</h1>
        <p className="text-lg text-gray-300">{user.email}</p>
        <p className="text-lg text-gray-300">{user.contact}</p>

        {/* View Leaderboard Button */}
        <button
          onClick={() => navigate("/leaderboard")}
          className="px-6 py-3 mt-6 text-lg font-semibold text-gray-900 transition-transform transform rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:scale-105"
        >
          View Leaderboard
        </button>
      </div>

      {/* Wallet Section */}
      <div className="px-6 py-10 mx-6 mb-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Wallet</h2>
        <p className="mb-4 text-lg">
          <span className="font-semibold">Token Balance:</span> {wallet.balance} Tokens
        </p>

        {/* Transaction History */}
        <h3 className="mb-2 text-xl font-semibold">Transaction History</h3>
        <div className="space-y-2">
          {wallet.transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                transaction.amount > 0
                  ? "bg-green-700 bg-opacity-20"
                  : "bg-red-700 bg-opacity-20"
              }`}
            >
              <p className="text-lg">{transaction.date}</p>
              <p
                className={`text-lg font-semibold ${
                  transaction.amount > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount} Tokens
              </p>
              <p className="text-sm text-gray-300">{transaction.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Images Section */}
      <div className="px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold">Uploaded Images</h2>
        {uploadedImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="relative p-2 bg-gray-800 rounded-lg shadow-md"
              >
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="object-cover w-full h-48 rounded-lg"
                />
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute px-2 py-1 text-sm font-medium text-white bg-red-600 rounded-full top-2 right-2 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No images uploaded yet.</p>
        )}
      </div>

      {/* Add Footer */}
      <footer className="px-6 py-4 text-center text-gray-400 bg-gray-800">
        Made with ❤️ by CryptoPulse Team
      </footer>
    </div>
  );
};

export default Profile;
