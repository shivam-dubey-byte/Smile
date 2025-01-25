import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 text-white bg-gradient-to-b from-gray-900 via-black to-gray-800">
      {/* Contact Form */}
      <div
        className="w-full max-w-lg p-8 transition-transform transform bg-gray-800 shadow-lg rounded-2xl hover:scale-105"
        style={{
          boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.6)",
        }}
      >
        <h1 className="mb-6 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
          Contact Us
        </h1>
        <p className="mb-8 text-center text-gray-300">
          Have questions or feedback? Drop us a message!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Write your message here"
              className="w-full px-4 py-3 text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-semibold text-gray-900 transition-transform transform rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:scale-105 hover:from-yellow-500 hover:to-yellow-600"
          >
            Send Message
          </button>
        </form>

        {/* Success Message */}
        {submitted && (
          <p className="mt-6 text-lg text-center text-green-400">
            Thank you! Your message has been sent successfully.
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
