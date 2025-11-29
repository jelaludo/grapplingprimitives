"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Dot {
  id: number;
  belt: 'white' | 'blue' | 'purple' | 'brown' | 'black';
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  velocity: number; // Individual velocity multiplier for organic feel
  progress: number; // 0-1 progress along current path
  state: 'spawning' | 'flowing' | 'dropping' | 'settling' | 'settled';
  dropoutReason?: string;
  proficiency: number; // 0-1, determines final X position in bell curve
  startTime: number; // When this dot started its current animation
  duration: number; // Duration for current animation phase
  lastProcessedYear?: number; // Track which year this dot was last processed in
}

interface BeltConfig {
  name: string;
  color: string;
  dropoutRate: number;
  mean: number; // 0-1, center of bell curve
  stdDev: number; // Standard deviation for bell curve
  amplitude: number; // Height of bell curve
  dropoutReasons: string[];
  minX?: number; // Optional minimum X position (0-1) to clamp bell curve left edge
}

const BELTS: BeltConfig[] = [
  {
    name: 'White',
    color: '#CCCCCC',
    dropoutRate: 0.5,
    mean: 0.20,
    stdDev: 0.08,
    amplitude: 100,
    dropoutReasons: ['Injury', 'Confusion', 'Intimidation', 'Scheduling', 'Cost', 'Ego', 'Lack of mentorship', 'Family', 'Work']
  },
  {
    name: 'Blue',
    color: '#0066CC',
    dropoutRate: 0.4,
    mean: 0.35,
    stdDev: 0.08,
    amplitude: 80,
    dropoutReasons: ['Plateau', 'Burnout', 'Ego', 'Lack of mentorship', 'Injury', 'Scheduling', 'Family', 'Work', 'Cost']
  },
  {
    name: 'Purple',
    color: '#660099',
    dropoutRate: 0.3,
    mean: 0.55,
    stdDev: 0.08,
    amplitude: 70,
    dropoutReasons: ['Burnout', 'Injuries', 'Family', 'Work', 'Ego', 'Diminishing returns', 'Plateau', 'Cost']
  },
  {
    name: 'Brown',
    color: '#663300',
    dropoutRate: 0.2,
    mean: 0.70,
    stdDev: 0.08,
    amplitude: 60,
    dropoutReasons: ['Burnout', 'Injuries', 'Family', 'Work', 'Ego', 'Diminishing returns', 'Plateau', 'Cost']
  },
      {
        name: 'Black',
        color: '#404040', // Dark grey instead of black
        dropoutRate: 0.0,
        mean: 0.92, // Shifted further right - worst black belt is better than 99.9% of white belts
        stdDev: 0.04, // Tighter distribution - black belts are more consistent
        amplitude: 50,
        dropoutReasons: [],
        minX: 0.55 // Minimum X position - lowest 1% black belt should be as good as median purple (0.55)
      }
];

// Easing functions for smooth animation
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

