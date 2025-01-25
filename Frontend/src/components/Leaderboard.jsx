import React from "react";

const Leaderboard = () => {
  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Alice Johnson", score: 4500 },
    { rank: 2, name: "Bob Smith", score: 4200 },
    { rank: 3, name: "Charlie Brown", score: 3900 },
    { rank: 4, name: "Diana Ross", score: 3600 },
    { rank: 5, name: "Ethan Hunt", score: 3300 },
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="h-[15vh] bg-gradient-to-r from-purple-700 to-indigo-700 text-white flex justify-center items-center text-4xl font-extrabold shadow-lg">
        Leaderboard
      </div>

      {/* Leaderboard Table */}
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <h1 className="mb-10 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
          Top Players
        </h1>

        {/* Responsive Card Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leaderboardData.map((user, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center justify-center p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${
                user.rank === 1
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                  : user.rank === 2
                  ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white"
                  : user.rank === 3
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {/* Rank */}
              <div className="absolute top-0 flex items-center justify-center w-12 h-12 text-lg font-bold -translate-y-1/2 bg-black rounded-full shadow-lg">
                #{user.rank}
              </div>

              {/* Name and Score */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-center">{user.name}</h2>
                <p className="mt-2 text-lg text-center">
                  <span className="font-semibold">Score: </span>
                  {user.score}
                </p>
              </div>

              {/* Glow Animation */}
              <div className="absolute inset-0 w-full h-full rounded-lg blur-2xl opacity-30 -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-400 bg-gray-800 ">
        Powered by CryptoPulse © 2025
      </footer>
    </div>
  );
};

export default Leaderboard;
