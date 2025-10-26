"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export type CarouselSlide = {
  src: string;
  caption: string;
  sizes?: string; // Optional override for sizes
  priority?: boolean; // Optional priority for LCP
};

export interface CarouselSlidesProps {
  carouselSlides: CarouselSlide[];
}

const CarouselSlides = ({ carouselSlides }: CarouselSlidesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * 100
      }%)`;
    }
  }, [currentIndex]);
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-1000 ease-in-out w-full h-full"
      >
        {carouselSlides.map((slide, index) => (
          <div key={index} className="relative flex-shrink-0 w-full h-full">
            <Image
              src={slide.src}
              alt={`carousel image ${index + 1}`}
              fill
              sizes={slide.sizes ?? "(max-width: 768px) 100vw, 1200px"}
              priority={slide.priority ?? index === 0}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>

            {/* Color-based smoke effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
              <div className="absolute w-full h-full bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-full filter blur-xl animate-smoke"></div>
              <div className="absolute w-full h-full bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-t-full filter blur-2xl animate-smoke2"></div>
            </div>

            <div className="absolute bottom-12 left-4 right-4 text-center">
              <p className="text-white text-2xl font-bold">{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {carouselSlides.map((_, index) => (
          <span
            key={index}
            className={`w-8 h-1 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-white w-10" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselSlides;
