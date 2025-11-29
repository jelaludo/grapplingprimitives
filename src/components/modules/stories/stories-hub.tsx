"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  description: string;
  pages: number;
  folder: string;
}

const stories: Story[] = [
  {
    id: 'explain-everything',
    title: 'Explain Everything!',
    description: "Let's start at the beginning...",
    pages: 4,
    folder: 'ExplainEverything'
  },
  {
    id: 'no-regrets',
    title: 'No Regrets',
    description: "You've never regretted going",
    pages: 8,
    folder: 'NoRegrets'
  }
];

export const StoriesHub: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setCurrentPage(1);
  };

  const handlePageChange = useCallback((direction: 'next' | 'prev') => {
    if (!selectedStory || isTransitioning) return;
    
    if (direction === 'next' && currentPage >= selectedStory.pages) return;
    if (direction === 'prev' && currentPage <= 1) return;
    
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 300);
  }, [selectedStory, currentPage, isTransitioning]);

  useEffect(() => {
    if (!selectedStory) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        handlePageChange('next');
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePageChange('prev');
      } else if (event.key === 'Escape') {
        setSelectedStory(null);
        setCurrentPage(1);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedStory, handlePageChange]);

  const getPageImage = (story: Story, page: number) => {
    const paddedPage = page.toString().padStart(3, '0');
    const fileName = story.folder === 'ExplainEverything' 
      ? `${paddedPage}Hobbit.avif`
      : `${paddedPage}Regret.avif`;
    return `/images/stories/${story.folder}/${fileName}`;
  };

  // Story viewer (fullscreen when story is selected)
  if (selectedStory) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedStory(null);
                  setCurrentPage(1);
                }}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-white font-mono text-lg">
                {selectedStory.title} - Page {currentPage} of {selectedStory.pages}
              </h2>
            </div>
          </div>
        </div>

        {/* Page Content - scrollable area */}
        <div className="flex-1 min-h-0 flex items-center justify-center p-4 relative overflow-auto">
          {/* Navigation Buttons */}
          {currentPage > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange('prev')}
              className="fixed left-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/70 bg-black/50 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          
          {currentPage < selectedStory.pages && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange('next')}
              className="fixed right-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/70 bg-black/50 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          )}

          {/* Page Image */}
          <div
            className={`w-full h-full flex items-center justify-center transition-opacity duration-300 ${
              isTransitioning ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <picture className="block max-w-full max-h-full">
              <source srcSet={getPageImage(selectedStory, currentPage)} type="image/avif" />
              <img
                src={getPageImage(selectedStory, currentPage)}
                alt={`${selectedStory.title} - Page ${currentPage}`}
                className="max-w-full max-h-full w-auto h-auto object-contain block"
                onError={(e) => {
                  console.error('Image failed to load:', e.currentTarget.src);
                  e.currentTarget.style.opacity = '0.5';
                }}
                onLoad={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              />
            </picture>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex-shrink-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange('prev')}
              className="text-white border-white hover:bg-white/20 disabled:opacity-50"
            >
              Previous
            </Button>
            <span className="text-white text-sm">
              {currentPage} / {selectedStory.pages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage >= selectedStory.pages}
              onClick={() => handlePageChange('next')}
              className="text-white border-white hover:bg-white/20 disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Story selection hub
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Stories</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <Card 
            key={story.id} 
            className="aspect-[1/1.2] overflow-hidden cursor-pointer hover:border-primary transition-colors"
            onClick={() => handleStorySelect(story)}
          >
            <CardHeader>
              <CardTitle className="font-mono">{story.title}</CardTitle>
              <CardDescription className="font-mono">
                {story.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-2">
              <p className="text-sm text-text-muted font-mono">
                {story.pages} pages
              </p>
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={getPageImage(story, 1)}
                  alt={`${story.title} preview`}
                  className="w-4/5 h-4/5 object-cover rounded-lg opacity-80"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

