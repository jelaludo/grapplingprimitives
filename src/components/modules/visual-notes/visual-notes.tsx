"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageInfo {
  src: string;
  name: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
}

// Get all images from the visualnotes folder
const getAllImages = (): ImageInfo[] => {
  const imageFiles = [
    '1674_DutchWrestlingManual.png',
    'IMG_0030.jpg',
    'IMG_0031.jpg',
    'IMG_0095.jpg',
    'IMG_0113.jpg',
    'IMG_0115.jpg',
    'IMG_0117.jpg',
    'IMG_0123.jpg',
    'IMG_0126.jpg',
    'IMG_0128.jpg',
    'IMG_0129.jpg',
    'IMG_0130.jpg',
    'IMG_0131.jpg',
    'IMG_0136.jpg',
    'IMG_0137.jpg',
    'IMG_0148.jpg',
    'IMG_0149.jpg',
    'IMG_0150.jpg',
    'IMG_0168.jpg',
    'IMG_0169.jpg',
    'IMG_0187.jpg',
    'IMG_0208.jpg',
    'IMG_0213.jpg',
    'IMG_0215.jpg',
    'IMG_0221.jpg',
    'IMG_0225.jpg',
    'IMG_0249.jpg',
    'IMG_0250.jpg',
    'IMG_0296.jpg',
    'IMG_0301.jpg',
    'IMG_0302.jpg',
    'IMG_0305.jpg',
    'IMG_0311.jpg',
    'IMG_0485.jpg',
    'IMG_0504.jpg',
    'IMG_0505.jpg',
    'IMG_0506.jpg',
    'IMG_0507.jpg',
    'IMG_0509.jpg',
    'IMG_0510.jpg',
    'IMG_0511.jpg',
    'IMG_0512.jpg',
    'IMG_0517.jpg',
    'IMG_0518.jpg',
    'IMG_0522.jpg',
    'IMG_0523.jpg',
    'IMG_0531.jpg',
    'IMG_0539.jpg',
    'IMG_0540.jpg',
    'IMG_0542.jpg',
    'IMG_0543.jpg',
    'IMG_0544.jpg',
    'IMG_2391.jpg',
    'IMG_4507.jpg',
    'IMG_4871.jpg',
    'IMG_7206.jpg',
    'Screen Shot 2022-06-28 at 13.29.05.jpg',
    'Screen Shot 2022-06-28 at 13.29.59.jpg',
    'Screen Shot 2022-06-28 at 13.30.03.jpg',
    'Screen Shot 2022-06-28 at 13.30.20.jpg',
    'Screen Shot 2022-08-31 at 10.03.39.jpg',
    'Screen Shot 2022-08-31 at 10.04.05.jpg',
    'Screen Shot 2022-08-31 at 10.04.31.jpg',
    'Screen Shot 2022-08-31 at 10.14.15.jpg',
    'Screen Shot 2022-08-31 at 9.53.35.jpg',
    'Screen Shot 2022-08-31 at 9.55.34.jpg',
  ];

  return imageFiles.map(name => ({
    src: `/images/visualnotes/${name}`,
    name,
  }));
};

