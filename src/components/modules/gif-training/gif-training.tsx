"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getGifUrl } from '@/config/media';

interface GifInfo {
  filename: string;
  name: string;
}

// TODO: Replace with actual GIF manifest/list
// This will be generated from the R2 bucket or a manifest file
const getAllGifs = (): GifInfo[] => {
  // Placeholder - in production, this could:
  // 1. Fetch from a manifest.json file in R2
  // 2. Use a server-side API route to list R2 objects
  // 3. Use a hardcoded list (like visual-notes does)
  return [];
};

export const GifTraining: React.FC = () => {
  const [allGifs, setAllGifs] = useState<GifInfo[]>(getAllGifs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGif, setSelectedGif] = useState<GifInfo | null>(null);

  // Filter GIFs based on search query
  const filteredGifs = useMemo(() => {
    if (!searchQuery.trim()) {
      return allGifs;
    }
    const query = searchQuery.toLowerCase();
    return allGifs.filter(
      (gif) =>
        gif.name.toLowerCase().includes(query) ||
        gif.filename.toLowerCase().includes(query)
    );
  }, [allGifs, searchQuery]);

  // Load GIFs on mount
  useEffect(() => {
    // TODO: Fetch GIF list from R2 or manifest
    // For now, using placeholder
    setAllGifs(getAllGifs());
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle>Gif Training</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            10+ years of gif made and collected over the years as dynamic visual reminders
          </p>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search GIFs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* GIF Grid */}
          {filteredGifs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {allGifs.length === 0 ? (
                <p>No GIFs loaded. Configure GIF manifest or R2 bucket listing.</p>
              ) : (
                <p>No GIFs match your search.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredGifs.map((gif) => (
                <div
                  key={gif.filename}
                  className="cursor-pointer group relative overflow-hidden rounded-lg bg-background/50 hover:bg-background/80 transition-all aspect-square"
                  onClick={() => setSelectedGif(gif)}
                >
                  <img
                    src={getGifUrl(gif.filename)}
                    alt={gif.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-xs text-foreground truncate">{gif.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fullscreen Modal */}
          {selectedGif && (
            <div
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedGif(null)}
            >
              <div className="relative max-w-4xl max-h-full">
                <img
                  src={getGifUrl(selectedGif.filename)}
                  alt={selectedGif.name}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setSelectedGif(null)}
                    className="bg-background/80 hover:bg-background rounded-full p-2 transition-colors"
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm font-medium">{selectedGif.name}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

