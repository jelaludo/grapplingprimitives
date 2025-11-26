"use client";

import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Grid3x3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatrixControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onQuadrant?: (quadrant: 1 | 2 | 3 | 4) => void;
  className?: string;
}

export function MatrixControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onQuadrant,
  className,
}: MatrixControlsProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Zoom controls */}
      <div className="flex flex-col gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomIn}
          className="h-10 w-10"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomOut}
          className="h-10 w-10"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="h-10 w-10"
          aria-label="Reset view"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Quadrant navigation */}
      {onQuadrant && (
        <div className="grid grid-cols-2 gap-1 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuadrant(1)}
            className="h-8 text-xs"
            aria-label="Quadrant 1"
          >
            Q1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuadrant(2)}
            className="h-8 text-xs"
            aria-label="Quadrant 2"
          >
            Q2
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuadrant(3)}
            className="h-8 text-xs"
            aria-label="Quadrant 3"
          >
            Q3
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuadrant(4)}
            className="h-8 text-xs"
            aria-label="Quadrant 4"
          >
            Q4
          </Button>
        </div>
      )}
    </div>
  );
}

