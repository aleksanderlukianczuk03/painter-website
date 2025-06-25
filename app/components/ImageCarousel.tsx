'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface ImageCarouselProps {
  images: any[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return <div>No images available.</div>;
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening when clicking arrows
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening when clicking arrows
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsZoomed(false); // Reset zoom state each time modal is opened
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from closing the modal
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      {/* The main carousel on the page */}
      <div className="relative w-full h-full group">
        <div 
          className="relative w-full aspect-square overflow-hidden rounded-lg cursor-zoom-in"
          onClick={openModal}
        >
          <Image
            src={urlFor(images[currentIndex]).url()}
            alt={`Painting view ${currentIndex + 1}`}
            fill
            priority
            className="object-cover transition-opacity duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <ZoomIn className="text-white h-16 w-16 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
          </div>
        </div>

        {/* Carousel navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-opacity-60 transition-all duration-300 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-opacity-60 transition-all duration-300 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* The Modal for the zoomed-in view */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <div 
            className="relative w-[90vw] h-[90vh] cursor-zoom-in"
            onClick={toggleZoom}
          >
            <Image
              src={urlFor(images[currentIndex]).url()}
              alt={`Painting view ${currentIndex + 1} zoomed`}
              fill
              className={`object-contain transition-transform duration-300 ease-in-out ${isZoomed ? 'scale-125' : 'scale-100'}`}
            />
          </div>
        </div>
      )}
    </>
  );
}