"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className="carousel-images relative border rounded-lg mx-auto max-w-md overflow-hidden">
      <img
        key={currentIndex}
        src={images[currentIndex]}
        className="w-full h-full object-cover border-2 border-red-500 rounded-lg"
        alt={`Slide ${currentIndex + 1}`}
      />

      <div className="flex justify-between top-0 bottom-0 m-auto">
        <div
          className=" bg-red-600 text-white p-2 rounded-full cursor-pointer absolute top-0 bottom-0 m-auto h-10 w-10 left-0"
          onClick={handlePrevious}
        >
          {/* Add your SVG for the left arrow */}
        </div>
        <div
          className="bg-black p-2 rounded-full cursor-pointer m-auto h-10 w-10 absolute right-0 top-0 bottom-0"
          onClick={handleNext}
        >
          {/* Add your SVG for the right arrow */}
        </div>
      </div>

      <div className="carousel-indicator flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot bg-gray-700 w-4 h-4 rounded-full mx-1 ${
              currentIndex === index ? "active bg-red-600" : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
