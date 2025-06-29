'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor, client } from '../lib/sanity';
import { ChevronLeft, ChevronRight, X, ZoomIn, Play } from 'lucide-react';

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
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsZoomed(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const isVideo = (item: any) => {
    return item._type === 'file';
  };

  const getVideoUrl = (item: any) => {
    if (item.asset && item.asset._ref) {
      // Use Sanity's file URL structure
      const projectId = client.config().projectId;
      const dataset = client.config().dataset;
      const ref = item.asset._ref;
      
      // Extract file ID and extension from reference
      const [, id, extension] = ref.match(/^file-([a-f0-9]+)-(\w+)$/) || [];
      
      if (id && extension) {
        return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
      }
    }
    return '';
  };

  const renderMedia = (item: any, isModal = false) => {
    if (isVideo(item)) {
      const videoUrl = getVideoUrl(item);
      console.log('Video URL:', videoUrl); // Debug log
      
      return (
        <video
          controls
          preload="metadata"
          className={`w-full h-full object-contain ${isModal && isZoomed ? 'scale-125' : 'scale-100'} transition-transform duration-300 ease-in-out`}
          onClick={(e) => e.stopPropagation()}
          onError={(e) => console.error('Video error:', e)}
          onLoadStart={() => console.log('Video load started')}
          onCanPlay={() => console.log('Video can play')}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <Image
          src={urlFor(item).url()}
          alt={`Painting view ${currentIndex + 1}`}
          fill
          priority={currentIndex === 0}
          className={`object-cover transition-opacity duration-500 ease-in-out ${isModal ? 'object-contain' : ''} ${isModal && isZoomed ? 'scale-125' : 'scale-100'}`}
        />
      );
    }
  };

  return (
    <>
      {/* The main carousel on the page */}
      <div className="relative w-full h-full group">
        <div 
          className="relative w-full aspect-square overflow-hidden rounded-lg cursor-zoom-in"
          onClick={openModal}
        >
          {renderMedia(images[currentIndex])}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            {isVideo(images[currentIndex]) ? (
              <Play className="text-white h-16 w-16 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
            ) : (
              <ZoomIn className="text-white h-16 w-16 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
            )}
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
            onClick={isVideo(images[currentIndex]) ? undefined : toggleZoom}
          >
            {renderMedia(images[currentIndex], true)}
          </div>
        </div>
      )}
    </>
  );
}