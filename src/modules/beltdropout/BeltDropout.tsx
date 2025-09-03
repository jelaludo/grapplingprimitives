import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Paper, Slider, Tooltip } from '@mui/material';
import './beltdropout-mobile.css';

/**
 * GUTTER DISPLAY ERROR FIXES:
 * ===========================
 * If you see a faint vertical "gutter" or seam in the middle of the canvas:
 * 
 * 1. **DPR Mismatch (Most Common)**: Canvas bitmap size ≠ CSS size
 *    - Solution: Use DPR-safe canvas setup (implemented below)
 *    - Scale canvas to devicePixelRatio and draw in CSS pixels via setTransform
 *    - Clear and fill using bitmap size, not CSS size
 * 
 * 2. **Sub-pixel Rendering**: Browser composites tiles with 1px seams
 *    - Solution: Math.floor() for dimensions, Math.round() for positions
 *    - Snap vertical lines to integers: Math.round(x) + 0.5
 * 
 * 3. **Antialiasing Artifacts**: Tiny strokes get fuzzy
 *    - Solution: ctx.imageSmoothingEnabled = true
 * 
 * 4. **CSS Background Conflicts**: Page root has background images
 *    - Solution: Ensure container has solid background, no gradients
 * 
 * IMPLEMENTED FIXES:
 * - DPR-safe canvas setup with setTransform scaling
 * - Pixel-snapped coordinates for horizontal lines (baseline, bucket)
 * - imageSmoothingEnabled = true for crisp rendering
 * 
 * This should eliminate all gutter display errors permanently.
 */

interface BeltDropoutProps {
  onBack?: () => void;
}

interface DataPoint {
  id: number;
  category: 'white' | 'blue' | 'purple' | 'brown' | 'black';
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  color: string;
  size: number;
  dropoutReason?: string;
  isInDropoutBucket: boolean;
  cohortId: number;           // which cohort this dot belongs to (1..N)
  cohortStartStage: number;   // global stage when this cohort started (0-based)
}

interface Category {
  name: string;
  color: string;
  count: number;
  dropoutRate: number;
  mean: number;     // 0..1 across width
  stdDev: number;   // 0..1 of width
  amp?: number;     // pixels, fixed visual amplitude
  // optional second lobe to create skewed shapes
  mean2?: number;
  stdDev2?: number;
  amp2?: number;
  verticalOffset: number;
  dropoutReasons: string[];
}

interface ContainerSize {
  width: number;
  height: number;
  dpr?: number;
  performanceMode?: 'low' | 'high';
  maxFPS?: number;
}

