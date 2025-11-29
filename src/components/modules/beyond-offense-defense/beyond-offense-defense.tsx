"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Step {
  step: string;
  position: number;
}

const steps: Step[] = [
  { step: 'had to tap!', position: 0 },
  { step: 'Resisting a submission', position: 1 },
  { step: 'Limbs isolated', position: 2 },
  { step: 'Alignment compromised', position: 3 },
  { step: 'Frames collapsing', position: 4 },
  { step: 'Dominated Position', position: 5 },
  { step: 'Losing Grip Fight', position: 6 },
  { step: 'Disengaged', position: 7 },
  { step: 'Dominant Grips', position: 8 },
  { step: 'Dominant Position', position: 9 },
  { step: 'Pressure, Collapsing their frames', position: 10 },
  { step: 'Opponent\'s alignment compromised', position: 11 },
  { step: 'Opponent\'s Limbs isolated', position: 12 },
  { step: 'Applying a controlled submission', position: 13 },
  { step: 'Opponent tapped.', position: 14 }
];

export const BeyondOffenseDefense: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const totalSteps = steps.length - 1;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Beyond offense and defense</h1>
        <p className="text-lg text-text-muted">
          it's always the same : improve your relative position
        </p>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="w-full h-[500px] sm:h-[480px] md:h-[640px] relative overflow-visible">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 700 800" 
              preserveAspectRatio="xMidYMid meet"
              className="overflow-visible"
            >
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="positionGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff4444" /> {/* Red at bottom */}
                  <stop offset="25%" stopColor="#ff6b35" /> {/* Orange-red */}
                  <stop offset="50%" stopColor="#808080" /> {/* Grey at center */}
                  <stop offset="75%" stopColor="#4caf50" /> {/* Light green */}
                  <stop offset="100%" stopColor="#2e7d32" /> {/* Dark green at top */}
                </linearGradient>
                
                {/* Arrow markers */}
                <marker 
                  id="arrowhead-red" 
                  markerWidth="10" 
                  markerHeight="7" 
                  refX="9" 
                  refY="3.5" 
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ff4444" />
                </marker>
                <marker 
                  id="arrowhead-green" 
                  markerWidth="10" 
                  markerHeight="7" 
                  refX="9" 
                  refY="3.5" 
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#4caf50" />
                </marker>
              </defs>
              
              {/* Main diagonal line with gradient - steeper angle (less horizontal width) */}
              <line 
                x1="50" 
                y1="750" 
                x2="550" 
                y2="50" 
                stroke="url(#positionGradient)" 
                strokeWidth="3"
              />
              
              {/* Arrow pointing down (getting worse) - bottom right */}
              <line 
                x1="450" 
                y1="700" 
                x2="450" 
                y2="750" 
                stroke="#ff4444" 
                strokeWidth="2"
                markerEnd="url(#arrowhead-red)"
              />
              <text 
                x={isMobile ? "460" : "470"} 
                y="725" 
                fill="#ff4444" 
                fontSize={isMobile ? "18" : "16"}
                fontWeight="bold"
                textAnchor="start"
              >
                getting worse
              </text>
              
              {/* Arrow pointing up (getting better) - top left */}
              <line 
                x1="100" 
                y1="100" 
                x2="100" 
                y2="50" 
                stroke="#4caf50" 
                strokeWidth="2"
                markerEnd="url(#arrowhead-green)"
              />
              <text 
                x="120" 
                y="75" 
                fill="#4caf50" 
                fontSize={isMobile ? "18" : "16"}
                fontWeight="bold"
              >
                getting better
              </text>
              
              {/* Step labels and circles */}
              {steps.map((item, index) => {
                const progress = item.position / totalSteps;
                // Steeper line: less horizontal range (500 instead of 700), same vertical range
                const x = 50 + progress * 500;
                const y = 750 - progress * 700;
                
                // Stagger text positioning to avoid overlap - more space on mobile
                // For right-side text (odd indices), use more horizontal offset to prevent cutoff
                let textOffset = index % 2 === 0 ? (isMobile ? -35 : -25) : (isMobile ? 40 : 30);
                let textAnchor: 'start' | 'end' | 'middle' = index % 2 === 0 ? 'end' : 'start';
                
                // Special handling for first and last steps - more space on mobile
                if (index === 0) {
                  textOffset = isMobile ? 40 : 30;
                  textAnchor = 'start';
                }
                if (index === steps.length - 1) {
                  textOffset = isMobile ? -45 : -35;
                  textAnchor = 'end';
                }
                
                // Show all labels on desktop, every other on mobile
                const showLabel = !isMobile || index % 2 === 0;
                
                return (
                  <g key={index}>
                    {/* Circle at each step */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={isMobile ? "7" : "6"} 
                      fill="#ffffff" 
                      stroke="#ffffff" 
                      strokeWidth="2"
                    />
                    
                    {/* Step text with wrapping for long labels */}
                    {showLabel && (() => {
                      const fontSize = isMobile ? "18" : "14";
                      const isLong = item.step.length > (isMobile ? 15 : 22);
                      if (isLong) {
                        // Split long text into two lines
                        const words = item.step.split(' ');
                        const midPoint = Math.ceil(words.length / 2);
                        const line1 = words.slice(0, midPoint).join(' ');
                        const line2 = words.slice(midPoint).join(' ');
                        const lineSpacing = isMobile ? 12 : 8;
                        return (
                          <g>
                            <text
                              x={x + (textOffset > 0 ? (isMobile ? 20 : 15) : (isMobile ? -20 : -15))}
                              y={y + textOffset - lineSpacing}
                              fill="#ffffff"
                              fontSize={fontSize}
                              style={{ 
                                paintOrder: 'stroke',
                                stroke: 'hsl(var(--background))',
                                strokeWidth: isMobile ? '4' : '3',
                                strokeLinejoin: 'round'
                              }}
                              textAnchor={textAnchor}
                              dominantBaseline="middle"
                            >
                              {line1}
                            </text>
                            <text
                              x={x + (textOffset > 0 ? (isMobile ? 20 : 15) : (isMobile ? -20 : -15))}
                              y={y + textOffset + lineSpacing}
                              fill="#ffffff"
                              fontSize={fontSize}
                              style={{ 
                                paintOrder: 'stroke',
                                stroke: 'hsl(var(--background))',
                                strokeWidth: isMobile ? '4' : '3',
                                strokeLinejoin: 'round'
                              }}
                              textAnchor={textAnchor}
                              dominantBaseline="middle"
                            >
                              {line2}
                            </text>
                          </g>
                        );
                      }
                      return (
                        <text
                          x={x + (textOffset > 0 ? (isMobile ? 20 : 15) : (isMobile ? -20 : -15))}
                          y={y + textOffset}
                          fill="#ffffff"
                          fontSize={fontSize}
                          style={{ 
                            paintOrder: 'stroke',
                            stroke: 'hsl(var(--background))',
                            strokeWidth: isMobile ? '4' : '3',
                            strokeLinejoin: 'round'
                          }}
                          textAnchor={textAnchor}
                          dominantBaseline="middle"
                        >
                          {item.step}
                        </text>
                      );
                    })()}
                  </g>
                );
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-raised border-border-subtle">
        <CardContent className="pt-6">
          <p className="text-base sm:text-sm text-text-primary leading-relaxed">
            This one was inspired by a discussion I had with Wim Deputter, and I like this model. 
            It goes to a simple truth : wherever we are in a match or fight, we want to get to a 
            better place, until it's over.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

