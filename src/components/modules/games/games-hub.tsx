"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CentroidGame } from './centroid-game';
import { MemoryGame } from './memory-game';
import { ArrowLeft } from 'lucide-react';

interface GamesHubProps {
  onExit?: () => void;
  initial?: 'none' | 'centroid' | 'memory';
}

export const GamesHub: React.FC<GamesHubProps> = ({ onExit, initial = 'none' }) => {
  const [selected, setSelected] = useState<'none'|'centroid'|'memory'>(initial);

  React.useEffect(() => {
    setSelected(initial);
  }, [initial]);

  if (selected === 'centroid') {
    return (
      <div className="w-full">
        <CentroidGame onClose={() => setSelected('none')} />
      </div>
    );
  }
  if (selected === 'memory') {
    return (
      <div className="w-full">
        <MemoryGame onClose={() => setSelected('none')} />
      </div>
    );
  }

  const renderCentroidPreview = () => {
    const GRID = 11;
    const sampleDots = [
      { x: 2, y: 2 }, { x: 3, y: 7 }, { x: 5, y: 4 }, { x: 7, y: 2 }, { x: 8, y: 8 }, { x: 2, y: 9 }
    ];
    const centroid = (pts: Array<{x:number;y:number}>) => {
      const sx = pts.reduce((s,p)=>s+p.x,0);
      const sy = pts.reduce((s,p)=>s+p.y,0);
      return { x: sx/pts.length, y: sy/pts.length };
    };
    const nearest = (p:{x:number;y:number}) => ({ x: Math.round(p.x), y: Math.round(p.y) });
    const actual = centroid(sampleDots);
    const optimal = nearest(actual);
    const guess = { x: Math.min(GRID-1, optimal.x+1), y: optimal.y };
    const cells: React.ReactElement[] = [];
    for (let y=0;y<GRID;y++) {
      for (let x=0;x<GRID;x++) {
        const isDot = sampleDots.some(d=>d.x===x && d.y===y);
        const isGuess = guess.x===x && guess.y===y;
        const isOptimal = Math.round(actual.x)===x && Math.round(actual.y)===y;
        let bg = 'transparent';
        if (isGuess) bg = 'bg-red-500';
        else if (isOptimal) bg = 'bg-green-500';
        else if (isDot) bg = 'bg-blue-500';
        cells.push(
          <div key={`${x}-${y}`} className={`border border-white/10 ${bg}`} />
        );
      }
    }
    return (
      <div className="w-full">
        <div
          className="relative w-full aspect-square grid bg-bg rounded overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)`, gridTemplateRows: `repeat(${GRID}, 1fr)` }}
        >
          {cells}
          <svg
            viewBox={`0 0 ${GRID} ${GRID}`}
            preserveAspectRatio="none"
            className="absolute inset-0 pointer-events-none w-full h-full"
          >
            {sampleDots.map((d,i)=> (
              <line
                key={i}
                x1={d.x+0.5}
                y1={d.y+0.5}
                x2={optimal.x+0.5}
                y2={optimal.y+0.5}
                stroke="#66bb6a"
                strokeWidth={0.15}
                opacity={0.6}
              />
            ))}
          </svg>
        </div>
        <div className="mt-2 text-xs">
          <div>Blue = dots</div>
          <div className="text-green-400">Green = true centroid</div>
          <div className="text-red-400">Red = your guess</div>
        </div>
      </div>
    );
  };

  const renderMemoryPreview = () => {
    const COLS = 4, ROWS = 4, GAP = 6;
    const BACK_URL = '/images/memory/Memory_JJJ_Back_440x.webp';
    const frontSrc = (id: string, ext: 'avif'|'webp') => `/images/memory/${ext}/${id}.${ext}`;
    const faceMap: Record<number, string> = { 5: '001', 6: '002' };
    const grid: React.ReactElement[] = [];
    for (let i=0;i<COLS*ROWS;i++) {
      const faceId = faceMap[i];
      grid.push(
        <div key={i} className="rounded-lg overflow-hidden shadow-md bg-bg aspect-[440/597]">
          {faceId ? (
            <picture>
              <source srcSet={frontSrc(faceId, 'avif')} type="image/avif" />
              <source srcSet={frontSrc(faceId, 'webp')} type="image/webp" />
              <img
                src={frontSrc(faceId, 'webp')}
                alt={`front-${faceId}`}
                width={440}
                height={597}
                className="w-full h-full object-cover"
              />
            </picture>
          ) : (
            <img
              src={BACK_URL}
              alt="back"
              width={440}
              height={597}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      );
    }
    return (
      <div className="w-full">
        <div
          className="grid gap-1.5 w-full"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        >
          {grid}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full font-mono tracking-wider">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Games</h2>
        {onExit && (
          <Button variant="outline" size="sm" onClick={onExit} className="font-mono tracking-wider">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Modules
          </Button>
        )}
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="aspect-[1/1.2] md:aspect-[2/3] max-h-[380px] md:max-h-[520px] rounded-xl overflow-hidden flex">
          <button
            onClick={() => setSelected('centroid')}
            className="flex flex-col gap-1 md:gap-2 flex-1 p-2 md:p-4 text-left w-full"
          >
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-mono">Centroid</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-stretch justify-center w-full p-0">
              {renderCentroidPreview()}
            </CardContent>
          </button>
        </Card>
        <Card className="aspect-[1/1.2] md:aspect-[2/3] max-h-[380px] md:max-h-[520px] rounded-xl overflow-hidden flex">
          <button
            onClick={() => setSelected('memory')}
            className="flex flex-col gap-1 md:gap-2 flex-1 p-2 md:p-4 text-left w-full"
          >
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-mono">JJJ Memory</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-stretch justify-center w-full p-0">
              {renderMemoryPreview()}
            </CardContent>
          </button>
        </Card>
      </div>
    </div>
  );
};

