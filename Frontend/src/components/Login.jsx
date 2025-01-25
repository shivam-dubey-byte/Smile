import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="relative bg-black bg-opacity-30 backdrop-blur-lg rounded-xl shadow-2xl p-12 w-[600px] transform transition-transform hover:scale-105">
        <h2 className="mb-8 text-4xl font-bold text-center text-gray-100">Welcome Back</h2>
        <form className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full p-4 mt-2 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full p-4 mt-2 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label htmlFor="remember" className="inline-flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="text-blue-500 border-gray-600 rounded focus:ring-0 focus:ring-offset-0"
              />
              <span className="ml-2 text-gray-200">Remember me</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold text-gray-100 transition-transform transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 hover:scale-105"
          >
            Log In
          </button>
        </form>
        <p className="mt-8 text-lg text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 underline">
            Sign up
          </Link>
        </p>
        <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none bg-gradient-to-b from-transparent to-black rounded-xl"></div>
      </div>
    </div>
  );
};

export default Login;