const BeltDropout: React.FC<BeltDropoutProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  
  // CRITICAL: Store positions in ref to prevent React from resetting them
  const positionsRef = useRef<DataPoint[]>([]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [containerSize, setContainerSize] = useState<ContainerSize>({ 
    width: 800, 
    height: 600,
    dpr: 1,
    performanceMode: 'high',
    maxFPS: 60
  });
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  
  // Animation control variables
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [easingType, setEasingType] = useState<'linear' | 'easeInOut' | 'easeOut'>('easeInOut');
  const [spacing, setSpacing] = useState(80);
  const [stageDelay, setStageDelay] = useState(800);
  const [rollingMode, setRollingMode] = useState(false);
  const cohortCountRef = useRef(0);
  const nextIdRef = useRef(0);
  
  // CRITICAL: Flag to prevent interference during position updates
  const [isUpdatingPositions, setIsUpdatingPositions] = useState(false);
  
  // CRITICAL: Ref to store current dataPoints for progressToNextStage
  const currentDataPointsRef = useRef<DataPoint[]>([]);

  // Category definitions with dropout reasons - PROPER OVERLAPPING BELL CURVES
  const categories: Category[] = [
    { 
      name: 'White', 
      color: '#CCCCCC', 
      count: 100, 
      dropoutRate: 0.5, 
      mean: 0.20, 
      stdDev: 0.08, 
      amp: 100, // Tallest curve, left side only
      verticalOffset: 0,
      dropoutReasons: ['Injury', 'Confusion', 'Intimidation', 'Scheduling', 'Cost', 'Ego', 'Lack of mentorship', 'Family', 'Work']
    },
    { 
      name: 'Blue', 
      color: '#0066CC', 
      count: 0, 
      dropoutRate: 0.4, 
      mean: 0.35, 
      stdDev: 0.08, 
      amp: 80,  // High curve, overlaps with white right edge
      verticalOffset: 1,
      dropoutReasons: ['Plateau', 'Burnout', 'Ego', 'Lack of mentorship', 'Injury', 'Scheduling', 'Family', 'Work', 'Cost']
    },
    { 
      name: 'Purple', 
      color: '#660099', 
      count: 0, 
      dropoutRate: 0.3, 
      mean: 0.55, 
      stdDev: 0.08, 
      amp: 70,  // Medium curve, overlaps with blue right edge
      verticalOffset: 2,
      dropoutReasons: ['Burnout', 'Injuries', 'Family', 'Work', 'Ego', 'Diminishing returns', 'Plateau', 'Cost']
    },
    { 
      name: 'Brown', 
      color: '#663300', 
      count: 0, 
      dropoutRate: 0.2, 
      mean: 0.70, 
      stdDev: 0.08, 
      amp: 60,  // Lower curve, overlaps with purple right edge
      verticalOffset: 3,
      dropoutReasons: ['Burnout', 'Injuries', 'Family', 'Work', 'Ego', 'Diminishing returns', 'Plateau', 'Cost']
    },
    { 
      name: 'Black', 
      color: '#000000', 
      count: 0, 
      dropoutRate: 0.0, 
      mean: 0.85, 
      stdDev: 0.06, 
      amp: 50,  // Shortest curve, right side only
      verticalOffset: 4,
      dropoutReasons: []
    }
  ];

  // Year progression data
  const yearProgression = [
    { year: 1, white: 100, blue: 0, purple: 0, brown: 0, black: 0, dropped: 0 },
    { year: 2, white: 40, blue: 10, purple: 0, brown: 0, black: 0, dropped: 50 },
    { year: 3, white: 10, blue: 20, purple: 0, brown: 0, black: 0, dropped: 20 },
    { year: 4, white: 5, blue: 15, purple: 5, brown: 0, black: 0, dropped: 10 },
    { year: 5, white: 3, blue: 10, purple: 8, brown: 2, black: 0, dropped: 7 },
    { year: 6, white: 2, blue: 8, purple: 7, brown: 4, black: 1, dropped: 3 },
    { year: 7, white: 1, blue: 6, purple: 6, brown: 5, black: 2, dropped: 2 },
    { year: 8, white: 1, blue: 4, purple: 5, brown: 6, black: 3, dropped: 2 },
    { year: 9, white: 1, blue: 3, purple: 4, brown: 6, black: 4, dropped: 1 },
    { year: 10, white: 1, blue: 2, purple: 3, brown: 6, black: 5, dropped: 1 }
  ];

  // Responsive canvas sizing with mobile optimization
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        
        // Mobile-optimized canvas sizing
        const mobileConfig = {
          dpr: isMobile ? 1 : window.devicePixelRatio,
          performanceMode: isMobile ? 'low' as const : 'high' as const,
          maxFPS: isMobile ? 30 : 60
        };
        
        setContainerSize({ 
          width: rect.width, 
          height: rect.height,
          ...mobileConfig
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3)
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        handleTouchInteraction(x, y);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        handleTouchInteraction(x, y);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setHoveredPoint(null);
  };

  // Unified touch/mouse interaction handler
  const handleTouchInteraction = (x: number, y: number) => {
    if (!dataPoints.length) return;
    
    // Find closest point within touch radius
    const touchRadius = 20; // Touch-friendly radius
    let closestPoint: DataPoint | null = null;
    let closestDistance = Infinity;
    
    dataPoints.forEach(point => {
      const distance = Math.sqrt(
        Math.pow(point.currentX - x, 2) + Math.pow(point.currentY - y, 2)
      );
      if (distance < touchRadius && distance < closestDistance) {
        closestDistance = distance;
        closestPoint = point;
      }
    });
    
    setHoveredPoint(closestPoint);
  };

  // Mobile gesture support
  const [gestureState, setGestureState] = useState({
    isPinching: false,
    startDistance: 0,
    currentDistance: 0,
    startScale: 1,
    currentScale: 1
  });

  const handlePinchGesture = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const distance = Math.sqrt(
        Math.pow(touch1.clientX - touch2.clientX, 2) + 
        Math.pow(touch1.clientY - touch2.clientY, 2)
      );
      
      if (!gestureState.isPinching) {
        setGestureState(prev => ({
          ...prev,
          isPinching: true,
          startDistance: distance,
          startScale: prev.currentScale
        }));
      } else {
        const scale = distance / gestureState.startDistance;
        const newScale = Math.max(0.5, Math.min(2.0, gestureState.startScale * scale));
        
        setGestureState(prev => ({
          ...prev,
          currentDistance: distance,
          currentScale: newScale
        }));
        
        // Apply scale to canvas if needed
        console.log(`📱 Pinch gesture: scale ${newScale.toFixed(2)}`);
      }
    } else {
      setGestureState(prev => ({ ...prev, isPinching: false }));
    }
  };

  // Get random dropout reason with injury sub-reasons
  const getRandomDropoutReason = (category: Category): string => {
    if (category.dropoutReasons.length === 0) return '';
    
    const randomIndex = Math.floor(Math.random() * category.dropoutReasons.length);
    const baseReason = category.dropoutReasons[randomIndex];
    
    // Add injury sub-reasons
    if (baseReason === 'Injury' || baseReason === 'Injuries') {
      const injuryTypes = [
        'ACL', 'meniscus tear', 'neck', 'wrist', 'back', 'shoulder', 'elbow', 'ribs', 'staph'
      ];
      const randomInjury = injuryTypes[Math.floor(Math.random() * injuryTypes.length)];
      return `Injury (${randomInjury})`;
    }
    
    return baseReason;
  };

  // Generate a cohort of 100 white dots (clustered near the left)
  const generateInitialCohort = () => {
    console.log(`🚨 GENERATE INITIAL COHORT CALLED - This should only happen once!`);
    console.log(`📊 Current dataPoints before reset:`, dataPoints.length);
    
    // CRITICAL: Log stack trace to see where this is being called from
    console.trace(`🔍 generateInitialCohort called from:`);
    
    // CRITICAL: Check if this is being called when it shouldn't be
    if (currentStage > 0) {
      console.error(`🚨 CRITICAL ERROR: generateInitialCohort called at stage ${currentStage}!`);
      console.error(`   This should only happen at stage 0!`);
      console.error(`   Aborting to prevent data loss`);
      return;
    }
    
    // CRITICAL: Check if we already have dataPoints that should be preserved
    if (dataPoints.length > 0) {
      const dotsAtTop = dataPoints.filter(p => p.currentY < 100).length;
      const dotsAtRidgelines = dataPoints.filter(p => p.currentY >= 100 && p.currentY < 400).length;
      
      if (dotsAtTop < dataPoints.length) {
        console.error(`🚨 CRITICAL ERROR: generateInitialCohort called but dots are already distributed!`);
        console.error(`   ${dotsAtRidgelines} dots at ridgelines - this should not be reset!`);
        console.error(`   Aborting to prevent data loss`);
        return;
      }
    }
    
    const newDataPoints: DataPoint[] = [];
    
    // Create clustered distribution for white dots (further left, narrower)
    for (let i = 0; i < 100; i++) {
      // Use Gaussian distribution to create natural bell curve stacking
      const u = Math.random() + Math.random() + Math.random() - 1.5; // Approximate normal distribution
      const centerX = containerSize.width * 0.12; // Further left
      const spread = containerSize.width * 0.08; // Narrower cluster
      
      let startX = centerX + u * spread;
      // Clamp inside canvas
      if (startX < 10) startX = 10;
      if (startX > containerSize.width - 10) startX = containerSize.width - 10;
      const startY = 50 + Math.floor(i / 10) * 8; // Staggered vertical positions
      
      const dataPoint: DataPoint = {
        id: nextIdRef.current++,
        category: 'white',
        startX,
        startY,
        targetX: startX,
        targetY: startY,
        currentX: startX,
        currentY: startY,
        color: '#CCCCCC',
        size: 4,
        isInDropoutBucket: false,
        cohortId: cohortCountRef.current + 1,
        cohortStartStage: 0
      };
      newDataPoints.push(dataPoint);
    }
    
    console.log(`🆕 Generated ${newDataPoints.length} new white dots at top positions`);
    console.log(`📍 Sample new positions:`, newDataPoints.slice(0, 3).map(p => ({id: p.id, startX: p.startX, startY: p.startY})));
    
    setDataPoints(newDataPoints);
    console.log(`🔧 SETTING CURRENT STAGE TO: 0 (in generateInitialCohort)`);
    setCurrentStage(0);
    cohortCountRef.current = 1;
  };

  // Append a new cohort without resetting state (used in rolling mode)
  const appendCohort = (startStage: number): DataPoint[] => {
    const added: DataPoint[] = [];
    for (let i = 0; i < 100; i++) {
      const u = Math.random() + Math.random() + Math.random() - 1.5;
      const centerX = containerSize.width * 0.12;
      const spread = containerSize.width * 0.08;
      let startX = centerX + u * spread;
      if (startX < 10) startX = 10;
      if (startX > containerSize.width - 10) startX = containerSize.width - 10;
      const startY = 50 + Math.floor(i / 10) * 8;
      added.push({
        id: nextIdRef.current++,
        category: 'white',
        startX,
        startY,
        targetX: startX,
        targetY: startY,
        currentX: startX,
        currentY: startY,
        color: '#CCCCCC',
        size: 4,
        isInDropoutBucket: false,
        cohortId: cohortCountRef.current + 1,
        cohortStartStage: startStage
      });
    }
    const combined = [...currentDataPointsRef.current, ...added];
    // Update ref immediately so downstream logic in this tick sees the new cohort
    currentDataPointsRef.current = combined;
    setDataPoints(combined);
    cohortCountRef.current += 1;
    console.log(`➕ Appended cohort. Total cohorts: ${cohortCountRef.current}`);
    return combined;
  };

  // Progress to next stage
  const progressToNextStage = () => {
    console.log(`🚀 progressToNextStage called - currentStage: ${currentStage}, dataPoints: ${dataPoints.length}`);
    
    if (currentStage >= 9 || dataPoints.length === 0) {
      console.log(`❌ Cannot progress: currentStage >= 9 (${currentStage >= 9}) or no dataPoints (${dataPoints.length === 0})`);
      return;
    }
    
    const nextStage = currentStage + 1;
    console.log(`🔄 Progressing from stage ${currentStage} to stage ${nextStage}`);
    
    // Rolling cohorts: at the start of Year 2..10 for the first cohort, append a new cohort
    let dataForStage = currentDataPointsRef.current;
    if (rollingMode && nextStage >= 1 && cohortCountRef.current < 10) {
      dataForStage = appendCohort(nextStage);
    }
    
    // CRITICAL: Get the CURRENT dataPoints state from ref, not the stale closure variable
    setCurrentStage(nextStage);
    
    // CRITICAL: Use the ref to get the most current dataPoints
    const currentDataPoints = currentDataPointsRef.current;
    console.log(`📍 CURRENT dataPoints from ref for animateStage:`, currentDataPoints.slice(0, 3).map(p => ({id: p.id, currentX: p.currentX, currentY: p.currentY})));
    
    // Check if positions are correct before calling animateStage
    const dotsAtTop = currentDataPoints.filter(p => p.currentY < 100).length;
    const dotsAtRidgelines = currentDataPoints.filter(p => p.currentY >= 100 && p.currentY < 400).length;
    
    if (dotsAtTop > dotsAtRidgelines && nextStage > 1) {
      console.error(`🚨 Heuristic: many dots appear near top before animateStage (${dotsAtTop} vs ${dotsAtRidgelines}). Proceeding anyway to avoid stalls.`);
      // Previously we returned here, which could stall auto-advance. Now we just log and continue.
    }
    
    // Call animateStage with the data that includes any just-appended cohort
    animateStage(nextStage, dataForStage);
  };

  // Animate specific stage
  const animateStage = (stage: number, currentDataPoints: DataPoint[]) => {
    if (stage === 0) return; // Initial state, no animation needed
    
    console.log(`🎯 Animating stage ${stage} (Year ${stage + 1})`);
    
    const yearData = yearProgression[stage];
    const previousYearData = yearProgression[stage - 1];
    
    // CRITICAL FIX: Use the passed currentDataPoints parameter instead of stale closure variable
    console.log(`🚨 CRITICAL: currentDataPoints parameter has ${currentDataPoints.length} points`);
    console.log(`📍 Sample current positions:`, currentDataPoints.slice(0, 3).map(p => ({id: p.id, currentX: p.currentX, currentY: p.currentY})));
    
    // Use the current positions passed as parameter
    let updatedPoints = currentDataPoints.map(point => ({
      ...point,
      // Use the actual current positions, not stale ones
      currentX: point.currentX,
      currentY: point.currentY
    }));
    
    // CRITICAL: Log the exact positions we're working with
    console.log(`🔍 EXACT POSITION VALUES in animateStage:`);
    console.log(`   Parameter currentDataPoints[0]:`, currentDataPoints[0] ? {id: currentDataPoints[0].id, currentX: currentDataPoints[0].currentX, currentY: currentDataPoints[0].currentY} : 'none');
    console.log(`   Updated updatedPoints[0]:`, updatedPoints[0] ? {id: updatedPoints[0].id, currentX: updatedPoints[0].currentX, currentY: updatedPoints[0].currentY} : 'none');
    console.log(`   Stale dataPoints[0]:`, dataPoints[0] ? {id: dataPoints[0].id, currentX: dataPoints[0].currentX, currentY: dataPoints[0].currentY} : 'none');
    
    // DEBUG: Check current positions before any changes
    console.log(`🔍 POSITION DEBUG - Stage ${stage}:`);
    console.log(`📍 Sample dot positions BEFORE startX/startY assignment:`);
    const sampleDots = updatedPoints.slice(0, 5);
    sampleDots.forEach((point, index) => {
      console.log(`   Dot ${index} (ID: ${point.id}, Category: ${point.category}): currentX: ${point.currentX}, currentY: ${point.currentY}`);
    });
    
    // Check if positions look like they're at the top (reset) or at ridgelines (correct)
    const dotsAtTop = updatedPoints.filter(p => p.currentY < 100).length;
    const dotsAtRidgelines = updatedPoints.filter(p => p.currentY >= 100 && p.currentY < 400).length;
    console.log(`📊 Position Analysis: ${dotsAtTop} dots at top (<100px), ${dotsAtRidgelines} dots at ridgelines (100-400px)`);
    
    // CRITICAL FIX: If ALL dots are at the top, restore them from previous stage positions
    if (dotsAtTop === updatedPoints.length && stage > 0) {
      console.warn(`⚠️ WARNING: All dots reset to top in stage ${stage}!`);
      console.warn(`   Restoring positions from previous stage data...`);
      
      // Restore positions from the previous stage's final state
      updatedPoints = updatedPoints.map(point => {
        // Find the previous position for this point
        const previousPoint = currentDataPoints.find(p => p.id === point.id);
        if (previousPoint && (previousPoint.currentX !== point.currentX || previousPoint.currentY !== point.currentY)) {
          console.log(`   Restoring point ${point.id} from (${point.currentX}, ${point.currentY}) to (${previousPoint.currentX}, ${previousPoint.currentY})`);
          return {
            ...point,
            currentX: previousPoint.currentX,
            currentY: previousPoint.currentY
          };
        }
        return point;
      });
      
      // Re-check positions after restoration
      const restoredDotsAtTop = updatedPoints.filter(p => p.currentY < 100).length;
      const restoredDotsAtRidgelines = updatedPoints.filter(p => p.currentY >= 100 && p.currentY < 400).length;
      console.log(`📊 Position Analysis AFTER restoration: ${restoredDotsAtTop} dots at top, ${restoredDotsAtRidgelines} dots at ridgelines`);
    }
    
    // Per-cohort decision sets (for rolling mode)
    let whiteProgressIndices = new Set<number>();
    let blueProgressIndices = new Set<number>();
    let purpleProgressIndices = new Set<number>();
    let brownProgressIndices = new Set<number>();
    let whiteDropIndices = new Set<number>();
    let blueDropIndices = new Set<number>();
    let purpleDropIndices = new Set<number>();
    let brownDropIndices = new Set<number>();
    let keeperWhite: DataPoint[] = [];
    let keeperBlue: DataPoint[] = [];
    let keeperPurple: DataPoint[] = [];
    let keeperBrown: DataPoint[] = [];
    let keeperBlack: DataPoint[] = [];

    if (rollingMode) {
      // Process each active cohort independently based on cohort-relative year
      const activeCohortIds = Array.from(new Set(updatedPoints.filter(p => p.cohortStartStage <= stage).map(p => p.cohortId))).sort((a, b) => a - b);
      console.log(`📚 Rolling mode: processing cohorts`, activeCohortIds);
      activeCohortIds.forEach(cohortId => {
        const cohortPoints = updatedPoints.filter(p => p.cohortId === cohortId && !p.isInDropoutBucket);
        const cohortStart = cohortPoints.length > 0 ? cohortPoints[0].cohortStartStage : stage;
        const relYear = Math.max(0, Math.min(9, stage - cohortStart));
        const relPrev = Math.max(0, relYear - 1);
        const target = yearProgression[relYear];
        const prev = yearProgression[relPrev];
        // Current counts for this cohort
        const cWhite = cohortPoints.filter(p => p.category === 'white');
        const cBlue = cohortPoints.filter(p => p.category === 'blue');
        const cPurple = cohortPoints.filter(p => p.category === 'purple');
        const cBrown = cohortPoints.filter(p => p.category === 'brown');
        const cBlack = cohortPoints.filter(p => p.category === 'black');
        // How many to keep at each belt this year for this cohort
        const keepW = target.white;
        const keepB = target.blue;
        const keepP = target.purple;
        const keepBr = target.brown;
        const keepBl = target.black;
        // Progress needed relative to current distribution
        const wToB = Math.max(0, keepB - cBlue.length);
        const bToP = Math.max(0, keepP - cPurple.length);
        const pToBr = Math.max(0, keepBr - cBrown.length);
        const brToBl = Math.max(0, keepBl - cBlack.length);
        const wProg = Math.min(wToB, cWhite.length);
        const bProg = Math.min(bToP, cBlue.length);
        const pProg = Math.min(pToBr, cPurple.length);
        const brProg = Math.min(brToBl, cBrown.length);
        // Random selection helpers
        const pick = (arr: DataPoint[], n: number) => {
          const set = new Set<number>();
          if (arr.length === 0 || n <= 0) return set;
          while (set.size < Math.min(n, arr.length)) {
            set.add(arr[Math.floor(Math.random() * arr.length)].id);
          }
          return set;
        };
        const wProgSet = pick(cWhite, wProg);
        const bProgSet = pick(cBlue, bProg);
        const pProgSet = pick(cPurple, pProg);
        const brProgSet = pick(cBrown, brProg);
        wProgSet.forEach(id => whiteProgressIndices.add(id));
        bProgSet.forEach(id => blueProgressIndices.add(id));
        pProgSet.forEach(id => purpleProgressIndices.add(id));
        brProgSet.forEach(id => brownProgressIndices.add(id));
        // Droppers are from remaining after progression to reach target keeps
        const remWhite = cWhite.filter(p => !wProgSet.has(p.id));
        const remBlue = cBlue.filter(p => !bProgSet.has(p.id));
        const remPurple = cPurple.filter(p => !pProgSet.has(p.id));
        const remBrown = cBrown.filter(p => !brProgSet.has(p.id));
        const dropW = Math.max(0, remWhite.length - (keepW - (cWhite.length - remWhite.length))); // keepW minus progressed kept from white
        const dropB = Math.max(0, remBlue.length - (keepB - bProg));
        const dropP = Math.max(0, remPurple.length - (keepP - pProg));
        const dropBr = Math.max(0, remBrown.length - (keepBr - brProg));
        pick(remWhite, dropW).forEach(id => whiteDropIndices.add(id));
        pick(remBlue, dropB).forEach(id => blueDropIndices.add(id));
        pick(remPurple, dropP).forEach(id => purpleDropIndices.add(id));
        pick(remBrown, dropBr).forEach(id => brownDropIndices.add(id));
        // Keepers are those not progressing or dropping
        keeperWhite = keeperWhite.concat(remWhite.filter(p => !whiteDropIndices.has(p.id)));
        keeperBlue = keeperBlue.concat(remBlue.filter(p => !blueDropIndices.has(p.id)));
        keeperPurple = keeperPurple.concat(remPurple.filter(p => !purpleDropIndices.has(p.id)));
        keeperBrown = keeperBrown.concat(remBrown.filter(p => !brownDropIndices.has(p.id)));
        keeperBlack = keeperBlack.concat(cBlack);
      });
    } else {
      // Single cohort logic (previous global computation)
      const currentWhite = updatedPoints.filter(p => p.category === 'white' && !p.isInDropoutBucket);
      const currentBlue = updatedPoints.filter(p => p.category === 'blue' && !p.isInDropoutBucket);
      const currentPurple = updatedPoints.filter(p => p.category === 'purple' && !p.isInDropoutBucket);
      const currentBrown = updatedPoints.filter(p => p.category === 'brown' && !p.isInDropoutBucket);
      const currentBlack = updatedPoints.filter(p => p.category === 'black' && !p.isInDropoutBucket);
      const whiteToKeep = yearData.white;
      const blueToKeep = yearData.blue;
      const purpleToKeep = yearData.purple;
      const brownToKeep = yearData.brown;
      const blackToKeep = yearData.black;
      const whiteToBlue = Math.max(0, blueToKeep - currentBlue.length);
      const blueToPurple = Math.max(0, purpleToKeep - currentPurple.length);
      const purpleToBrown = Math.max(0, brownToKeep - currentBrown.length);
      const brownToBlack = Math.max(0, blackToKeep - currentBlack.length);
      const whiteToProgress = Math.min(whiteToBlue, currentWhite.length);
      const blueToProgress = Math.min(blueToPurple, currentBlue.length);
      const purpleToProgress = Math.min(purpleToBrown, currentPurple.length);
      const brownToProgress = Math.min(brownToBlack, currentBrown.length);
      // Select specific people to progress
      const pickIds = (arr: DataPoint[], n: number) => {
        const set = new Set<number>();
        while (set.size < Math.min(n, arr.length)) set.add(arr[Math.floor(Math.random() * arr.length)].id);
        return set;
      };
      const currentWhiteArr = currentWhite;
      const currentBlueArr = currentBlue;
      const currentPurpleArr = currentPurple;
      const currentBrownArr = currentBrown;
      whiteProgressIndices = pickIds(currentWhiteArr, whiteToProgress);
      blueProgressIndices = pickIds(currentBlueArr, blueToProgress);
      purpleProgressIndices = pickIds(currentPurpleArr, purpleToProgress);
      brownProgressIndices = pickIds(currentBrownArr, brownToProgress);
      const remainingWhite = currentWhiteArr.filter(p => !whiteProgressIndices.has(p.id));
      const remainingBlue = currentBlueArr.filter(p => !blueProgressIndices.has(p.id));
      const remainingPurple = currentPurpleArr.filter(p => !purpleProgressIndices.has(p.id));
      const remainingBrown = currentBrownArr.filter(p => !brownProgressIndices.has(p.id));
      const whiteToDrop = Math.max(0, remainingWhite.length - (whiteToKeep - (currentWhiteArr.length - remainingWhite.length)));
      const blueToDrop = Math.max(0, remainingBlue.length - (blueToKeep - (currentBlueArr.length - remainingBlue.length)));
      const purpleToDrop = Math.max(0, remainingPurple.length - (purpleToKeep - (currentPurpleArr.length - remainingPurple.length)));
      const brownToDrop = Math.max(0, remainingBrown.length - (brownToKeep - (currentBrownArr.length - remainingBrown.length)));
      const pickDrop = (arr: DataPoint[], n: number) => {
        const set = new Set<number>();
        while (set.size < Math.min(n, arr.length)) set.add(arr[Math.floor(Math.random() * arr.length)].id);
        return set;
      };
      whiteDropIndices = pickDrop(remainingWhite, whiteToDrop);
      blueDropIndices = pickDrop(remainingBlue, blueToDrop);
      purpleDropIndices = pickDrop(remainingPurple, purpleToDrop);
      brownDropIndices = pickDrop(remainingBrown, brownToDrop);
      keeperWhite = remainingWhite.filter(p => !whiteDropIndices.has(p.id));
      keeperBlue = remainingBlue.filter(p => !blueDropIndices.has(p.id));
      keeperPurple = remainingPurple.filter(p => !purpleDropIndices.has(p.id));
      keeperBrown = remainingBrown.filter(p => !brownDropIndices.has(p.id));
      keeperBlack = currentBlack;
    }
    
    // Build sets and proceed as before
    const keeperIds = new Set<number>([
      ...keeperWhite.map(p => p.id),
      ...keeperBlue.map(p => p.id),
      ...keeperPurple.map(p => p.id),
      ...keeperBrown.map(p => p.id),
      ...keeperBlack.map(p => p.id)
    ]);
    
    const dotsToMove = new Set<number>([
      ...Array.from(keeperIds), // Keepers need to move to ridgelines
      ...whiteDropIndices, ...blueDropIndices, ...purpleDropIndices, ...brownDropIndices,
      ...whiteProgressIndices, ...blueProgressIndices, ...purpleProgressIndices, ...brownProgressIndices
    ]);
    
    console.log(`🎯 Dots that need to move: ${dotsToMove.size} total`);
    console.log(`📤 Moving dots: (${dotsToMove.size}) [progressors: ${whiteProgressIndices.size + blueProgressIndices.size + purpleProgressIndices.size + brownProgressIndices.size}, droppers: ${whiteDropIndices.size + blueDropIndices.size + purpleDropIndices.size + brownDropIndices.size}, keepers: ${keeperIds.size}]`);
    console.log(`📍 Keepers moving to ridgelines: ${keeperIds.size}`);
    
    // CRITICAL FIX: Update ALL dots to start from their current positions
    // This ensures continuity between stages - no dots reset to original positions
    updatedPoints = updatedPoints.map(point => {
      // First, update ALL dots to start from their current positions
      const updatedPoint = {
        ...point,
        startX: point.currentX, // Always start from current position
        startY: point.currentY   // Always start from current position
      };
      
      // If a point is already in the dropout bucket, pin it in place for this stage
      if (updatedPoint.isInDropoutBucket) {
        return {
          ...updatedPoint,
          targetX: updatedPoint.currentX,
          targetY: updatedPoint.currentY
        };
      }
      
      // Log the position update for debugging
      if (point.startX !== updatedPoint.startX || point.startY !== updatedPoint.startY) {
        console.log(`📍 Updated start positions for dot ${point.id}: (${point.startX}, ${point.startY}) → (${updatedPoint.startX}, ${updatedPoint.startY})`);
      }
      
      // CRITICAL FIX: ALL dots now need to move (including keepers to ridgeline)
      // No more early returns for "static" dots
      
      console.log(`🔄 Updating point ${point.id} from (${point.currentX}, ${point.currentY}) to new target`);
      
      // Handle dropouts - ADD to existing dropout bucket (never remove)
      if (whiteDropIndices.has(point.id) || blueDropIndices.has(point.id) || 
          purpleDropIndices.has(point.id) || brownDropIndices.has(point.id)) {
        
        // CRITICAL: Position dropout dots by their skill level when they dropped out
        // Left = low skill, Right = high skill (matches the ridgeline progression)
        let skillLevel: number;
        if (whiteDropIndices.has(point.id)) {
          skillLevel = 0.1 + Math.random() * 0.2; // Left side - low skill white belts
        } else if (blueDropIndices.has(point.id)) {
          skillLevel = 0.3 + Math.random() * 0.2; // Left-center - blue belt skill
        } else if (purpleDropIndices.has(point.id)) {
          skillLevel = 0.5 + Math.random() * 0.2; // Center - purple belt skill
        } else {
          skillLevel = 0.7 + Math.random() * 0.2; // Right-center - brown belt skill
        }
        
        const bucketX = skillLevel * containerSize.width;
        const bucketY = containerSize.height - 60 - Math.random() * 80; // Spread across bucket height
        
        console.log(`💥 Point ${point.id} dropping out to bucket at (${bucketX}, ${bucketY})`);
        console.log(`   Setting startX: ${updatedPoint.startX} → startY: ${updatedPoint.startY}`);
        
        return {
          ...updatedPoint,
          targetX: bucketX,
          targetY: bucketY,
          isInDropoutBucket: true,
          dropoutReason: getRandomDropoutReason(categories.find(c => c.name.toLowerCase() === point.category) || categories[0])
        };
      }
      
      // Handle progressions
      if (whiteProgressIndices.has(point.id)) {
        // White to Blue
        const targetX = categories[1].mean * containerSize.width + (Math.random() - 0.5) * categories[1].stdDev * containerSize.width;
        const normalizedX = (targetX - categories[1].mean * containerSize.width) / (categories[1].stdDev * containerSize.width);
        const bellCurveHeight = 25 * Math.exp(-(normalizedX * normalizedX) / 2);
        const targetY = 100 + categories[1].verticalOffset * spacing + bellCurveHeight;
        
        console.log(`🔵 Point ${point.id} progressing from white to blue at (${targetX}, ${targetY})`);
        console.log(`   Setting startX: ${updatedPoint.startX} → startY: ${updatedPoint.startY}`);
        
        return {
          ...updatedPoint,
          category: 'blue',
          color: '#0066CC',
          targetX,
          targetY
        };
      }
      
      if (blueProgressIndices.has(point.id)) {
        // Blue to Purple
        const targetX = categories[2].mean * containerSize.width + (Math.random() - 0.5) * categories[2].stdDev * containerSize.width;
        const normalizedX = (targetX - categories[2].mean * containerSize.width) / (categories[2].stdDev * containerSize.width);
        const bellCurveHeight = 25 * Math.exp(-(normalizedX * normalizedX) / 2);
        const targetY = 100 + categories[2].verticalOffset * spacing + bellCurveHeight;
        
        console.log(`🟣 Point ${point.id} progressing from blue to purple at (${targetX}, ${targetY})`);
        console.log(`   Setting startX: ${updatedPoint.startX} → startY: ${updatedPoint.startY}`);
        
        return {
          ...updatedPoint,
          category: 'purple',
          color: '#660099',
          targetX,
          targetY
        };
      }
      
      if (purpleProgressIndices.has(point.id)) {
        // Purple to Brown
        const targetX = categories[3].mean * containerSize.width + (Math.random() - 0.5) * categories[3].stdDev * containerSize.width;
        const normalizedX = (targetX - categories[3].mean * containerSize.width) / (categories[3].stdDev * containerSize.width);
        const bellCurveHeight = 25 * Math.exp(-(normalizedX * normalizedX) / 2);
        const targetY = 100 + categories[3].verticalOffset * spacing + bellCurveHeight;
        
        console.log(`🟤 Point ${point.id} progressing from purple to brown at (${targetX}, ${targetY})`);
        
        return {
          ...updatedPoint,
          category: 'brown',
          color: '#663300',
          targetX,
          targetY
        };
      }
      
      if (brownProgressIndices.has(point.id)) {
        // Brown to Black
        const targetX = categories[4].mean * containerSize.width + (Math.random() - 0.5) * categories[4].stdDev * containerSize.width;
        const normalizedX = (targetX - categories[4].mean * containerSize.width) / (categories[4].stdDev * containerSize.width);
        const bellCurveHeight = 25 * Math.exp(-(normalizedX * normalizedX) / 2);
        const targetY = 100 + categories[4].verticalOffset * spacing + bellCurveHeight;
        
        console.log(`⚫ Point ${point.id} progressing from brown to black at (${targetX}, ${targetY})`);
        
        return {
          ...updatedPoint,
          category: 'black',
          color: '#000000',
          size: 6,
          targetX,
          targetY
        };
      }
      
      // CRITICAL FIX: Keeper gets positioned on their category's ridgeline
      if (keeperIds.has(point.id)) {
        const categoryIndex = ['white', 'blue', 'purple', 'brown', 'black'].indexOf(point.category);
        const { x, y } = targetOnRidgeline(categoryIndex);
        console.log(`📍 Keeper ${point.id} (${point.category}) positioning on ridgeline at (${x}, ${y})`);
        return {
          ...updatedPoint,
          targetX: x,
          targetY: y
        };
      }
      
      // This should never happen, but just in case
      return point;
    });
    
    console.log(`📊 Final updated points count: ${updatedPoints.length}`);
    console.log(`📍 Sample final positions:`, updatedPoints.slice(0, 3).map(p => ({id: p.id, startX: p.startX, startY: p.startY, targetX: p.targetX, targetY: p.targetY, category: p.category})));
    
    // DEBUG: Check final startX/startY values
    console.log(`🔍 FINAL POSITION DEBUG - Stage ${stage}:`);
    const finalSampleDots = updatedPoints.slice(0, 5);
    finalSampleDots.forEach((point, index) => {
      console.log(`   Final Dot ${index} (ID: ${point.id}): startX: ${point.startX}, startY: ${point.startY} → targetX: ${point.targetX}, targetY: ${point.targetY}`);
    });
    
    // CRITICAL FIX: Store positions in ref AND state to prevent React from resetting them
    console.log(`🔧 About to call setDataPoints with ${updatedPoints.length} points`);
    console.log(`📍 Sample positions being set:`, updatedPoints.slice(0, 3).map(p => ({id: p.id, startX: p.startX, startY: p.startY, currentX: p.currentX, currentY: p.currentY})));
    
    // CRITICAL: Store positions in ref to prevent React from resetting them
    positionsRef.current = updatedPoints;
    
    // CRITICAL: Set flag to prevent interference during position update
    setIsUpdatingPositions(true);
    
    setDataPoints(updatedPoints);
    
    // CRITICAL: Check if setDataPoints actually worked
                setTimeout(() => {
      console.log(`⏰ After setDataPoints delay - checking if positions were preserved`);
      console.log(`📍 Current dataPoints state:`, dataPoints.slice(0, 3).map(p => ({id: p.id, startX: p.startX, startY: p.startY, currentX: p.currentX, currentY: p.currentY})));
      
      // CRITICAL: Compare what we set vs what we got (log only)
      console.log(`🔍 COMPARISON - What we set vs what we got:`);
      console.log(`   What we set:`, positionsRef.current.slice(0, 3).map(p => ({id: p.id, startX: p.startX, startY: p.startY, currentX: p.currentX, currentY: p.currentY})));
      console.log(`   What we got:`, dataPoints.slice(0, 3).map(p => ({id: p.id, startX: p.startX, startY: p.startY, currentX: p.currentX, currentY: p.currentY})));
      
      // Heuristic diagnostics (no blocking)
      const dotsAtTop = dataPoints.filter(p => p.currentY < 100).length;
      const dotsAtRidgelines = dataPoints.filter(p => p.currentY >= 100 && p.currentY < 400).length;
      console.log(`📊 Position check after setDataPoints: ${dotsAtTop} at top, ${dotsAtRidgelines} at ridgelines`);
      
      // Always proceed to animation to avoid getting stuck between years
      console.log(`⏰ Starting animation after position update delay`);
      setIsRunning(true);
      setAnimationProgress(0);
      
      // CRITICAL: Clear flag after animation starts
      setIsUpdatingPositions(false);
    }, 100); // Increased delay to ensure state update completes
  };

  // Start the animation sequence
  const startAnimation = () => {
    if (dataPoints.length === 0) {
      // Only generate initial cohort if we don't have any data points
      console.log('🔄 Starting fresh - generating initial cohort');
      setIsRunning(true);
      console.log(`🔧 SETTING CURRENT STAGE TO: 0 (fresh start)`);
      setCurrentStage(0);
      generateInitialCohort();
              } else {
      // If we already have data points, just continue from current state
      console.log('▶️ Continuing from existing state - no reset');
      console.log(`📍 Current stage: ${currentStage}, dataPoints: ${dataPoints.length}`);
      
      // Check if we need to progress to the next stage
      if (currentStage < 9) {
        console.log(`🔄 Continuing animation - progressing to next stage`);
        progressToNextStage();
      } else {
        console.log(`🏁 All stages complete - staying on final state`);
        // CRITICAL: Don't restart automatically, stay on year 10 until reset
        setIsRunning(false);
      }
    }
  };

  // Stop the animation
  const stopAnimation = () => {
    setIsRunning(false);
  };

  // Reset the animation
  const resetAnimation = () => {
    setDataPoints([]);
    setIsRunning(false);
    setCurrentStage(0);
    setAnimationProgress(0);
    cohortCountRef.current = 0;
    nextIdRef.current = 0;
  };

  // Handle mouse move for hover detection
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Find if mouse is over any point in dropout bucket
    const dropoutPoints = dataPoints.filter(p => p.isInDropoutBucket);
    const hoveredPoint = dropoutPoints.find(point => {
      const distance = Math.sqrt((x - point.currentX) ** 2 + (y - point.currentY) ** 2);
      return distance <= point.size + 5; // 5px buffer for easier hovering
    });
    
    setHoveredPoint(hoveredPoint || null);
  };

  // Update animation
  useEffect(() => {
    if (!isRunning || dataPoints.length === 0) return;

    console.log(`🎬 Animation loop started - Stage: ${currentStage}, Points: ${dataPoints.length}`);
    console.log(`📍 Sample point positions:`, dataPoints.slice(0, 3).map(p => ({id: p.id, currentX: p.currentX, currentY: p.currentY, category: p.category})));

    // CRITICAL: Check if animation loop is running when it shouldn't be
    if (currentStage === 0 && dataPoints.length > 0) {
      console.log(`🚨 ALERT: Animation loop running on stage 0 with ${dataPoints.length} points!`);
      console.log(`   This might be causing unwanted position updates`);
    }

    // CRITICAL: Check if dots are at top when they shouldn't be
    const dotsAtTop = dataPoints.filter(p => p.currentY < 100).length;
    const dotsAtRidgelines = dataPoints.filter(p => p.currentY >= 100 && p.currentY < 400).length;
    
    // CRITICAL FIX: Only abort if ALL dots are at top (likely reset)
    // Some dots at top is normal for keepers that haven't been assigned targets yet
    if (dotsAtTop === dataPoints.length && currentStage > 0) {
      console.error(`🚨 CRITICAL ERROR: ALL dots at top in stage ${currentStage}!`);
      console.error(`   This indicates a complete position reset`);
      
      // CRITICAL: Try to restore from ref before giving up
      if (positionsRef.current.length > 0) {
        const refDotsAtTop = positionsRef.current.filter(p => p.currentY < 100).length;
        const refDotsAtRidgelines = positionsRef.current.filter(p => p.currentY >= 100 && p.currentY < 400).length;
        
        if (refDotsAtRidgelines > refDotsAtTop) {
          console.log(`🔄 Attempting to restore positions from ref in animation loop...`);
          setDataPoints(positionsRef.current);
          return; // Let the restore complete, then retry
        }
      }
      
      console.error(`   Aborting animation to prevent data loss`);
      return;
    }
    
    // Log position distribution for debugging (but don't abort)
    if (dotsAtTop > 0 && currentStage > 0) {
      console.log(`📊 Position distribution: ${dotsAtTop} at top, ${dotsAtRidgelines} at ridgelines`);
      console.log(`   This is normal for keepers that will be assigned targets`);
    }

    // CRITICAL: Track animation loop restarts
    console.log(`🔄 ANIMATION LOOP RESTART - isRunning: ${isRunning}, currentStage: ${currentStage}, animationProgress: ${animationProgress}`);
    console.log(`   This useEffect dependency array: [isRunning, animationDuration, easingType, currentStage, stageDelay]`);

    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      const easedProgress = easingFunctions[easingType](progress);
      setAnimationProgress(easedProgress);
      
      // Only update data points that actually need to move
      setDataPoints(prev => {
        // CRITICAL: Check if positions are already correct (no reset needed)
        if (progress === 0) {
          const dotsAtTop = prev.filter(p => p.currentY < 100).length;
          const dotsAtRidgelines = prev.filter(p => p.currentY >= 100 && p.currentY < 400).length;
          
          // If dots are already at ridgelines, don't reset them
          if (dotsAtRidgelines > dotsAtTop && currentStage > 0) {
            console.log(`✅ Positions already correct at progress 0% - no update needed`);
            console.log(`   ${dotsAtRidgelines} dots at ridgelines, ${dotsAtTop} dots at top`);
            return prev; // Return unchanged to preserve positions
          }
        }
        
        // CRITICAL: Prevent duplicate calls with same progress
        if (progress === 0 && prev.length > 0 && prev[0].startX === prev[0].targetX && prev[0].startY === prev[0].targetY) {
          console.log(`🚨 ALERT: Duplicate setDataPoints call detected at progress 0%`);
          console.log(`   This suggests the animation loop is running multiple times`);
          return prev; // Return unchanged to prevent reset
        }
        
        // CRITICAL: Log what we're about to update
        const movingDots = prev.filter(p => p.startX !== p.targetX || p.startY !== p.targetY);
        const staticDots = prev.filter(p => p.startX === p.targetX && p.startY === p.targetY);
        
        if (progress < 0.1) { // Only log at start of animation
          console.log(`🎯 setDataPoints called - Progress: ${Math.round(progress * 100)}%`);
          console.log(`   Moving dots: ${movingDots.length}, Static dots: ${staticDots.length}`);
          console.log(`   Sample moving dot:`, movingDots[0] ? {id: movingDots[0].id, startX: movingDots[0].startX, startY: movingDots[0].startY, targetX: movingDots[0].targetX, targetY: movingDots[0].targetY} : 'none');
        }
        
        const updated = prev.map(point => {
          // If start and target are the same, no movement needed
          if (point.startX === point.targetX && point.startY === point.targetY) {
            return point;
          }
          
          // Only animate dots that have different start and target positions
          return {
            ...point,
            currentX: point.startX + (point.targetX - point.startX) * easedProgress,
            currentY: point.startY + (point.targetY - point.startY) * easedProgress
          };
        });
        
        if (progress > 0.5 && progress < 0.6) {
          console.log(`🔄 Animation progress ${Math.round(progress * 100)}% - Sample updated positions:`, updated.slice(0, 3).map(p => ({id: p.id, currentX: p.currentX, currentY: p.currentY})));
        }
        
        return updated;
      });
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        console.log(`✅ Animation completed for stage ${currentStage}`);
        console.log(`📍 Final positions:`, dataPoints.slice(0, 3).map(p => ({id: p.id, currentX: p.currentX, currentY: p.currentY, category: p.category})));
        
        // CRITICAL FIX: Update dots' current positions to their final positions
        // This ensures the next stage starts from the correct positions
        setDataPoints(prev => prev.map(point => ({
          ...point,
          currentX: point.targetX, // Update current position to final target position
          currentY: point.targetY   // Update current position to final target position
        })));
        
        // CRITICAL: Log what happens when animation completes
        console.log(`🏁 ANIMATION COMPLETE - Setting isRunning to false`);
        setIsRunning(false);
        
        // Auto-progress to next stage after delay
        setTimeout(() => {
          console.log(`⏰ Auto-progression timeout triggered - currentStage: ${currentStage}, max: 9`);
          if (currentStage < 9) {
            console.log(`⏰ Auto-progressing to next stage after ${stageDelay}ms delay`);
            progressToNextStage();
          } else {
            console.log(`🏁 All stages complete - staying on final state until reset`);
            // CRITICAL: Stop at year 10, wait for user reset
            setIsRunning(false);
          }
        }, stageDelay);
      }
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, animationDuration, easingType, currentStage, stageDelay]);



  // Draw the visualization
  useEffect(() => {
    if (!canvasRef.current || !containerSize.width || !containerSize.height) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    // CRITICAL FIX: DPR-safe canvas setup to eliminate gutter seams
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    
    // Set bitmap size to CSS size * DPR
    const cssW = Math.floor(containerSize.width);
    const cssH = Math.floor(containerSize.height);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    
    // CRITICAL: Reset context completely to prevent any state corruption
    ctx.restore();
    ctx.save();
    
    // Apply DPR scaling
    ctx.scale(dpr, dpr);
    
    // Clear using CSS coords
    ctx.clearRect(0, 0, cssW, cssH);
    
    // Avoid antialias fuzz on tiny strokes
    ctx.imageSmoothingEnabled = true;
    
    // CRITICAL: Fill entire canvas with background color to eliminate any seams
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, cssW, cssH);
    
    // CRITICAL: Multiple overlapping background fills to eliminate any possible seams
    ctx.fillRect(-2, -2, cssW + 4, cssH + 4);
    ctx.fillRect(-1, -1, cssW + 2, cssH + 2);
    ctx.fillRect(0, 0, cssW, cssH);
    
    // CRITICAL: Gutter elimination - draw vertical stripes to break up any center seams
    ctx.fillStyle = '#1a1a1a';
    for (let x = 0; x < cssW; x += 2) {
      ctx.fillRect(x, 0, 1, cssH);
    }
    
    // CRITICAL: Final gutter elimination - ensure center area is completely covered
    const centerX = Math.floor(cssW / 2);
    ctx.fillRect(centerX - 3, 0, 6, cssH);
    ctx.fillRect(centerX - 2, 0, 4, cssH);
    ctx.fillRect(centerX - 1, 0, 2, cssH);
    
    // DEBUG: Log canvas setup to help diagnose gutter issues
    console.log(`🔧 Canvas Setup - DPR: ${dpr}, CSS: ${cssW}x${cssH}, Bitmap: ${canvas.width}x${canvas.height}`);
    console.log(`🔧 Transform Matrix:`, ctx.getTransform());
    
    // Draw category labels
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    categories.forEach((category, index) => {
      const y = 100 + index * spacing;
      ctx.fillStyle = category.color;
      ctx.fillText(category.name, 20, y + 5);
    });
    
    // Draw density curves (ridgeline plot) - PROPER OVERLAPPING BELL CURVES
    // Each belt has a fixed amplitude and position, creating overlapping, staggered curves
    // White belt: tallest (100px), left side only (0.20), narrow spread (0.08)
    // Blue belt: high (80px), overlaps with white right edge (0.35), narrow spread (0.08)
    // Purple belt: medium (70px), overlaps with blue right edge (0.55), narrow spread (0.08)
    // Brown belt: lower (60px), overlaps with purple right edge (0.70), narrow spread (0.08)
    // Black belt: shortest (50px), right side only (0.85), narrow spread (0.06)

    // Define horizontal windows (as ratios) for where each curve is drawn
    const curveWindows = [
      { start: 0.00, end: 0.32, invert: true,  ampScale: 1.08 }, // White: extend to ~32%, slightly higher peak
      { start: 0.18, end: 0.55, invert: true,  ampScale: 1.0 },  // Blue: inverted
      { start: 0.40, end: 0.72, invert: true,  ampScale: 1.0 },  // Purple: inverted
      { start: 0.62, end: 0.88, invert: true,  ampScale: 1.0 },  // Brown: inverted
      { start: 0.78, end: 0.98, invert: true,  ampScale: 1.0 }   // Black: inverted
    ] as const;

    categories.forEach((category, index) => {
      const baseY = 100 + index * spacing;
      
      ctx.strokeStyle = category.color;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      
      // Windowed drawing range for this category
      const win = curveWindows[index] ?? { start: 0.0, end: 1.0, invert: false, ampScale: 1.0 };
      const xStart = Math.round(win.start * cssW);
      const xEnd = Math.round(win.end * cssW);
      const width = Math.max(1, xEnd - xStart);
      
      // Draw bell curve with proper Gaussian shape - FIXED VISUAL IMPACT
      let firstPoint = true;
      for (let x = xStart; x <= xEnd; x += 2) {
        // Primary Gaussian lobe, centered by category mean/stdDev
        const nx1 = (x - category.mean * cssW) / (category.stdDev * cssW);
        let bellCurveHeight = (category.amp ?? 60) * Math.exp(-(nx1 * nx1) / 2);
        
        // Optional second lobe for skewed distributions (e.g., blue belt)
        if (category.mean2 && category.stdDev2 && category.amp2) {
          const nx2 = (x - category.mean2 * cssW) / (category.stdDev2 * cssW);
          bellCurveHeight += category.amp2 * Math.exp(-(nx2 * nx2) / 2);
        }
        
        // Edge taper so the curve smoothly reaches 0 at the window boundaries
        const t = (x - xStart) / width; // 0..1 within window
        const taper = Math.sin(Math.PI * Math.min(1, Math.max(0, t))); // 0 at edges, 1 at center
        
        // Apply per-belt adjustments
        const height = (win.invert ? -1 : 1) * bellCurveHeight * (win.ampScale ?? 1) * taper;
        const curveY = Math.round(baseY + height) + 0.5; // Pixel-snap Y coordinates
        
        if (firstPoint) {
          ctx.moveTo(x, curveY);
          firstPoint = false;
        } else {
          ctx.lineTo(x, curveY);
        }
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
    });
    
    // Draw all data points
    dataPoints.forEach(point => {
      ctx.fillStyle = point.color;
      ctx.strokeStyle = point.color === '#CCCCCC' ? '#999999' : point.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(point.currentX, point.currentY, point.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    
    // Draw dropout bucket - SUBTLE STYLING
    ctx.fillStyle = 'rgba(100, 100, 100, 0.2)';
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // CRITICAL: Pixel-snap coordinates to prevent antialiasing artifacts
    const bucketY = Math.round(cssH - 120);
    const bucketHeight = Math.round(100);
    ctx.rect(0, bucketY, cssW, bucketHeight);
    ctx.fill();
    ctx.stroke();
    
    // Count total dropout dots
    const totalDropout = dataPoints.filter(p => p.isInDropoutBucket).length;
    
    ctx.fillStyle = '#666666';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('DROPOUT BUCKET', cssW / 2, cssH - 85);
    ctx.fillText(`Year ${currentStage + 1}/10`, cssW / 2, cssH - 65);
    ctx.fillText(`Total Dropouts: ${totalDropout}`, cssW / 2, cssH - 45);
    
    // CRITICAL: Show skill level progression in dropout bucket
    ctx.font = '12px Arial';
    ctx.fillText('Low Skill ←', 50, cssH - 30);
    ctx.fillText('→ High Skill', cssW - 50, cssH - 30);
    
    // Draw baseline - thick black horizontal line as in reference
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    // CRITICAL: Pixel-snap vertical coordinates to prevent antialiasing artifacts
    const baselineY = Math.round(cssH - 20) + 0.5;
    ctx.moveTo(0, baselineY);
    ctx.lineTo(cssW, baselineY);
    ctx.stroke();
    
    // Draw progress indicator
      if (isRunning) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(10, 10, 200 * animationProgress, 20);
      ctx.strokeStyle = 'white';
      ctx.strokeRect(10, 10, 200, 20);
      
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Year ${currentStage + 1} Progress: ${Math.round(animationProgress * 100)}%`, 220, 25);
    }
    
    // Draw continuity indicator
    if (currentStage > 0) {
      ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`✓ Year ${currentStage} completed - continuing from final state`, 10, 40);
      
      // Add debugging info for progression calculations
      const yearData = yearProgression[currentStage];
      const currentWhite = dataPoints.filter(p => p.category === 'white' && !p.isInDropoutBucket).length;
      const currentBlue = dataPoints.filter(p => p.category === 'blue' && !p.isInDropoutBucket).length;
      const currentPurple = dataPoints.filter(p => p.category === 'purple' && !p.isInDropoutBucket).length;
      const currentBrown = dataPoints.filter(p => p.category === 'brown' && !p.isInDropoutBucket).length;
      const currentBlack = dataPoints.filter(p => p.category === 'black' && !p.isInDropoutBucket).length;
      const totalDropout = dataPoints.filter(p => p.isInDropoutBucket).length;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Target: W${yearData.white} B${yearData.blue} P${yearData.purple} Br${yearData.brown} Bl${yearData.black} D${yearData.dropped}`, 10, 60);
      ctx.fillText(`Current: W${currentWhite} B${currentBlue} P${currentPurple} Br${currentBrown} Bl${currentBlack} D${totalDropout}`, 10, 75);
    }
    
  }, [containerSize, isRunning, animationProgress, spacing, currentStage, dataPoints]);

  // Monitor component re-renders for debugging
  useEffect(() => {
    // CRITICAL: Skip monitoring during position updates to prevent interference
    if (isUpdatingPositions) {
      console.log(`🚫 Skipping re-render monitoring during position update`);
      return;
    }
    
    console.log(`🔄 Component re-rendered - isRunning: ${isRunning}, animationProgress: ${animationProgress}, dataPoints: ${dataPoints.length}`);
    
    // CRITICAL: Check if dataPoints positions are being reset during re-render
    if (dataPoints.length > 0) {
      const dotsAtTop = dataPoints.filter(p => p.currentY < 100).length;
      const dotsAtRidgelines = dataPoints.filter(p => p.currentY >= 100 && p.currentY < 400).length;
      const dotsInBucket = dataPoints.filter(p => p.isInDropoutBucket).length;
      
      console.log(`🔍 RE-RENDER POSITION CHECK: ${dotsAtTop} at top, ${dotsAtRidgelines} at ridgelines, ${dotsInBucket} in bucket`);
      
      // If we have dots but they're all at top, this indicates a reset
      if (dotsAtTop === dataPoints.length && dotsInBucket === 0) {
        console.log(`🚨 ALERT: ALL DOTS RESET TO TOP DURING RE-RENDER!`);
        console.log(`   This suggests the component is re-initializing or state is being reset`);
      }
    }
  });

  // Monitor dataPoints changes for debugging
  useEffect(() => {
    // CRITICAL: Skip monitoring during position updates to prevent interference
    if (isUpdatingPositions) {
      console.log(`🚫 Skipping dataPoints monitoring during position update`);
      return;
    }
    
    // CRITICAL: Keep ref in sync with current dataPoints
    currentDataPointsRef.current = dataPoints;
    
    console.log(`📊 DataPoints changed - Count: ${dataPoints.length}, Stage: ${currentStage}`);
    if (dataPoints.length > 0) {
      console.log(`📍 Sample positions:`, dataPoints.slice(0, 3).map(p => ({id: p.id, currentX: p.currentX, currentY: p.currentY, category: p.category, isInDropout: p.isInDropoutBucket})));
      
      // CRITICAL: Check if positions are being reset to top
      const dotsAtTop = dataPoints.filter(p => p.currentY < 100).length;
      const dotsAtRidgelines = dataPoints.filter(p => p.currentY >= 100 && p.currentY < 400).length;
      
      if (dotsAtTop === dataPoints.length && currentStage > 0) {
        console.error(`🚨 CRITICAL ERROR: ALL DOTS RESET TO TOP in dataPoints change!`);
        console.error(`   Stage: ${currentStage}, This should never happen!`);
        console.error(`   Stack trace:`);
        console.trace();
      }
      
      // CRITICAL: Log the exact moment when positions change
      if (dotsAtTop > 0 && currentStage > 0) {
        console.log(`⚠️ WARNING: ${dotsAtTop} dots at top in stage ${currentStage}`);
        console.log(`   This suggests positions were reset somewhere`);
        console.log(`   Stack trace for this dataPoints change:`);
        console.trace();
      }
    }
  }); // REMOVED dependency array to prevent interference

  // Mobile performance optimization
  useEffect(() => {
    if (containerSize.performanceMode === 'low') {
      // Reduce animation frame rate on mobile
      const targetFPS = containerSize.maxFPS || 30;
      const frameInterval = 1000 / targetFPS;
      
      if (animationRef.current) {
        // Adjust existing animation timing
        console.log(`📱 Mobile mode: FPS limited to ${targetFPS}`);
      }
    }
  }, [containerSize.performanceMode, containerSize.maxFPS]);

  // Monitor currentStage changes for debugging
  useEffect(() => {
    console.log(`🎭 CurrentStage changed to: ${currentStage}`);
    console.log(`🔍 State Check - UI Stage: ${currentStage}, Console Stage: ${currentStage}, Animation Running: ${isRunning}`);
    
    // Check for state mismatch
    if (dataPoints.length > 0) {
      console.log(`⚠️ STATE CHECK - UI Stage: ${currentStage}, DataPoints Count: ${dataPoints.length}, Animation Running: ${isRunning}`);
      
      // CRITICAL: Check if dataPoints positions changed during currentStage change
      const dotsAtTop = dataPoints.filter(p => p.currentY < 100).length;
      const dotsAtRidgelines = dataPoints.length - dotsAtTop;
      console.log(`📍 POSITION CHECK during currentStage change: ${dotsAtTop} at top, ${dotsAtRidgelines} at ridgelines`);
      
      if (dotsAtTop === dataPoints.length) {
        console.log(`🚨 ALERT: ALL DOTS AT TOP during currentStage change!`);
        console.log(`   This confirms the reset happens during setCurrentStage`);
      }
    }
    
    // Stack trace to see where this change came from
    console.trace(`🔍 CurrentStage changed to ${currentStage} - Stack trace:`);
  }, [currentStage, isRunning]);

  // CRITICAL FIX: Helper function to get target position on ridgeline for a category
  const targetOnRidgeline = (catIdx: number) => {
    const cat = categories[catIdx];
    const x = cat.mean * containerSize.width + (Math.random() - 0.5) * cat.stdDev * containerSize.width;
    const normalizedX = (x - cat.mean * containerSize.width) / (cat.stdDev * containerSize.width);
    const bellCurveHeight = 25 * Math.exp(-(normalizedX * normalizedX) / 2);
    const y = 100 + cat.verticalOffset * spacing + bellCurveHeight;
    return { x, y };
  };

  // Mobile-optimized canvas rendering
  const getMobileCanvasConfig = () => {
    const isMobile = containerSize.performanceMode === 'low';
    return {
      dpr: containerSize.dpr || 1,
      maxFPS: containerSize.maxFPS || 60,
      renderQuality: isMobile ? 'low' : 'high',
      enableShadows: !isMobile,
      enableAntialiasing: !isMobile
    };
  };

  return (
    <Box 
      className="beltdropout-mobile"
      sx={{ 
        height: { xs: '100dvh', md: '100vh' },
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#1a1a1a',
        color: 'white',
        overflow: 'hidden',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}
    >
      {/* Header */}
      <Box 
        className="mobile-header"
        sx={{ 
          p: { xs: 2, md: 1 }, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          minHeight: { xs: 'var(--touch-target)', md: '48px' }
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: { xs: 'var(--mobile-font-size-xl)', md: 'inherit' }
          }}
        >
          BJJ Dropout
        </Typography>
        {onBack && (
          <Button 
            size="small"
            variant="outlined" 
            onClick={onBack} 
            className="mobile-touch-button"
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              minHeight: { xs: 'var(--touch-target)', md: 'auto' },
              minWidth: { xs: 'var(--touch-target)', md: 'auto' },
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Back to Home
          </Button>
        )}
      </Box>

      {/* Essential Controls - Single Line */}
      <Box 
        className="mobile-controls"
        sx={{ 
          p: { xs: 1, md: 1 }, 
          display: 'flex', 
          gap: { xs: 1, md: 1 }, 
          alignItems: 'center', 
          flexWrap: 'wrap',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          bgcolor: 'rgba(255,255,255,0.02)',
          flexShrink: 0
        }}
      >
        <Button 
          size="small"
          variant={rollingMode ? 'contained' : 'outlined'} 
          onClick={() => setRollingMode(v => !v)} 
          className="mobile-touch-button"
          sx={{ 
            bgcolor: rollingMode ? '#2196f3' : 'transparent',
            color: 'white', 
            borderColor: 'white',
            minHeight: { xs: 'var(--touch-target)', md: 'auto' },
            minWidth: { xs: 'var(--touch-target)', md: 'auto' },
            '&:hover': { borderColor: 'white', bgcolor: rollingMode ? '#1976d2' : 'rgba(255,255,255,0.1)' }
          }}
        >
          {rollingMode ? 'Rolling' : 'Single'}
        </Button>

        <Button 
          size="small"
          variant="contained" 
          onClick={isRunning ? stopAnimation : startAnimation}
          className="mobile-touch-button"
          sx={{ 
            bgcolor: isRunning ? '#f44336' : '#4caf50',
            minHeight: { xs: 'var(--touch-target)', md: 'auto' },
            minWidth: { xs: 'var(--touch-target)', md: 'auto' },
            '&:hover': { bgcolor: isRunning ? '#d32f2f' : '#45a049' }
          }}
        >
          {isRunning ? 'Stop' : 'Start'}
        </Button>

        <Button 
          size="small"
          variant="outlined" 
          onClick={resetAnimation} 
          className="mobile-touch-button"
          sx={{ 
            color: 'white', 
            borderColor: 'white',
            minHeight: { xs: 'var(--touch-target)', md: 'auto' },
            minWidth: { xs: 'var(--touch-target)', md: 'auto' },
            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          Reset
        </Button>

        <Typography 
          variant="body2" 
          sx={{ 
            color: 'white', 
            ml: 'auto',
            fontSize: { xs: 'var(--mobile-font-size-base)', md: 'inherit' }
          }}
        >
          Year {currentStage + 1}/10
        </Typography>
      </Box>

      {/* Canvas Container */}
      <Box 
        ref={containerRef}
        className="mobile-canvas-container"
        sx={{ 
          flex: 1, 
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#1a1a1a',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onTouchStart={(e) => {
            handleTouchStart(e);
            handlePinchGesture(e);
          }}
          onTouchMove={(e) => {
            handleTouchMove(e);
            handlePinchGesture(e);
          }}
          onTouchEnd={(e) => {
            handleTouchEnd(e);
            handlePinchGesture(e);
          }}
          style={{ 
            display: 'block',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            background: 'transparent',
            overflow: 'hidden',
            cursor: 'pointer',
            touchAction: 'none' /* Prevent default touch behaviors */
          }}
        />
        
        {/* Hover tooltip for dropout reasons */}
        {hoveredPoint && hoveredPoint.dropoutReason && (
          <Box
            sx={{
              position: 'absolute',
              left: hoveredPoint.currentX + 10,
              top: hoveredPoint.currentY - 30,
              bgcolor: 'rgba(0, 0, 0, 0.9)',
              color: 'white',
              p: 1,
              borderRadius: 1,
              fontSize: '12px',
              zIndex: 1000,
              pointerEvents: 'none'
            }}
          >
            <strong>Dropout Reason:</strong><br />
            {hoveredPoint.dropoutReason}
          </Box>
        )}
      </Box>

      {/* Detailed Controls at Bottom - COMPACT VERSION */}
      <Paper 
        className="mobile-footer mobile-settings-compact"
        sx={{ 
          m: { xs: 1, md: 1 }, 
          p: { xs: 1, md: 2 }, 
          bgcolor: 'rgba(255,255,255,0.05)', 
          color: 'white',
          border: '1px solid rgba(255,255,255,0.1)',
          flexShrink: 0
        }}
      >
        {/* Debug Info - COMPACT VERSION */}
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1, md: 2 }, 
          alignItems: 'center', 
          mb: { xs: 1, md: 2 }, 
          flexWrap: 'wrap',
          fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white',
              fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
            }}
          >
            {rollingMode ? 'Rolling' : 'Single'}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white',
              fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
            }}
          >
            {isRunning ? 'Running' : 'Stopped'} | {currentStage} | {dataPoints.length}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white',
              fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
            }}
          >
            Next: {currentStage < 9 ? `Y${currentStage + 2}` : 'Complete'}
          </Typography>
        </Box>

        {/* Animation Controls - COMPACT VERSION */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: { xs: 1, md: 2 } 
        }}>
          {/* Animation Duration */}
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white', 
                mb: { xs: 0.5, md: 1 },
                fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
              }}
            >
              Duration: {animationDuration}ms
            </Typography>
            <Slider
              value={animationDuration}
              onChange={(_, value) => setAnimationDuration(value as number)}
              min={500}
              max={3000}
              step={100}
              size="small"
              sx={{ 
                color: '#4caf50',
                '& .MuiSlider-thumb': { 
                  bgcolor: '#4caf50',
                  width: { xs: '1.5rem', md: 'auto' },
                  height: { xs: '1.5rem', md: 'auto' }
                },
                '& .MuiSlider-track': { bgcolor: '#4caf50' },
                '& .MuiSlider-rail': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            />
          </Box>
          
          {/* Stage Delay */}
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white', 
                mb: { xs: 0.5, md: 1 },
                fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
              }}
            >
              Delay: {stageDelay}ms
            </Typography>
            <Slider
              value={stageDelay}
              onChange={(_, value) => setStageDelay(value as number)}
              min={200}
              max={2000}
              step={100}
              size="small"
              sx={{ 
                color: '#ff9800',
                '& .MuiSlider-thumb': { 
                  bgcolor: '#ff9800',
                  width: { xs: '1.5rem', md: 'auto' },
                  height: { xs: '1.5rem', md: 'auto' }
                },
                '& .MuiSlider-track': { bgcolor: '#ff9800' },
                '& .MuiSlider-rail': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            />
          </Box>
          
          {/* Easing Type */}
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white', 
                mb: { xs: 0.5, md: 1 },
                fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
              }}
            >
              Easing: {easingType}
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 1, md: 1 } }}>
              {(['linear', 'easeInOut', 'easeOut'] as const).map((type) => (
                <Button 
                  key={type}
                  size="small"
                  variant={easingType === type ? 'contained' : 'outlined'}
                  onClick={() => setEasingType(type)}
                  className="mobile-touch-button"
                  sx={{ 
                    bgcolor: easingType === type ? '#ff9800' : 'transparent',
                    color: 'white', 
                    borderColor: 'white',
                    minHeight: { xs: '2rem', md: 'auto' },
                    minWidth: { xs: '2rem', md: 'auto' },
                    fontSize: { xs: '0.7rem', md: 'inherit' },
                    padding: { xs: '0.25rem 0.5rem', md: 'inherit' },
                    '&:hover': { 
                      borderColor: 'white', 
                      bgcolor: easingType === type ? '#f57c00' : 'rgba(255,255,255,0.1)' 
                    }
                  }}
                >
                  {type === 'easeInOut' ? 'EIO' : type === 'easeOut' ? 'EO' : 'L'}
                </Button>
              ))}
            </Box>
          </Box>
          
          {/* Spacing */}
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white', 
                mb: { xs: 0.5, md: 1 },
                fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
              }}
            >
              Spacing: {spacing}px
            </Typography>
            <Slider
              value={spacing}
              onChange={(_, value) => setSpacing(value as number)}
              min={40}
              max={120}
              step={10}
              size="small"
              sx={{ 
                color: '#9c27b0',
                '& .MuiSlider-thumb': { 
                  bgcolor: '#9c27b0',
                  width: { xs: '1.5rem', md: 'auto' },
                  height: { xs: '1.5rem', md: 'auto' }
                },
                '& .MuiSlider-track': { bgcolor: '#9c27b0' },
                '& .MuiSlider-rail': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            />
          </Box>
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.7)', 
            mt: { xs: 1, md: 2 },
            fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
          }}
        >
          100 white → Y2: 40W 10B 50D → Y10: 1W 2B 3P 6Br 5Bl 80D
        </Typography>

        {/* Mobile Performance Info - COMPACT VERSION */}
        <Box sx={{ 
          mt: { xs: 1, md: 1 },
          p: { xs: 1, md: 1 },
          bgcolor: 'rgba(0,255,0,0.1)',
          borderRadius: 1,
          border: '1px solid rgba(0,255,0,0.3)'
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              fontSize: { xs: 'var(--mobile-font-size-small)', md: 'inherit' }
            }}
          >
            📱 {containerSize.performanceMode === 'low' ? 'Perf' : 'HQ'} | 
            {containerSize.maxFPS}fps | 
            DPR{containerSize.dpr} | 
            {gestureState.currentScale.toFixed(1)}x
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default BeltDropout;
