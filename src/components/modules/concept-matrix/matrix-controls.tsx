"use client";

import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatrixControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  className?: string;
}

export function MatrixControls({
  onZoomIn,
  onZoomOut,
  onReset,
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
    </div>
  );
}