export const BeltDropout: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const progressionScheduledRef = useRef(false);
  const [dots, setDots] = useState<Dot[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentYear, setCurrentYear] = useState(0);
  // Initialize belt configs - start with base values, randomize on client side to avoid hydration issues
  const [beltConfigs, setBeltConfigs] = useState<BeltConfig[]>(BELTS);
  
  // Randomize dropout rates on client side only (after mount) to avoid hydration mismatch
  useEffect(() => {
    setBeltConfigs(prev => prev.map(belt => ({
      ...belt,
      // Randomize dropout rate: ±10% variation around base rate, clamped to 0-1
      dropoutRate: Math.max(0, Math.min(1, BELTS.find(b => b.name === belt.name)!.dropoutRate + (Math.random() - 0.5) * 0.2))
    })));
  }, []);
  const [hoveredDot, setHoveredDot] = useState<Dot | null>(null);
  const [totalStarted, setTotalStarted] = useState(0);
  const [totalDroppedOut, setTotalDroppedOut] = useState(0);
  const lastYearNewStudentsAdded = useRef(-1); // Track which year we last added new students for

  const canvasWidth = 1000;
  const canvasHeight = 700;
  const spawnX = 50;
  const spawnY = 50;
  const beltColumnWidth = 150;
  const beltStartX = 200;
  const bellCurveBaseY = 400; // Raised bell curves to make room below
  const dropoutBucketBaseY = canvasHeight - 50; // Firmly below bell curves
  const dropoutLeftX = 20;
  const dropoutRightX = canvasWidth - 20;

  // Generate initial cohort
  const generateInitialCohort = useCallback(() => {
    const newDots: Dot[] = [];
    // Randomize initial cohort size: 85-115 (median ~100)
    const cohortSize = 85 + Math.floor(Math.random() * 31); // 85-115 range
    
    for (let i = 0; i < cohortSize; i++) {
      const proficiency = Math.random(); // Random proficiency 0-1
      const velocity = 0.7 + Math.random() * 0.6; // Individual velocity variation
      
      newDots.push({
        id: i,
        belt: 'white',
        x: spawnX,
        y: spawnY,
        targetX: spawnX,
        targetY: spawnY,
        velocity,
        progress: 0,
        state: 'spawning',
        proficiency,
        startTime: Date.now() + i * 10, // Stagger spawn times
        duration: 400 + Math.random() * 200 // Individual duration (2x faster)
      });
    }
    
    setDots(newDots);
    setTotalStarted(cohortSize);
    setTotalDroppedOut(0);
  }, []);

  // Calculate bell curve Y position for a given X
  const getBellCurveY = useCallback((x: number, beltIndex: number): number => {
    const belt = beltConfigs[beltIndex];
    const normalizedX = (x / canvasWidth - belt.mean) / belt.stdDev;
    const bellHeight = belt.amplitude * Math.exp(-(normalizedX * normalizedX) / 2);
    return bellCurveBaseY - bellHeight;
  }, [beltConfigs, bellCurveBaseY, canvasWidth]);

  // Get random dropout reason
  const getRandomDropoutReason = useCallback((belt: BeltConfig): string => {
    if (belt.dropoutReasons.length === 0) return '';
    return belt.dropoutReasons[Math.floor(Math.random() * belt.dropoutReasons.length)];
  }, []);

  // Progress dots through belt levels
  // Accept the new year as a parameter to avoid stale closure issues
  const progressToNextYear = useCallback((newYear: number) => {
    setDots(prevDots => {
      const updatedDots: Dot[] = [];
      const beltCounts: Record<string, Dot[]> = {
        white: [],
        blue: [],
        purple: [],
        brown: [],
        black: []
      };

      // Group dots by belt (only those that can still move)
      // Only process dots that haven't been processed this year yet
      prevDots.forEach(dot => {
        // Keep settled dropouts as-is (they're done, never process again)
        if (dot.state === 'settled' && dot.dropoutReason) {
          updatedDots.push(dot);
          return; // Skip further processing
        }
        
        // Skip if already processed this year
        if (dot.lastProcessedYear === newYear) {
          updatedDots.push(dot);
          return; // Skip further processing
        }
        
        // Process dots that are settled OR spawning (for any year white belts)
        // Dots in 'settling' or 'dropping' state are still animating and will be processed when they settle
        if ((dot.state === 'settled' && !dot.dropoutReason) || (dot.state === 'spawning' && dot.belt === 'white')) {
          // This dot is settled in a bell curve and ready to be processed
          // OR it's a white belt that needs initial processing (year 0 or new students)
          beltCounts[dot.belt].push(dot);
        } else {
          // Keep animating dots but don't process them yet
          updatedDots.push(dot);
        }
      });

      // Add new white belts each year (fresh influx)
      // Add students when transitioning TO years 1-12 (not year 0 or year 13)
      // Use a ref to track which year we last added students for to prevent duplicates
      const yearToAddStudents = newYear; // The year we're transitioning TO
      if (yearToAddStudents >= 1 && yearToAddStudents <= 12 && lastYearNewStudentsAdded.current !== yearToAddStudents) {
        // Randomize new student count: 85-115 (median ~100) to account for variability
        const newCohortSize = 85 + Math.floor(Math.random() * 31); // 85-115 range
        for (let i = 0; i < newCohortSize; i++) {
          const proficiency = Math.random();
          const velocity = 0.7 + Math.random() * 0.6;
          const newId = Date.now() + i + yearToAddStudents * 10000; // Unique ID
          
          beltCounts.white.push({
            id: newId,
            belt: 'white',
            x: spawnX,
            y: spawnY,
            targetX: spawnX,
            targetY: spawnY,
            velocity,
            progress: 0,
            state: 'spawning',
            proficiency,
            startTime: Date.now() + i * 10,
            duration: 400 + Math.random() * 200,
            lastProcessedYear: newYear // Mark new students as processed this year
          });
        }
        // Track new students (only once per year)
        lastYearNewStudentsAdded.current = yearToAddStudents;
        setTotalStarted(prev => prev + newCohortSize);
      }

      // Randomize dropout rates for this year (more organic variation)
      const randomizedBeltConfigs = beltConfigs.map(belt => {
        const baseBelt = BELTS.find(b => b.name === belt.name)!;
        return {
          ...belt,
          // Randomize dropout rate each year: ±10% variation around base rate
          dropoutRate: Math.max(0, Math.min(1, baseBelt.dropoutRate + (Math.random() - 0.5) * 0.2))
        };
      });
      
      // Update belt configs state for display (async, so use randomizedBeltConfigs in this function)
      setBeltConfigs(randomizedBeltConfigs);
      
      // Create a local getBellCurveY that uses randomized configs
      const getBellCurveYLocal = (x: number, beltIndex: number): number => {
        const belt = randomizedBeltConfigs[beltIndex];
        const normalizedX = (x / canvasWidth - belt.mean) / belt.stdDev;
        const bellHeight = belt.amplitude * Math.exp(-(normalizedX * normalizedX) / 2);
        return bellCurveBaseY - bellHeight;
      };

      // Process each belt level
      randomizedBeltConfigs.forEach((beltConfig, beltIndex) => {
        const beltKey = beltConfig.name.toLowerCase() as keyof typeof beltCounts;
        const dotsAtBelt = beltCounts[beltKey];
        
        if (dotsAtBelt.length === 0) return;

        // Calculate how many progress vs dropout
        // Use randomized dropout rate for this belt
        const dropoutCount = Math.floor(dotsAtBelt.length * beltConfig.dropoutRate);
        const progressCount = dotsAtBelt.length - dropoutCount;

        // Shuffle and assign
        const shuffled = [...dotsAtBelt].sort(() => Math.random() - 0.5);
        
        // Dropouts - distribute in a bucket at the bottom with normal distribution
        const dropoutDots = shuffled.slice(0, dropoutCount);
        // Sort by proficiency for even distribution
        const sortedDropouts = [...dropoutDots].sort((a, b) => a.proficiency - b.proficiency);
        
        sortedDropouts.forEach((dot, index) => {
          // Dropout bucket spans full width below bell curves
          // Distribution: more whites on left, fewer browns on right
          // Map belt level to X position (left = white, right = black)
          const beltIndex = BELTS.findIndex(b => b.name.toLowerCase() === dot.belt);
          const beltProgression = beltIndex / (BELTS.length - 1); // 0 (white) to 1 (black)
          
          // Add some randomness based on proficiency within the belt's range
          const proficiencyOffset = (dot.proficiency - 0.5) * 0.1; // Small variation
          const dropoutX = (beltProgression + proficiencyOffset) * canvasWidth;
          
          // Clamp to canvas bounds
          const clampedX = Math.max(20, Math.min(canvasWidth - 20, dropoutX));
          
          // Scatter dropouts on the floor - add randomness for natural spread
          // Less stacking, more horizontal spread
          const allExistingDropouts = prevDots.filter(d => 
            (d.state === 'settled' || d.state === 'dropping') && d.dropoutReason
          );
          
          // Find dropouts very close to this X position (only count if very close)
          const veryNearbyDropouts = allExistingDropouts.filter(d => {
            const dX = d.state === 'dropping' ? d.targetX : d.x;
            return Math.abs(dX - clampedX) < 4; // Only very close dots (4px)
          });
          
          // Add slight horizontal jitter for natural scatter
          const jitterX = (Math.random() - 0.5) * 15; // ±7.5px jitter
          const finalDropoutX = Math.max(20, Math.min(canvasWidth - 20, clampedX + jitterX));
          
          // Minimal stacking - only if dots are very close, and with variation
          const baseStack = veryNearbyDropouts.length * 2; // Reduced from 6px to 2px
          const scatterY = (Math.random() - 0.5) * 8; // ±4px vertical scatter
          // Ensure dropouts stay within bucket bounds (bucket goes from dropoutBucketBaseY - 150 to dropoutBucketBaseY)
          const bucketTop = dropoutBucketBaseY - 150;
          const bucketBottom = dropoutBucketBaseY;
          const dropoutY = Math.max(bucketTop, Math.min(bucketBottom, dropoutBucketBaseY - baseStack + scatterY));
          
          updatedDots.push({
            ...dot,
            targetX: finalDropoutX,
            targetY: dropoutY,
            state: 'dropping',
            progress: 0,
            dropoutReason: getRandomDropoutReason(beltConfig),
            startTime: Date.now() + index * 10, // Stagger slightly
            duration: 500 + Math.random() * 250,
            lastProcessedYear: newYear // Mark as processed this year
          });
        });
        
        // Don't track dropouts here - we'll calculate it from the final dots array to avoid double counting

        // Progressors - some progress, some stay at current belt
        const progressors = shuffled.slice(dropoutCount, dropoutCount + progressCount);
        
        // Calculate progression rate: adjusted to get ~10 black belts (0.75% of starters) in 13 years
        // Need faster progression to get people through 4 belt levels in 13 years
        // Accounting for dropout rates, we need higher progression rates
        // White belts: ~25-35% progress per year (need ~3-4 years average to progress)
        // Blue belts: ~30-40% progress per year (need ~2.5-3 years average)
        // Purple belts: ~35-45% progress per year (need ~2-3 years average)
        // Brown belts: ~40-50% progress per year (need ~2-2.5 years average)
        // Black belts: all stay (no higher belt)
        const baseProgressionRates = [0.30, 0.35, 0.40, 0.45, 0.0]; // Higher base rates to reach black
        // Add some randomization: ±5% variation
        const progressionRate = beltIndex < baseProgressionRates.length 
          ? Math.max(0.20, Math.min(0.55, baseProgressionRates[beltIndex] + (Math.random() - 0.5) * 0.10))
          : 0.0;
        
        const actualProgressCount = Math.floor(progressors.length * progressionRate);
        const stayCount = progressors.length - actualProgressCount;
        
        const sortedProgressors = [...progressors].sort((a, b) => b.proficiency - a.proficiency); // Higher proficiency progresses
        
        // Dots that progress to next belt
        const progressorsToNext = sortedProgressors.slice(0, actualProgressCount);
        
        // Dots that stay at current belt
        const stayers = sortedProgressors.slice(actualProgressCount);
        
        // Handle stayers - keep them at current belt's bell curve
        // Sort by proficiency to distribute evenly along the bell curve
        const sortedStayers = [...stayers].sort((a, b) => a.proficiency - b.proficiency);
        sortedStayers.forEach((dot, idx) => {
          const beltForCurve = randomizedBeltConfigs[beltIndex];
          // Use index-based distribution to ensure even spread across bell curve
          // Map index (0 to length-1) to a normal distribution using inverse CDF approximation
          const normalizedIndex = stayers.length > 1 ? idx / (stayers.length - 1) : 0.5; // 0 to 1
          // Convert to z-score using inverse normal CDF approximation (Box-Muller transform approximation)
          // This gives us a more even distribution across the bell curve
          const zScore = (normalizedIndex - 0.5) * 4; // Scale to ±2 standard deviations
          let currentBeltX = beltForCurve.mean * canvasWidth + 
            zScore * beltForCurve.stdDev * canvasWidth;
          
          // For black belt, clamp X to minimum (don't extend below purple median)
          if (beltForCurve.name === 'Black' && beltForCurve.minX) {
            currentBeltX = Math.max(beltForCurve.minX * canvasWidth, currentBeltX);
          }
          
          const currentBeltY = getBellCurveYLocal(currentBeltX, beltIndex);
          
          updatedDots.push({
            ...dot,
            targetX: currentBeltX,
            targetY: currentBeltY,
            state: 'settling',
            progress: 0,
            startTime: Date.now() + idx * 5,
            duration: 600 + Math.random() * 300,
            lastProcessedYear: newYear // Mark as processed this year
          });
        });
        
        if (beltIndex < BELTS.length - 1) {
          // Move to next belt - distribute along the next belt's bell curve
          const nextBelt = BELTS[beltIndex + 1];
          
          // Sort progressors by proficiency to distribute evenly
          const sortedProgressorsToNext = [...progressorsToNext].sort((a, b) => a.proficiency - b.proficiency);
          sortedProgressorsToNext.forEach((dot, idx) => {
            // Calculate position along next belt's bell curve
            const beltForCurve = randomizedBeltConfigs[beltIndex + 1];
            // Use index-based distribution to ensure even spread across bell curve
            const normalizedIndex = progressorsToNext.length > 1 ? idx / (progressorsToNext.length - 1) : 0.5;
            const zScore = (normalizedIndex - 0.5) * 4; // Scale to ±2 standard deviations
            let nextBeltX = beltForCurve.mean * canvasWidth + 
              zScore * beltForCurve.stdDev * canvasWidth;
            
            // For black belt, clamp X to minimum (don't extend below purple median)
            if (beltForCurve.name === 'Black' && beltForCurve.minX) {
              nextBeltX = Math.max(beltForCurve.minX * canvasWidth, nextBeltX);
            }
            
            const nextBeltY = getBellCurveYLocal(nextBeltX, beltIndex + 1);
            
            updatedDots.push({
              ...dot,
              belt: nextBelt.name.toLowerCase() as Dot['belt'],
              targetX: nextBeltX,
              targetY: nextBeltY,
              state: 'settling', // Settle into bell curve position
              progress: 0,
              startTime: Date.now() + idx * 10,
              duration: 1200 + Math.random() * 600,
              lastProcessedYear: newYear // Mark as processed this year
            });
          });
        } else if (newYear < 13) {
          // Not final year yet - keep progressing (black belts can still progress conceptually)
          // For now, keep them at their current belt
          // Sort by proficiency to distribute evenly
          const sortedProgressorsFinal = [...progressors].sort((a, b) => a.proficiency - b.proficiency);
          sortedProgressorsFinal.forEach((dot, idx) => {
            const beltIndexForCurve = BELTS.findIndex(b => b.name.toLowerCase() === dot.belt);
            const beltForCurve = randomizedBeltConfigs[beltIndexForCurve];
            // Use index-based distribution to ensure even spread
            const normalizedIndex = progressors.length > 1 ? idx / (progressors.length - 1) : 0.5;
            const zScore = (normalizedIndex - 0.5) * 4; // Scale to ±2 standard deviations
            let finalX = beltForCurve.mean * canvasWidth + 
              zScore * beltForCurve.stdDev * canvasWidth;
            
            // For black belt, clamp X to minimum (don't extend below purple median)
            if (beltForCurve.name === 'Black' && beltForCurve.minX) {
              finalX = Math.max(beltForCurve.minX * canvasWidth, finalX);
            }
            
            const finalYPos = getBellCurveYLocal(finalX, beltIndexForCurve);
            
            updatedDots.push({
              ...dot,
              targetX: finalX,
              targetY: finalYPos,
              state: 'settling',
              progress: 0,
              startTime: Date.now() + idx * 10,
              duration: 1200 + Math.random() * 600,
              lastProcessedYear: newYear // Mark as processed this year
            });
          });
        } else {
          // Final year - settle all remaining belts into their bell curves
          // Sort by proficiency to distribute evenly
          const sortedProgressors = [...progressors].sort((a, b) => a.proficiency - b.proficiency);
          
          sortedProgressors.forEach((dot, index) => {
            const beltIndexForCurve = BELTS.findIndex(b => b.name.toLowerCase() === dot.belt);
            const beltForCurve = randomizedBeltConfigs[beltIndexForCurve];
            
            // Use index-based distribution to ensure even spread across bell curve
            const normalizedIndex = sortedProgressors.length > 1 ? index / (sortedProgressors.length - 1) : 0.5;
            const zScore = (normalizedIndex - 0.5) * 4; // Scale to ±2 standard deviations
            let finalX = beltForCurve.mean * canvasWidth + 
              zScore * beltForCurve.stdDev * canvasWidth;
            
            // For black belt, clamp X to minimum (don't extend below purple median)
            if (beltForCurve.name === 'Black' && beltForCurve.minX) {
              finalX = Math.max(beltForCurve.minX * canvasWidth, finalX);
            }
            
            const finalYPos = getBellCurveYLocal(finalX, beltIndexForCurve);
            
            updatedDots.push({
              ...dot,
              targetX: finalX,
              targetY: finalYPos,
              state: 'settling',
              progress: 0,
              startTime: Date.now() + index * 5, // Stagger slightly
              duration: 750 + Math.random() * 250,
              lastProcessedYear: newYear // Mark as processed this year
            });
          });
        }
      });

      // Remove any duplicate dots (by ID) to prevent double counting
      const uniqueDots = updatedDots.reduce((acc, dot) => {
        if (!acc.find(d => d.id === dot.id)) {
          acc.push(dot);
        }
        return acc;
      }, [] as Dot[]);
      
      return uniqueDots;
    });
  }, [getRandomDropoutReason, beltStartX, beltColumnWidth, dropoutBucketBaseY, canvasWidth, beltConfigs, bellCurveBaseY]);

  // Animation loop
  useEffect(() => {
    if (!isRunning || dots.length === 0) return;

    const animate = () => {
      setDots(prevDots => {
        const now = Date.now();
        const updatedDots = prevDots.map(dot => {
          // Skip if already settled
          if (dot.state === 'settled') return dot;

          const elapsed = now - dot.startTime;
          const normalizedProgress = Math.min(elapsed / dot.duration, 1);

          // Apply easing based on state
          let easedProgress: number;
          if (dot.state === 'dropping') {
            easedProgress = easeOutCubic(normalizedProgress);
          } else if (dot.state === 'settling') {
            easedProgress = easeInOutQuad(normalizedProgress);
          } else {
            easedProgress = easeInOutCubic(normalizedProgress);
          }

          // Interpolate position
          const newX = dot.x + (dot.targetX - dot.x) * easedProgress;
          const newY = dot.y + (dot.targetY - dot.y) * easedProgress;

          // Update state when animation completes
          let newState = dot.state;
          let finalXPos = newX;
          let finalYPos = newY;
          
          if (normalizedProgress >= 1) {
            if (dot.state === 'settling') {
              newState = 'settled';
            } else if (dot.state === 'dropping') {
              // When dropout finishes, recalculate stacking position
              newState = 'settled';
              
              // Recalculate Y position based on all other settled dropouts
              // Only check prevDots since updatedDots is still being built
              const allSettledDropouts = prevDots.filter(d => 
                d.state === 'settled' && d.dropoutReason && d.id !== dot.id
              );
              
              // Only count very close dropouts for minimal stacking
              const nearbySettled = allSettledDropouts.filter(d => 
                Math.abs(d.x - finalXPos) < 4
              );
              
              // Add scatter for natural floor effect
              const scatterY = (Math.random() - 0.5) * 8;
              const baseStack = nearbySettled.length * 2; // Reduced stacking
              // Ensure dropouts stay within bucket bounds
              const bucketTop = dropoutBucketBaseY - 150;
              const bucketBottom = dropoutBucketBaseY;
              finalYPos = Math.max(bucketTop, Math.min(bucketBottom, dropoutBucketBaseY - baseStack + scatterY));
            } else if (dot.state === 'flowing') {
              // Keep as 'flowing' but mark progress as complete for year progression detection
              // The dot is now at its belt position and ready for next year's decisions
            }
          }

          return {
            ...dot,
            x: finalXPos,
            y: finalYPos,
            progress: easedProgress,
            state: newState
          };
        });

        // Check if all active dots have finished (for year progression)
        if (!progressionScheduledRef.current && currentYear < 13) {
          const activeDots = updatedDots.filter(dot => {
            // Settled dropouts don't count - they're done
            if (dot.state === 'settled' && dot.dropoutReason) return false;
            return true;
          });

          if (activeDots.length > 0) {
            const allFinished = activeDots.every(dot => {
              const elapsed = now - dot.startTime;
              const normalizedProgress = Math.min(elapsed / dot.duration, 1);
              return normalizedProgress >= 0.98 || dot.progress >= 0.98;
            });

            if (allFinished) {
              progressionScheduledRef.current = true;
              // Schedule year progression
              setTimeout(() => {
                setCurrentYear(prev => {
                  const nextYear = prev + 1;
                  // Call progressToNextYear with the new year value
                  progressToNextYear(nextYear);
                  return nextYear;
                });
              }, 250); // 2x faster
            }
          } else if (activeDots.length === 0 && currentYear < 13) {
            // All dots are settled, progress anyway
            progressionScheduledRef.current = true;
            setTimeout(() => {
              setCurrentYear(prev => {
                const nextYear = prev + 1;
                // Call progressToNextYear with the new year value
                progressToNextYear(nextYear);
                return nextYear;
              });
            }, 500);
          }
        }

        return updatedDots;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, dots.length, currentYear, progressToNextYear]);

  // Reset progression flag when year changes
  useEffect(() => {
    progressionScheduledRef.current = false;
  }, [currentYear]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.fillStyle = '#050509';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Belt labels removed - redundant with bell curves

    // Draw final bell curves (for progressing dots)
    BELTS.forEach((belt, beltIndex) => {
      // Special handling for black belt
      if (belt.name === 'Black') {
        // Calculate minimum X position (clamp to purple median if specified)
        const minX = belt.minX ? belt.minX * canvasWidth : 0;
        
        // Draw lighter grey outline first (thicker)
        ctx.strokeStyle = '#808080'; // Lighter grey outline
        ctx.lineWidth = 4;
        ctx.beginPath();
        
        let firstPoint = true;
        for (let x = minX; x < canvasWidth; x += 2) {
          const normalizedX = (x / canvasWidth - belt.mean) / belt.stdDev;
          const bellHeight = belt.amplitude * Math.exp(-(normalizedX * normalizedX) / 2);
          const y = bellCurveBaseY - bellHeight;
          
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Draw dark grey main curve (thicker)
        ctx.strokeStyle = belt.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        firstPoint = true;
        for (let x = minX; x < canvasWidth; x += 2) {
          const normalizedX = (x / canvasWidth - belt.mean) / belt.stdDev;
          const bellHeight = belt.amplitude * Math.exp(-(normalizedX * normalizedX) / 2);
          const y = bellCurveBaseY - bellHeight;
          
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      } else {
        // Regular belts
        ctx.strokeStyle = `${belt.color}80`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < canvasWidth; x += 2) {
          const normalizedX = (x / canvasWidth - belt.mean) / belt.stdDev;
          const bellHeight = belt.amplitude * Math.exp(-(normalizedX * normalizedX) / 2);
          const y = bellCurveBaseY - bellHeight;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }
    });

    // Draw dropout bucket area (firmly below bell curves, full width)
    const bucketHeight = 150; // Allow space for stacking
    
    // Draw bucket outline (full width)
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(
      20, // Left margin
      dropoutBucketBaseY - bucketHeight, // Top of bucket
      canvasWidth - 40, // Full width minus margins
      bucketHeight
    );
    ctx.setLineDash([]);
    
    // Draw bucket label
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Dropouts', canvasWidth / 2, dropoutBucketBaseY + 15);
    
    // Draw belt level indicators along the bucket
    BELTS.forEach((belt, index) => {
      const x = (index / (BELTS.length - 1)) * (canvasWidth - 40) + 20;
      ctx.fillStyle = `${belt.color}60`;
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(belt.name, x, dropoutBucketBaseY + 5);
    });

    // Draw dots
    dots.forEach(dot => {
      ctx.fillStyle = beltConfigs.find(b => b.name.toLowerCase() === dot.belt)?.color || '#CCCCCC';
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Highlight hovered dot
      if (hoveredDot?.id === dot.id) {
        ctx.strokeStyle = '#4C8DFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Draw hover tooltip (on canvas, not screen coordinates)
    if (hoveredDot && hoveredDot.dropoutReason) {
      const tooltipX = hoveredDot.x + 10;
      const tooltipY = hoveredDot.y - 30;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
      ctx.fillRect(tooltipX, tooltipY, 150, 30);
      ctx.fillStyle = '#E5E7EB';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(hoveredDot.dropoutReason, tooltipX + 5, tooltipY + 20);
    }
  }, [dots, hoveredDot, beltConfigs, canvasWidth, canvasHeight, bellCurveBaseY, dropoutBucketBaseY, getBellCurveY]);

  // Handle mouse move for hover
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find hovered dot
    const dropoutDots = dots.filter(d => d.state === 'dropping' || (d.state === 'settled' && d.dropoutReason));
    const hovered = dropoutDots.find(dot => {
      const distance = Math.sqrt((x - dot.x) ** 2 + (y - dot.y) ** 2);
      return distance < 10;
    });

    setHoveredDot(hovered || null);
  }, [dots]);

  // Start animation
  const handleStart = () => {
    if (dots.length === 0) {
      generateInitialCohort();
    }
    setIsRunning(true);
  };

  // Pause animation
  const handlePause = () => {
    setIsRunning(false);
  };

  // Reset animation
  const handleReset = () => {
    setIsRunning(false);
    setDots([]);
    setCurrentYear(0);
    setTotalStarted(0);
    setTotalDroppedOut(0);
    lastYearNewStudentsAdded.current = -1;
  };

  // Update belt dropout rate
  const handleDropoutRateChange = (beltIndex: number, value: number[]) => {
    setBeltConfigs(prev => {
      const updated = [...prev];
      updated[beltIndex] = { ...updated[beltIndex], dropoutRate: value[0] / 100 };
      return updated;
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Belt Dropout Visualization</CardTitle>
          <CardDescription>
            Watch individual students progress through belt levels. Each dot represents a student moving independently.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              onClick={isRunning ? handlePause : handleStart}
              variant={isRunning ? 'outline' : 'default'}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <div className="text-sm text-text-muted">
              Year: {currentYear} / 13
            </div>
          </div>

          {/* Dropout Rate Sliders */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Dropout Rates (per belt level)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {beltConfigs.map((belt, index) => (
                <div key={belt.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm" style={{ color: belt.color }}>
                      {belt.name}
                    </Label>
                    <span className="text-xs text-text-muted">
                      {Math.round(belt.dropoutRate * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[belt.dropoutRate * 100]}
                    onValueChange={(value) => handleDropoutRateChange(index, value)}
                    min={0}
                    max={100}
                    step={1}
                    disabled={isRunning}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="border border-border-subtle rounded-lg overflow-hidden bg-bg-raised">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              className="w-full"
              style={{ display: 'block' }}
            />
          </div>

          {/* Assumptions/Parameters */}
          <Card className="bg-bg-raised border-border-subtle">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Simulation Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-text-muted mb-2">New White Belts Per Year:</div>
                    <div className="text-text-primary font-semibold">About 100 (randomized 85-115 per year)</div>
                    <div className="text-text-muted text-xs mt-1">Simulation runs for 13 years</div>
                  </div>
                  <div>
                    <div className="text-text-muted mb-2">Dropout Rates (per belt level, randomized):</div>
                    <div className="space-y-1">
                      {beltConfigs.map((belt) => (
                        <div key={belt.name} className="flex items-center gap-2">
                          <span className="font-semibold" style={{ color: belt.color }}>
                            {belt.name}:
                          </span>
                          <span className="text-text-primary">
                            {Math.round(belt.dropoutRate * 100)}%
                          </span>
                          <span className="text-text-muted text-xs">
                            (median: {Math.round(BELTS.find(b => b.name === belt.name)?.dropoutRate || 0) * 100}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-text-muted mb-2">Progression Rates (of those who don't dropout, randomized):</div>
                    <div className="space-y-1 text-xs">
                      <div>White → Blue: ~25-35% progress per year (avg ~3-4 years at white)</div>
                      <div>Blue → Purple: ~30-40% progress per year (avg ~2.5-3 years at blue)</div>
                      <div>Purple → Brown: ~35-45% progress per year (avg ~2-3 years at purple)</div>
                      <div>Brown → Black: ~40-50% progress per year (avg ~2-2.5 years at brown)</div>
                      <div className="text-text-muted mt-2">Target: ~10 black belts (~0.75% of starters) in 13 years</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Stats */}
          <Card className="bg-bg-raised border-border-subtle">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Simulation Statistics</h3>
                
                {/* Summary Row */}
                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border-subtle">
                  <div>
                    <div className="text-xs text-text-muted mb-1">Total Started</div>
                    <div className="text-2xl font-bold text-text-primary">{totalStarted}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Total Dropped Out</div>
                    <div className="text-2xl font-bold text-red-400">
                      {dots.filter(d => d.dropoutReason).length}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {totalStarted > 0 ? ((dots.filter(d => d.dropoutReason).length / totalStarted) * 100).toFixed(1) : '0.0'}% dropout rate
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Currently Active</div>
                    <div className="text-2xl font-bold text-green-400">
                      {dots.filter(d => !d.dropoutReason).length}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {totalStarted > 0 ? ((dots.filter(d => !d.dropoutReason).length / totalStarted) * 100).toFixed(1) : '0.0'}% retention
                    </div>
                  </div>
                </div>

                {/* Belt Level Breakdown */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-subtle">
                        <th className="text-left py-2 px-3 text-text-muted font-medium">Belt</th>
                        <th className="text-right py-2 px-3 text-text-muted font-medium">Current</th>
                        <th className="text-right py-2 px-3 text-text-muted font-medium">Dropped Out</th>
                        <th className="text-right py-2 px-3 text-text-muted font-medium" title="% of all students who started that are currently at this belt level or dropped out at this belt level">
                          % at This Belt
                          <span className="ml-1 text-xs">ⓘ</span>
                        </th>
                        <th className="text-right py-2 px-3 text-text-muted font-medium">% of Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BELTS.map((belt) => {
                        const beltKey = belt.name.toLowerCase() as 'white' | 'blue' | 'purple' | 'brown' | 'black';
                        const current = dots.filter(d => d.belt === beltKey && !d.dropoutReason).length;
                        const dropped = dots.filter(d => d.belt === beltKey && d.dropoutReason).length;
                        const total = current + dropped;
                        // "% at This Belt" = (current + dropped at this belt) / total started
                        // This shows what % of all students are currently at this belt OR dropped out while at this belt
                        // Note: Students who progressed beyond this belt are NOT counted here
                        const pctAtThisBelt = totalStarted > 0 ? ((total / totalStarted) * 100).toFixed(1) : '0.0';
                        const activeTotal = dots.filter(d => !d.dropoutReason).length;
                        const pctOfActive = activeTotal > 0 ? ((current / activeTotal) * 100).toFixed(1) : '0.0';
                        
                        return (
                          <tr key={belt.name} className="border-b border-border-subtle/50">
                            <td className="py-2 px-3">
                              <span className="font-semibold" style={{ color: belt.color }}>
                                {belt.name}
                              </span>
                            </td>
                            <td className="text-right py-2 px-3 text-text-primary font-medium">
                              {current}
                            </td>
                            <td className="text-right py-2 px-3 text-red-400">
                              {dropped}
                            </td>
                            <td className="text-right py-2 px-3 text-text-muted" title={`${total} students (${current} current + ${dropped} dropped) out of ${totalStarted} total started`}>
                              {pctAtThisBelt}%
                            </td>
                            <td className="text-right py-2 px-3 text-text-muted">
                              {pctOfActive}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

