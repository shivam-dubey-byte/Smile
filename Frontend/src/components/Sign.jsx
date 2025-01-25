import React from "react";

const Sign = ({ isLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="relative bg-black bg-opacity-30 backdrop-blur-lg rounded-xl shadow-2xl p-12 w-[600px] transform transition-transform hover:scale-105">
        <h2 className="mb-8 text-4xl font-bold text-center text-gray-100">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>
        <form className="space-y-8">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-200">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full p-4 mt-2 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
          )}
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
          {isLogin && (
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
          )}
          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold text-gray-100 transition-transform transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 hover:scale-105"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p className="mt-8 text-lg text-center text-gray-400">
          {isLogin
            ? "Don’t have an account? "
            : "Already have an account? "}
          <a href="/login" className="text-blue-400 underline">
            {isLogin ? "Sign up" : "Log in"}
          </a>
        </p>
        <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none bg-gradient-to-b from-transparent to-black rounded-xl"></div>
      </div>
    </div>
  );
};

export default Sign;
