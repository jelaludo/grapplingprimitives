import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Slider, Paper } from '@mui/material';
import Matter from 'matter-js';

interface BeltDropoutProps {
  onBack?: () => void;
}

interface BeltLevel {
  name: string;
  color: string;
  dropoutRate: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const BeltDropout: React.FC<BeltDropoutProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [isRunning, setIsRunning] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [beltLevels, setBeltLevels] = useState<BeltLevel[]>([
    { name: 'White', color: '#FFFFFF', dropoutRate: 0.3, x: 0.1, y: 0.2, width: 0.35, height: 0.25 },
    { name: 'Blue', color: '#0066CC', dropoutRate: 0.25, x: 0.25, y: 0.35, width: 0.35, height: 0.2 },
    { name: 'Purple', color: '#660099', dropoutRate: 0.2, x: 0.4, y: 0.5, width: 0.35, height: 0.18 },
    { name: 'Brown', color: '#663300', dropoutRate: 0.15, x: 0.55, y: 0.65, width: 0.35, height: 0.16 },
    { name: 'Black', color: '#000000', dropoutRate: 0.1, x: 0.7, y: 0.8, width: 0.35, height: 0.14 }
  ]);

  // Responsive canvas sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerSize.width || !containerSize.height) return;

    // Initialize Matter.js
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8 }
    });
    
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: containerSize.width,
        height: containerSize.height,
        wireframes: false,
        background: 'transparent',
        showDebug: false,
        showStats: false,
        // Prevent any internal scrollbar issues
        pixelRatio: 1,
        hasBounds: false
      }
    });

    // Create INVERTED funnel at the top (wider at bottom, narrower at top)
    const funnelTopWidth = containerSize.width * 0.2; // Narrow at top
    const funnelBottomWidth = containerSize.width * 0.4; // Wider at bottom
    const funnelHeight = containerSize.height * 0.15;
    const funnelX = (beltLevels[0].x + beltLevels[0].width/2) * containerSize.width - funnelBottomWidth/2;
    const funnelY = 0;
    
    // Create funnel walls (left and right sides) - INVERTED angles
    const leftFunnelWall = Matter.Bodies.rectangle(funnelX, funnelHeight/2, 20, funnelHeight, {
      isStatic: true,
      angle: -Math.PI * 0.15, // Outward angle (wider at bottom)
      render: { 
        fillStyle: '#666666',
        strokeStyle: '#888888',
        lineWidth: 2
      }
    });
    
    const rightFunnelWall = Matter.Bodies.rectangle(funnelX + funnelBottomWidth, funnelHeight/2, 20, funnelHeight, {
      isStatic: true,
      angle: Math.PI * 0.15, // Outward angle (wider at bottom)
      render: { 
        fillStyle: '#666666',
        strokeStyle: '#888888',
        lineWidth: 2
      }
    });
    
    // Create belt level platforms with proper bell curve shapes
    beltLevels.forEach((level, index) => {
      const x = level.x * containerSize.width;
      const y = level.y * containerSize.height;
      const width = level.width * containerSize.width;
      const height = level.height * containerSize.height;
      
             // Create dotted bell curve outline using multiple small line segments
       const curvePoints = generateBellCurve(x, y, width, height);
       
       // Create dotted line effect by making small line segments
       const dottedLines: Matter.Body[] = [];
       for (let i = 0; i < curvePoints.length - 1; i += 2) { // Skip every other point for dotted effect
         const start = curvePoints[i];
         const end = curvePoints[i + 1] || curvePoints[i];
         
         const line = Matter.Bodies.rectangle(
           (start.x + end.x) / 2,
           (start.y + end.y) / 2,
           Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)),
           2,
           {
             isStatic: true,
             angle: Math.atan2(end.y - start.y, end.x - start.x),
             render: {
               fillStyle: level.color,
               strokeStyle: level.color,
               lineWidth: 1
             }
           }
         );
         dottedLines.push(line);
       }
      
      // For White Belt only: create decision openings (dropout left, progression right)
      if (index === 0) { // White Belt
        // Left opening for dropout (leads to dropout bucket)
        const dropoutOpening = Matter.Bodies.rectangle(x + width * 0.2, y + height, 20, 20, {
          isStatic: true,
          render: { 
            fillStyle: 'transparent',
            opacity: 0
          }
        });
        
        // Right opening for progression (leads to Blue Belt)
        const progressionOpening = Matter.Bodies.rectangle(x + width * 0.8, y + height, 20, 20, {
          isStatic: true,
          render: { 
            fillStyle: 'transparent',
            opacity: 0
          }
        });
        
                 // Only add the dotted bell curve outline and openings (no container walls)
         Matter.Composite.add(engine.world, [...dottedLines, dropoutOpening, progressionOpening]);
       } else {
         // Only add the dotted bell curve outline (no container walls)
         Matter.Composite.add(engine.world, dottedLines);
       }
    });
    
    // Add funnel walls to world
    Matter.Composite.add(engine.world, [leftFunnelWall, rightFunnelWall]);

    // Create invisible boundaries (no center divider)
    const boundaries = [
      Matter.Bodies.rectangle(containerSize.width/2, -10, containerSize.width, 20, { isStatic: true, render: { fillStyle: 'transparent' } }), // top
      Matter.Bodies.rectangle(-10, containerSize.height/2, 20, containerSize.height, { isStatic: true, render: { fillStyle: 'transparent' } }), // left
      Matter.Bodies.rectangle(containerSize.width + 10, containerSize.height/2, 20, containerSize.height, { isStatic: true, render: { fillStyle: 'transparent' } }), // right
      Matter.Bodies.rectangle(containerSize.width/2, containerSize.height + 10, containerSize.width, 20, { isStatic: true, render: { fillStyle: 'transparent' } }) // bottom
    ];
    boundaries.forEach(boundary => Matter.Composite.add(engine.world, boundary));

    engineRef.current = engine;
    renderRef.current = render;
    
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    runnerRef.current = runner;

    return () => {
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    };
  }, [beltLevels, containerSize]);

  // Generate proper bell curve outline points (NOT a closed triangle shape)
  const generateBellCurve = (x: number, y: number, width: number, height: number) => {
    const points: Array<{ x: number; y: number }> = [];
    const segments = 100; // More segments for smoother curves
    
    // Bell curve parameters - wider distribution with longer tails
    const mean = x + width * 0.5; // Center of the curve
    const stdDev = width * 0.25; // Wider standard deviation for longer tails
    const amplitude = height * 0.9; // Higher amplitude for better visibility
    const tailExtension = width * 0.3; // Extend tails beyond the base width
    
    // Generate the bell curve outline from left to right (no bottom closing)
    for (let i = 0; i <= segments; i++) {
      const progress = i / segments; // 0 to 1
      const px = x - tailExtension + progress * (width + 2 * tailExtension);
      
      // Normal distribution formula: f(x) = amplitude * e^(-(x-mean)²/(2*stdDev²))
      const normalizedX = (px - mean) / stdDev;
      const bellCurveY = amplitude * Math.exp(-(normalizedX * normalizedX) / 2);
      const py = y + height - bellCurveY;
      
      points.push({ x: px, y: py });
    }
    
    // Return only the curve outline, NOT a closed shape
    return points;
  };



  const addStudent = () => {
    if (!engineRef.current) return;
    
    // All students start at the top of the funnel (narrower opening)
    const funnelTopWidth = containerSize.width * 0.2;
    const funnelBottomWidth = containerSize.width * 0.4;
    const funnelX = (beltLevels[0].x + beltLevels[0].width/2) * containerSize.width - funnelBottomWidth/2;
    const startX = funnelX + funnelBottomWidth/2 + (Math.random() - 0.5) * (funnelTopWidth * 0.8); // Random position within narrow top
    
    const student = Matter.Bodies.circle(startX, 10, 8, {
      restitution: 0.2,
      friction: 0.9,
      density: 0.2,
      render: { 
        fillStyle: '#FF6B6B',
        strokeStyle: '#E53E3E',
        lineWidth: 2
      }
    });
    
    // Add collision detection for belt progression and decision openings
    Matter.Events.on(engineRef.current, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const studentBody = pair.bodyA.isStatic ? pair.bodyB : pair.bodyA;
        const platformBody = pair.bodyA.isStatic ? pair.bodyA : pair.bodyB;
        
        // Check if student hit a belt platform
        if (!studentBody.isStatic && platformBody.isStatic) {
          // Find which belt level this is
          const beltIndex = beltLevels.findIndex((_, index) => {
            const level = beltLevels[index];
            const levelX = level.x * containerSize.width;
            const levelY = level.y * containerSize.height;
            const levelWidth = level.width * containerSize.width;
            const levelHeight = level.height * containerSize.height;
            
            return studentBody.position.x >= levelX && 
                   studentBody.position.x <= levelX + levelWidth &&
                   studentBody.position.y >= levelY && 
                   studentBody.position.y <= levelY + levelHeight;
          });
          
          if (beltIndex !== -1) {
            if (beltIndex === 0) { // White Belt - decision point
              // Apply dropout logic for White Belt
              const dropoutChance = Math.random();
              if (dropoutChance < beltLevels[beltIndex].dropoutRate) {
                // Student drops out - push them left through dropout opening
                const dropoutX = (beltLevels[0].x + beltLevels[0].width * 0.2) * containerSize.width;
                const dropoutY = (beltLevels[0].y + beltLevels[0].height) * containerSize.height + 50;
                
                Matter.Body.setVelocity(studentBody, {
                  x: (dropoutX - studentBody.position.x) * 0.2,
                  y: (dropoutY - studentBody.position.y) * 0.2
                });
                
                // Mark for removal after reaching dropout area
                setTimeout(() => {
                  if (engineRef.current) {
                    Matter.Composite.remove(engineRef.current.world, studentBody);
                  }
                }, 2000);
              } else {
                // Student progresses - push them right through progression opening
                const nextLevel = beltLevels[beltIndex + 1];
                const nextX = (nextLevel.x + nextLevel.width/2) * containerSize.width;
                const nextY = (nextLevel.y + nextLevel.height/2) * containerSize.height;
                
                Matter.Body.setVelocity(studentBody, {
                  x: (nextX - studentBody.position.x) * 0.15,
                  y: (nextY - studentBody.position.y) * 0.15
                });
                
                // Change color to next belt
                studentBody.render.fillStyle = nextLevel.color;
              }
            } else if (beltIndex < beltLevels.length - 1) {
              // Other belts - standard progression logic
              const dropoutChance = Math.random();
              if (dropoutChance < beltLevels[beltIndex].dropoutRate) {
                // Student drops out - remove them
                setTimeout(() => {
                  if (engineRef.current) {
                    Matter.Composite.remove(engineRef.current.world, studentBody);
                  }
                }, 1000);
              } else {
                // Student progresses to next belt
                const nextLevel = beltLevels[beltIndex + 1];
                const nextX = (nextLevel.x + nextLevel.width/2) * containerSize.width;
                const nextY = (nextLevel.y + nextLevel.height/2) * containerSize.height;
                
                Matter.Body.setVelocity(studentBody, {
                  x: (nextX - studentBody.position.x) * 0.1,
                  y: (nextY - studentBody.position.y) * 0.1
                });
                
                // Change color to next belt
                studentBody.render.fillStyle = nextLevel.color;
              }
            }
          }
        }
      });
    });
    
    Matter.Composite.add(engineRef.current.world, student);
  };

  const startSimulation = () => {
    setIsRunning(true);
    // Add students periodically
    intervalRef.current = setInterval(() => {
      if (isRunning) {
        addStudent();
      }
    }, 1000);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetSimulation = () => {
    if (!engineRef.current) return;
    
    // Remove all bodies except static ones
    const bodies = Matter.Composite.allBodies(engineRef.current.world);
    bodies.forEach(body => {
      if (!body.isStatic) {
        Matter.Composite.remove(engineRef.current!.world, body);
      }
    });
  };

  const handleDropoutRateChange = (index: number, value: number) => {
    const newBeltLevels = [...beltLevels];
    newBeltLevels[index].dropoutRate = value;
    setBeltLevels(newBeltLevels);
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#1a1a1a',
      color: 'white',
      // Prevent any scrollbar issues
      overflow: 'hidden',
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    }}>
      {/* Header - Minimal and compact */}
      <Box sx={{ 
        p: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        minHeight: '48px'
      }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          BJJ Dropout Visualization
        </Typography>
        {onBack && (
          <Button 
            size="small"
            variant="outlined" 
            onClick={onBack} 
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Back to Home
          </Button>
        )}
      </Box>

      {/* Controls - Compact and minimal */}
      <Paper sx={{ 
        m: 1, 
        p: 1, 
        bgcolor: 'rgba(255,255,255,0.05)', 
        color: 'white',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
          <Button 
            size="small"
            variant="contained" 
            onClick={isRunning ? stopSimulation : startSimulation}
            sx={{ 
              bgcolor: isRunning ? '#f44336' : '#4caf50',
              '&:hover': { bgcolor: isRunning ? '#d32f2f' : '#45a049' }
            }}
          >
            {isRunning ? 'Stop' : 'Start'}
          </Button>
          <Button 
            size="small"
            variant="outlined" 
            onClick={resetSimulation} 
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Reset
          </Button>
          <Button 
            size="small"
            variant="outlined" 
            onClick={addStudent} 
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Add Student
          </Button>
        </Box>
        
        {/* Belt Level Controls - Compact horizontal layout */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          {beltLevels.map((level, index) => (
            <Box key={level.name} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              minWidth: '120px'
            }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                bgcolor: level.color, 
                borderRadius: '50%',
                border: level.color === '#FFFFFF' ? '1px solid #ccc' : 'none'
              }} />
              <Typography variant="caption" sx={{ 
                color: level.color === '#FFFFFF' ? '#333' : 'white',
                fontWeight: 'bold',
                minWidth: '40px'
              }}>
                {level.name}
              </Typography>
              <Slider
                size="small"
                value={level.dropoutRate}
                onChange={(_, value) => handleDropoutRateChange(index, value as number)}
                min={0}
                max={1}
                step={0.05}
                sx={{ 
                  width: '60px',
                  color: level.color,
                  '& .MuiSlider-thumb': { bgcolor: level.color },
                  '& .MuiSlider-track': { bgcolor: level.color },
                  '& .MuiSlider-rail': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              />
              <Typography variant="caption" sx={{ 
                minWidth: '30px', 
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                {Math.round(level.dropoutRate * 100)}%
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Canvas Container - Now takes up most of the screen */}
      <Box 
        ref={containerRef}
        sx={{ 
          flex: 1, 
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#1a1a1a',
          // Prevent scrollbar gutter issues
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ 
            display: 'block',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            background: 'transparent',
            // Prevent canvas scrollbar issues
            overflow: 'hidden'
          }}
        />
      </Box>
    </Box>
  );
};

export default BeltDropout;
