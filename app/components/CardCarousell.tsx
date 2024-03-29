//allows users to scroll through images of a property
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

//animation for the smooth horizontal carousel transitions
const slideVariants = {
  hiddenRight: {
    x: "100%",
    opacity: 0,
  },
  hiddenLeft: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5,
    },
  },
};


//string array for the image urls
type CarouselImageProps = {
  images: string[];
};

//cycle through images
const Carousel: React.FC<CarouselImageProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("left");
  const handleNext = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  type index = number;

  //dots can cylce through images in same way as arrows
  const handleDotClick = (index: index) => {
    setCurrentIndex(index);
    setDirection(index > currentIndex ? "right" : "left");
  };
  if (!images || images.length === 0) {
    return null;
  }

  //svgs below for arrows
  return (
    <div className="carousel-images relative rounded-lg max-w-screen-md  overflow-hidden h-80">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          className="w-[540px] h-full object-cover rounded-lg"
          alt={`Property photo ${currentIndex + 1}`}
          variants={slideVariants}
          initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
        />
      </AnimatePresence>


      <div className="flex justify-between top-0 bottom-0 m-auto">
        <div
          className=" text-white p-2 rounded-full cursor-pointer absolute top-0 bottom-0 m-auto h-10 w-10 left-0"
          onClick={handlePrevious}
        >

          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              aria-label="left arrow"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          }
        </div>
        <div
          className=" p-2 rounded-full cursor-pointer m-auto h-10 w-10 absolute right-0 top-0 bottom-0"
          onClick={handleNext}
        >
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-6 h-6"
              aria-label="right arrow"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          }
        </div>
      </div>

      <div className="carousel-indicator flex justify-center mt-4 absolute bottom-2 w-full">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot bg-nesstLightGrey w-2 h-2 rounded-full mx-1 ${
              currentIndex === index ? "active bg-white" : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