export const VisualNotes: React.FC = () => {
  const [allImages, setAllImages] = useState<ImageInfo[]>(getAllImages());
  const [carouselImages, setCarouselImages] = useState<ImageInfo[]>([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [imageDimensions, setImageDimensions] = useState<Map<string, { width: number; height: number; aspectRatio: number }>>(new Map());

  // Load random carousel images on mount
  useEffect(() => {
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setCarouselImages(shuffled.slice(0, Math.min(5, shuffled.length)));
  }, []);

  // Load image dimensions
  useEffect(() => {
    const loadDimensions = async () => {
      const dimensions = new Map<string, { width: number; height: number; aspectRatio: number }>();
      
      for (const img of allImages) {
        const image = new Image();
        image.src = img.src;
        await new Promise((resolve) => {
          image.onload = () => {
            const aspectRatio = image.width / image.height;
            dimensions.set(img.src, {
              width: image.width,
              height: image.height,
              aspectRatio,
            });
            resolve(null);
          };
          image.onerror = () => resolve(null);
        });
      }
      
      setImageDimensions(dimensions);
    };

    loadDimensions();
  }, [allImages]);

  // Sort images by size (area) for bento box layout
  const sortedImages = useMemo(() => {
    return [...allImages].sort((a, b) => {
      const dimA = imageDimensions.get(a.src);
      const dimB = imageDimensions.get(b.src);
      
      if (!dimA && !dimB) return 0;
      if (!dimA) return 1;
      if (!dimB) return -1;
      
      const areaA = dimA.width * dimA.height;
      const areaB = dimB.width * dimB.height;
      
      return areaB - areaA; // Largest first
    });
  }, [allImages, imageDimensions]);

  const handleImageClick = (image: ImageInfo) => {
    if (selectedImage?.src === image.src) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  const nextCarouselImage = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevCarouselImage = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Bento box layout helper - creates a masonry-style grid that dovetails by size
  // Uses responsive spans that adapt to available columns
  const getBentoGridClass = (index: number, aspectRatio?: number, area?: number): string => {
    if (!aspectRatio) return 'col-span-1 row-span-1';
    
    // Determine grid span based on aspect ratio, size, and position
    const isWide = aspectRatio > 1.3;
    const isTall = aspectRatio < 0.7;
    const isSquare = aspectRatio >= 0.9 && aspectRatio <= 1.1;
    const isLarge = area && area > 2000000; // Large images (roughly 2MP+)
    const isMedium = area && area > 500000 && area <= 2000000;
    
    // Create variety: larger images get more space, smaller ones fit in gaps
    // Spans are relative and will adapt to the auto-fill grid
    if (isLarge && isSquare) {
      return 'col-span-2 row-span-2';
    } else if (isLarge && isWide) {
      return 'col-span-2 row-span-1';
    } else if (isLarge && isTall) {
      return 'col-span-1 row-span-2';
    } else if (isMedium && isWide) {
      return 'col-span-2 row-span-1';
    } else if (isMedium && isTall) {
      return 'col-span-1 row-span-2';
    } else if (isMedium && isSquare) {
      return 'col-span-2 row-span-2';
    } else if (index % 7 === 0 && isWide) {
      return 'col-span-2 row-span-1';
    } else if (index % 11 === 0 && isTall) {
      return 'col-span-1 row-span-2';
    } else if (isWide) {
      return 'col-span-2 row-span-1';
    } else if (isTall) {
      return 'col-span-1 row-span-2';
    }
    
    return 'col-span-1 row-span-1';
  };

  return (
    <div className="space-y-6">
      {/* Random Carousel */}
      {carouselImages.length > 0 && (
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-background/50">
              <img
                src={carouselImages[currentCarouselIndex]?.src}
                alt={carouselImages[currentCarouselIndex]?.name}
                className="w-full h-full object-contain"
              />
              
              {carouselImages.length > 1 && (
                <>
                  <button
                    onClick={prevCarouselImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextCarouselImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {carouselImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentCarouselIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentCarouselIndex
                            ? 'w-8 bg-foreground'
                            : 'w-2 bg-foreground/40'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bento Box Grid */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-2xl font-bold mb-4">All Visual Notes</h2>
          
          {selectedImage ? (
            // Full size view
            <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.name}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={() => setSelectedImage(null)}
              />
            </div>
          ) : (
            // Bento box grid - flexible columns that adapt to screen width
            <div 
              className="grid gap-2 sm:gap-4 auto-rows-[minmax(150px,auto)] justify-items-start"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))'
              }}
            >
              {sortedImages.map((image, index) => {
                const dims = imageDimensions.get(image.src);
                const area = dims ? dims.width * dims.height : undefined;
                const gridClass = getBentoGridClass(index, dims?.aspectRatio, area);
                // Check if item spans multiple columns - if so, center it when alone in row
                const spansMultipleCols = gridClass.includes('col-span-2') || gridClass.includes('col-span-3');
                
                return (
                  <div
                    key={image.src}
                    className={`${gridClass} cursor-pointer group relative overflow-hidden rounded-lg bg-background/50 hover:bg-background/80 transition-all min-h-[150px] ${spansMultipleCols ? 'justify-self-center' : ''}`}
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

