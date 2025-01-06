"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const galleryItems = [
  { id: 1, type: "image", src: "/images/1-3.jpg", alt: "Gallery Image 1" },
  { id: 2, type: "video", src: "/images/lounge-et-spa-2021.mp4", alt: "Gallery Video 1" },
  { id: 3, type: "image", src: "/images/10.jpg", alt: "Gallery Image 2" },
  { id: 4, type: "video", src: "/images/lounge-et-spa-2021.mp4", alt: "Gallery Video 2" },
  { id: 5, type: "image", src: "/images/8.jpg", alt: "Gallery Image 3" },
];

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : galleryItems.length - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex < galleryItems.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="min-h-screen bg-secondary py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Gallery
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={500}
                  height={400}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-64 object-cover"
                  controls
                  onClick={(e) => e.preventDefault()} // Prevent video autoplay in grid
                />
              )}
              <div className="p-4">
                <p className="text-sm text-gray-500">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedIndex !== null && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
            className="lg:h-[80vh] max-w-[70vw] gap-4 flex  items-center justify-center relative"
          >
          

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="transform -translate-y-1/2 text-gray-700 hover:text-black focus:outline-none bg-white p-2 rounded-full text-4xl"
            >
            <IoIosArrowBack />
            </button>
           

            {/* Display Image or Video */} 
            {galleryItems[selectedIndex].type === "image" ? (
              <Image
                src={galleryItems[selectedIndex].src}
                alt={galleryItems[selectedIndex].alt}
                width={500}
                height={400}
                className="w-auto h-full rounded-lg"
              />
            ) : (
              <video
                src={galleryItems[selectedIndex].src}
                controls
                width={500}
                height={400}
                className="w-auto h-full rounded-lg"
              />
            )}

<button
              onClick={handleNext}
              className="transform -translate-y-1/2 text-gray-700 hover:text-black focus:outline-none bg-white p-2 rounded-full text-4xl"
            >
             <IoIosArrowForward />
            </button>

            {/* <p className="text-center text-gray-700 mt-4">
              {galleryItems[selectedIndex].alt}
            </p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
