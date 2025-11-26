"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ConceptPoint, CONCEPTS } from "@/data/concepts";
import { usePanZoom } from "@/lib/matrix/panzoom";
import { getViewBox } from "@/lib/matrix/scales";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MatrixControls } from "./matrix-controls";
import { loadConcepts, type ConceptData } from "@/lib/data/load-concepts";
import { Filter, X } from "lucide-react";

interface ConceptMatrixProps {
  concepts?: ConceptPoint[];
  width?: number;
  height?: number;
}

// Category color mapping - will be populated from actual data
const CATEGORY_COLORS: Record<string, string> = {
  "Grappling Primitives": "#848a94",
  "Tactics": "#8A2BE2",
  "Strategy": "#FF8C00",
  "Training": "#00CED1",
  "Coaching": "#6b6d70",
  "Memes": "#8A2BE2",
  "21 Immutable Principles": "#FFD700",
  "32 Principles": "#FFD700",
  "Default": "#6B7280",
};

function getCategoryColor(category: string, categoryMap?: Map<string, string>): string {
  if (categoryMap && categoryMap.has(category)) {
    return categoryMap.get(category)!;
  }
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.Default;
}

export function ConceptMatrix({
  concepts: initialConcepts,
  width: initialWidth,
  height: initialHeight,
}: ConceptMatrixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedConcept, setSelectedConcept] = useState<ConceptPoint | null>(null);
  const [hoveredConcept, setHoveredConcept] = useState<ConceptPoint | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [concepts, setConcepts] = useState<ConceptPoint[]>(initialConcepts || CONCEPTS);
  const [loading, setLoading] = useState(!initialConcepts);
  const [conceptData, setConceptData] = useState<ConceptData | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [filterExpanded, setFilterExpanded] = useState(false);
  const isPanning = useRef(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });

  const panZoom = usePanZoom();
  
  // Build category map for colors and axis labels
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    if (conceptData?.categories) {
      conceptData.categories.forEach(cat => {
        map.set(cat.name, cat.color);
      });
    }
    return map;
  }, [conceptData]);
  
  // Get axis labels from the first category (or selected categories)
  // Note: X axis = mental_physical, Y axis = self_opponent (matching old D3 code)
  const axisLabels = useMemo(() => {
    if (!conceptData?.categories || conceptData.categories.length === 0) {
      return {
        xAxis: { left: "Mental", right: "Physical" },
        yAxis: { bottom: "Opponent", top: "Self" },
      };
    }
    // Use the first category's axis labels, or from selected categories
    const category = selectedCategories.size > 0
      ? conceptData.categories.find(cat => selectedCategories.has(cat.name))
      : conceptData.categories[0];
    // Swap the labels to match our axis mapping
    return {
      xAxis: category?.yAxis || { left: "Mental", right: "Physical" }, // mental_physical maps to X
      yAxis: category?.xAxis || { bottom: "Opponent", top: "Self" }, // self_opponent maps to Y
    };
  }, [conceptData, selectedCategories]);
  
  // Filter concepts by selected categories
  const filteredConcepts = useMemo(() => {
    if (selectedCategories.size === 0) {
      return concepts;
    }
    return concepts.filter(c => selectedCategories.has(c.category));
  }, [concepts, selectedCategories]);
  
  // Get unique categories from concepts
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    concepts.forEach(c => cats.add(c.category));
    return Array.from(cats).sort();
  }, [concepts]);

  // Load real data if no concepts provided
  useEffect(() => {
    if (!initialConcepts) {
      loadConcepts()
        .then((data) => {
          if (data.concepts.length > 0) {
            console.log(`✅ Loaded ${data.concepts.length} concepts`);
            setConcepts(data.concepts);
            setConceptData(data);
          } else {
            console.warn("⚠️ No concepts loaded");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to load concepts:", error);
          setLoading(false);
        });
    } else {
      console.log(`Using ${initialConcepts.length} provided concepts`);
    }
  }, [initialConcepts]);

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: initialWidth || rect.width || 800,
          height: initialHeight || Math.max(rect.height, 400) || 600,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [initialWidth, initialHeight]);

  // Convert screen coordinates to viewBox coordinates (data space)
  // This gives us the point in the untransformed coordinate system
  const screenToDataSpace = useCallback((screenX: number, screenY: number) => {
    // Convert screen pixel to viewBox coordinate (before transform)
    // viewBox is -2 to 2 (width 4), so: viewBoxX = (screenX / width) * 4 - 2
    const viewBoxX = (screenX / dimensions.width) * 4 - 2;
    const viewBoxY = (screenY / dimensions.height) * 4 - 2;
    
    // The transform is: scale(z) translate(tx/z, ty/z)
    // SVG applies right-to-left: translate first, then scale
    // So to reverse: divide by zoom, then subtract translate
    const dataX = (viewBoxX / panZoom.state.zoom) - (panZoom.state.translateX / panZoom.state.zoom);
    const dataY = (viewBoxY / panZoom.state.zoom) - (panZoom.state.translateY / panZoom.state.zoom);
    return { x: dataX, y: dataY };
  }, [dimensions, panZoom.state]);

  // Convert screen pixel delta to viewBox units for panning
  const screenDeltaToViewBox = useCallback((deltaX: number, deltaY: number) => {
    // Convert screen pixel delta to current viewBox units
    // Current viewBox size = 4 / zoom
    const currentViewBoxSize = 4 / panZoom.state.zoom;
    const viewBoxDeltaX = (deltaX / dimensions.width) * currentViewBoxSize;
    const viewBoxDeltaY = (deltaY / dimensions.height) * currentViewBoxSize;
    return { x: viewBoxDeltaX, y: viewBoxDeltaY };
  }, [dimensions, panZoom.state.zoom]);

  // Handle double-click zoom
  const handleDoubleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    panZoom.zoomBy(0.5, screenX, screenY, dimensions.width, dimensions.height);
  };
  
  // Handle wheel zoom with proper coordinate conversion
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const rect = e.currentTarget.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    panZoom.zoomBy(delta, screenX, screenY, dimensions.width, dimensions.height);
  }, [panZoom, dimensions]);

  // Handle concept click/tap
  const handleConceptClick = (concept: ConceptPoint, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setSelectedConcept(concept);
    
    if (e.type === "touchstart") {
      const touch = (e as React.TouchEvent).touches[0];
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setTooltipPosition({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        });
      }
    } else {
      const mouse = e as React.MouseEvent;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setTooltipPosition({
          x: mouse.clientX - rect.left,
          y: mouse.clientY - rect.top,
        });
      }
    }
  };

  const viewport = {
    width: dimensions.width,
    height: dimensions.height,
    translateX: panZoom.state.translateX,
    translateY: panZoom.state.translateY,
    zoom: panZoom.state.zoom,
  };

  const viewBox = getViewBox(viewport);

  // Convert normalized coordinates (-1 to 1) to SVG viewBox coordinates
  // The viewBox is -2 to 2, so we map directly: -1 maps to -2, 0 to 0, 1 to 2
  // These are FIXED coordinates - dots stay at these positions regardless of zoom/pan
  const toSVGX = (normalized: number) => normalized * 2;
  const toSVGY = (normalized: number) => normalized * 2;

  // Handle quadrant navigation
  const handleQuadrant = (quadrant: 1 | 2 | 3 | 4) => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    // Quadrant centers in normalized coordinates
    const quadrantCenters = {
      1: { x: 0.5, y: 0.5 },   // Top-right
      2: { x: -0.5, y: 0.5 },  // Top-left
      3: { x: -0.5, y: -0.5 }, // Bottom-left
      4: { x: 0.5, y: -0.5 },  // Bottom-right
    };
    
    const target = quadrantCenters[quadrant];
    // Convert to screen coordinates and center
    const screenX = centerX + target.x * (dimensions.width / 2);
    const screenY = centerY - target.y * (dimensions.height / 2);
    
    // Set zoom and translate to center on quadrant
    panZoom.setZoom(1.5);
    panZoom.panBy(
      centerX - screenX,
      centerY - screenY
    );
  };

  if (loading) {
    return (
      <div className="relative w-full h-full min-h-[400px] bg-bg-raised rounded-lg border border-border-subtle flex items-center justify-center">
        <p className="text-text-muted">Loading concepts...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] bg-bg-raised rounded-lg border border-border-subtle overflow-hidden"
      onMouseDown={(e) => {
        if (e.button === 0) {
          isPanning.current = true;
          lastPanPoint.current = { x: e.clientX, y: e.clientY };
          e.preventDefault();
        }
      }}
      onMouseMove={(e) => {
        if (isPanning.current) {
          const deltaX = e.clientX - lastPanPoint.current.x;
          const deltaY = e.clientY - lastPanPoint.current.y;
          const viewBoxDelta = screenDeltaToViewBox(deltaX, deltaY);
          panZoom.panBy(viewBoxDelta.x, viewBoxDelta.y);
          lastPanPoint.current = { x: e.clientX, y: e.clientY };
          e.preventDefault();
        }
      }}
      onMouseUp={() => {
        isPanning.current = false;
      }}
      onMouseLeave={() => {
        isPanning.current = false;
      }}
      onTouchStart={panZoom.handlers.onTouchStart}
      onTouchMove={(e) => panZoom.handlers.onTouchMove(e, screenDeltaToViewBox, dimensions.width, dimensions.height)}
      onTouchEnd={panZoom.handlers.onTouchEnd}
      onDoubleClick={handleDoubleClick}
      onWheel={handleWheel}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={viewBox}
        className="absolute inset-0"
        style={{ touchAction: "none" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern
            id="grid"
            width="0.5"
            height="0.5"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0.5 0 L 0 0 0 0.5"
              fill="none"
              stroke="#1C1F26"
              strokeWidth="0.05"
            />
          </pattern>
        </defs>
        
        {/* Static background grid */}
        <rect x="-2" y="-2" width="4" height="4" fill="url(#grid)" />

        {/* Center lines (axes) - static */}
        <line
          x1="-2"
          y1="0"
          x2="2"
          y2="0"
          stroke="#1C1F26"
          strokeWidth="0.1"
        />
        <line
          x1="0"
          y1="-2"
          x2="0"
          y2="2"
          stroke="#1C1F26"
          strokeWidth="0.1"
        />
        
        {/* Axis labels */}
        <text
          x="-1.9"
          y="0.15"
          fill="#6B7280"
          fontSize="0.3"
          textAnchor="start"
          className="pointer-events-none"
        >
          {axisLabels.xAxis.left}
        </text>
        <text
          x="1.9"
          y="0.15"
          fill="#6B7280"
          fontSize="0.3"
          textAnchor="end"
          className="pointer-events-none"
        >
          {axisLabels.xAxis.right}
        </text>
        <text
          x="0.1"
          y="-1.9"
          fill="#6B7280"
          fontSize="0.3"
          textAnchor="start"
          className="pointer-events-none"
        >
          {axisLabels.yAxis.top}
        </text>
        <text
          x="0.1"
          y="1.9"
          fill="#6B7280"
          fontSize="0.3"
          textAnchor="start"
          className="pointer-events-none"
        >
          {axisLabels.yAxis.bottom}
        </text>

        {/* Dots are at FIXED coordinates - NO TRANSFORM APPLIED */}
        {/* Pan/zoom is controlled by the SVG viewBox attribute, not transforms */}
        {/* This ensures dots NEVER move, only the viewport changes */}

        {/* Concept dots - use filtered concepts */}
        {filteredConcepts.map((concept, index) => {
          const isSelected = selectedConcept?.id === concept.id;
          const isHovered = hoveredConcept?.id === concept.id;
          const color = concept.color || getCategoryColor(concept.category);
          const radius = isSelected ? 0.15 : isHovered ? 0.12 : 0.1; // Scale radius for viewBox
          const svgX = toSVGX(concept.x);
          const svgY = toSVGY(concept.y);

          return (
            <g key={concept.id}>
              <circle
                cx={svgX}
                cy={svgY}
                r={radius}
                fill={color}
                stroke={isSelected ? "#fff" : isHovered ? color : "transparent"}
                strokeWidth={isSelected ? 0.05 : 0.03}
                opacity={isSelected ? 1 : isHovered ? 0.9 : 0.7}
                className="cursor-pointer transition-all"
                onClick={(e) => handleConceptClick(concept, e)}
                onMouseEnter={() => setHoveredConcept(concept)}
                onMouseLeave={() => setHoveredConcept(null)}
                onTouchStart={(e) => handleConceptClick(concept, e)}
              />
              {/* Label on hover/select - scale inversely with zoom to keep size consistent */}
              {(isSelected || isHovered) && (
                <text
                  x={svgX}
                  y={svgY - radius - 0.2}
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize={`${0.3 / panZoom.state.zoom}`}
                  fontWeight="500"
                  className="pointer-events-none"
                >
                  {concept.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Category Filter - Horizontal at top */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-bg-raised border-b border-border-subtle">
        <div className="px-4 py-2 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-muted" />
            <span className="text-sm font-semibold">Categories</span>
          </div>
          
          <Button
            variant={selectedCategories.size === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategories(new Set())}
            className="h-7 px-3 text-xs"
          >
            All
          </Button>
          
          {filterExpanded && (
            <>
              <div className="flex-1 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {availableCategories.map((category) => {
                  const isSelected = selectedCategories.has(category);
                  const color = getCategoryColor(category, categoryMap);
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        const newSet = new Set(selectedCategories);
                        if (isSelected) {
                          newSet.delete(category);
                        } else {
                          newSet.add(category);
                        }
                        setSelectedCategories(newSet);
                      }}
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium transition-all",
                        isSelected
                          ? "bg-accent text-accent-foreground border border-accent"
                          : "bg-bg border border-border-subtle text-text-secondary hover:border-border hover:bg-bg-hover"
                      )}
                      style={isSelected ? { borderColor: color } : {}}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
              {selectedCategories.size > 0 && (
                <span className="text-xs text-text-muted whitespace-nowrap">
                  {filteredConcepts.length} of {concepts.length}
                </span>
              )}
            </>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilterExpanded(!filterExpanded)}
            className="h-7 px-2"
          >
            {filterExpanded ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Controls - positioned to avoid bottom-right quadrant */}
      <div className="absolute bottom-4 left-4 z-20">
        <MatrixControls
          onZoomIn={panZoom.zoomIn}
          onZoomOut={panZoom.zoomOut}
          onReset={panZoom.reset}
          onQuadrant={handleQuadrant}
        />
      </div>

      {/* Tooltip/Card for selected concept */}
      {selectedConcept && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(-50%, -100%)",
            marginTop: "-8px",
          }}
        >
          <Card className="bg-bg-raised border-border-subtle p-3 min-w-[200px] max-w-[300px]">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-sm">{selectedConcept.label}</h4>
                <Badge variant="outline" className="border-border-subtle text-xs">
                  {selectedConcept.category}
                </Badge>
              </div>
              {selectedConcept.description && (
                <p className="text-xs text-text-muted">{selectedConcept.description}</p>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Click outside to deselect */}
      {selectedConcept && (
        <div
          className="absolute inset-0 z-0"
          onClick={() => setSelectedConcept(null)}
          onTouchStart={() => setSelectedConcept(null)}
        />
      )}
    </div>
  );
}

