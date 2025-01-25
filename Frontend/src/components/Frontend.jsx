import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Frontend = () => {
  const [images, setImages] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mainRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setImages(savedImages.map((image) => ({ url: image, liked: false })));
  }, []);

  const saveImagesToLocalStorage = (updatedImages) => {
    localStorage.setItem(
      "uploadedImages",
      JSON.stringify(updatedImages.map((img) => img.url))
    );
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        newImages.push({ url: base64Image, liked: false });
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        saveImagesToLocalStorage(updatedImages);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (indexToDelete) => {
    const updatedImages = images.filter((_, index) => index !== indexToDelete);
    setImages(updatedImages);
    saveImagesToLocalStorage(updatedImages);
  };

  const handleLikeImage = (indexToLike) => {
    const updatedImages = images.map((image, index) =>
      index === indexToLike ? { ...image, liked: !image.liked } : image
    );
    setImages(updatedImages);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = videoRef.current;
        if (videoElement) {
          videoElement.srcObject = stream;
          videoElement.play();
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
      });
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const photo = canvas.toDataURL("image/png");

      const updatedImages = [...images, { url: photo, liked: false }];
      setImages(updatedImages);
      saveImagesToLocalStorage(updatedImages);

      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      setIsCameraOpen(false);
    }
  };

  const closeCamera = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  return (
    <>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 object-cover w-full h-full -z-10"
      >
        <source src="/videos/hero-3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Transparent Navbar */}
      <header className="fixed top-0 z-10 flex items-center justify-center w-full h-16 text-4xl font-semibold text-white shadow-lg backdrop-blur-md">
        CRYPTOPULSE
      </header>

      <main
        ref={mainRef}
        className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-b from-gray-900/90 to-gray-900/80"
      >
        <h1 className="mb-8 text-4xl font-extrabold text-center text-white md:text-5xl animate-bounce">
          Smile to Earn Tokens
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="px-6 py-3 text-lg font-medium text-white transition-transform transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105">
              Upload Images
            </div>
          </label>

          <button
            onClick={openCamera}
            className="px-6 py-3 text-lg font-medium text-white transition-transform transform bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:scale-105"
          >
            Open Camera
          </button>
        </div>

        {/* Camera Section */}
        {isCameraOpen && (
          <div className="flex flex-col items-center mt-10">
            <video
              ref={videoRef}
              className="mb-6 border-4 border-gray-400 rounded-lg shadow-lg w-80 h-80"
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div className="flex gap-4">
              <button
                onClick={capturePhoto}
                className="px-6 py-3 font-medium text-white transition-transform transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
              >
                Capture Photo
              </button>
              <button
                onClick={closeCamera}
                className="px-6 py-3 font-medium text-white transition-transform transform bg-red-600 rounded-lg shadow-lg hover:bg-red-700 hover:scale-105"
              >
                Close Camera
              </button>
            </div>
          </div>
        )}

        {/* Uploaded Images */}
        <section className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative p-4 transition-transform transform bg-gray-700 rounded-lg shadow-md group hover:scale-105"
            >
              <img
                src={image.url}
                alt={`Uploaded ${index}`}
                className="object-cover w-full h-64 rounded-lg"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleLikeImage(index)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${image.liked
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  {image.liked ? "Liked ❤️" : "Like"}
                </button>
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Floating Profile Button */}
      <div
        onClick={() => navigate("/profile")}
        className="fixed flex items-center justify-center w-16 h-16 overflow-hidden text-white transition-transform duration-300 rounded-full shadow-lg cursor-pointer bottom-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-110"
      >
        <img
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
    </>
  );
};

export default Frontend;
