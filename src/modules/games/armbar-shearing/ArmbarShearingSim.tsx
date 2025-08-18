import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ArmbarShearingSimProps {
  onExit?: () => void;
}

interface GameMetrics {
  leverage: number;
  control: number;
  pressure: number;
  energy: number;
  angleDelta: number;
  score: number;
  time: number;
  hasWon: boolean;
}

const ArmbarShearingSim: React.FC<ArmbarShearingSimProps> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<any>(null);
  const [metrics, setMetrics] = useState<GameMetrics>({
    leverage: 0,
    control: 0,
    pressure: 0,
    energy: 100,
    angleDelta: 0,
    score: 0,
    time: 0,
    hasWon: false
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Game class
    class ArmbarGame {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      
             // Arm geometry
       shoulder = { x: 800, y: 200 };
       elbow = { x: 600, y: 300 };
       wrist = { x: 400, y: 400 };
      
             // Player controls
       mouse = { x: 0, y: 0 };
       fulcrum = { x: 600, y: 500 };
       gripPoint = { x: 0, y: 0 };
      pressureAngle = 0;
      
             // Game state
       armRotation = 0;
       targetRotation = 0;
       rotationSpeed = 0.02;
       escapeAttempts = 0;
       isApplyingPressure = false;
       isApplyingLeverage = false;
       energy = 100;
       score = 0;
       time = 0;
       hasWon = false;
       winTime: number | null = null;
      
      // Controls
      keys: { [key: string]: boolean } = {};
      
      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.setupEventListeners();
        this.gameLoop();
      }
      
             setupEventListeners() {
         // Mouse tracking
         this.canvas.addEventListener('mousemove', (e) => {
           const rect = this.canvas.getBoundingClientRect();
           this.mouse.x = e.clientX - rect.left;
           this.mouse.y = e.clientY - rect.top;
         });
         
         // Mouse click for leverage
         this.canvas.addEventListener('mousedown', (e) => {
           this.isApplyingLeverage = true;
         });
         
         this.canvas.addEventListener('mouseup', (e) => {
           this.isApplyingLeverage = false;
         });
         
         // Keyboard
         document.addEventListener('keydown', (e) => {
           this.keys[e.key.toLowerCase()] = true;
         });
         
         document.addEventListener('keyup', (e) => {
           this.keys[e.key.toLowerCase()] = false;
         });
       }
      
      update(dt: number) {
        this.time += dt;
        
        // Update fulcrum position with WASD
        const fulcrumSpeed = 100;
        if (this.keys['w']) this.fulcrum.y -= fulcrumSpeed * dt;
        if (this.keys['s']) this.fulcrum.y += fulcrumSpeed * dt;
        if (this.keys['a']) this.fulcrum.x -= fulcrumSpeed * dt;
        if (this.keys['d']) this.fulcrum.x += fulcrumSpeed * dt;
        
        // Fulcrum collision with arm segments
        const shoulderPos = this.shoulder;
        const elbowPos = this.getRotatedPoint(this.elbow, this.armRotation);
        const wristPos = this.getRotatedPoint(this.wrist, this.armRotation);
        
        const armSegments = [
          { start: shoulderPos, end: elbowPos, radius: 15 },
          { start: elbowPos, end: wristPos, radius: 15 }
        ];
        
        // Check collision with each arm segment
        armSegments.forEach(segment => {
          const closestPoint = this.projectPointOntoSegment(this.fulcrum, segment.start, segment.end);
          const distance = this.distance(this.fulcrum, closestPoint);
          const minDistance = segment.radius + 12;
          
          if (distance < minDistance) {
            const pushVector = {
              x: this.fulcrum.x - closestPoint.x,
              y: this.fulcrum.y - closestPoint.y
            };
            const pushLength = Math.sqrt(pushVector.x * pushVector.x + pushVector.y * pushVector.y);
            if (pushLength > 0) {
              this.fulcrum.x = closestPoint.x + (pushVector.x / pushLength) * minDistance;
              this.fulcrum.y = closestPoint.y + (pushVector.y / pushLength) * minDistance;
            }
          }
        });
        
        // Also prevent overlap with joints
        const joints = [
          { pos: shoulderPos, radius: 20 },
          { pos: elbowPos, radius: 18 },
          { pos: wristPos, radius: 16 }
        ];
        
        joints.forEach(joint => {
          const distance = this.distance(this.fulcrum, joint.pos);
          const minDistance = joint.radius + 12;
          
          if (distance < minDistance) {
            const pushVector = {
              x: this.fulcrum.x - joint.pos.x,
              y: this.fulcrum.y - joint.pos.y
            };
            const pushLength = Math.sqrt(pushVector.x * pushVector.x + pushVector.y * pushVector.y);
            if (pushLength > 0) {
              this.fulcrum.x = joint.pos.x + (pushVector.x / pushLength) * minDistance;
              this.fulcrum.y = joint.pos.y + (pushVector.y / pushLength) * minDistance;
            }
          }
        });
        
        // Calculate grip point on forearm
        this.calculateGripPoint();
        
        // Calculate pressure angle from mouse
        this.pressureAngle = Math.atan2(this.mouse.y - this.gripPoint.y, this.mouse.x - this.gripPoint.x);
        
        // Check if applying pressure
        this.isApplyingPressure = this.keys[' '];
        
        // Energy management
        if (this.isApplyingLeverage) {
          this.energy -= 15 * dt; // Deplete energy when applying leverage
          if (this.energy <= 0) {
            this.energy = 0;
            this.isApplyingLeverage = false;
          }
        } else {
          // Regenerate energy when not applying leverage
          this.energy = Math.min(100, this.energy + 10 * dt);
        }
        
        // Opponent arm movement
        this.updateArmRotation(dt);
        
        // Update scores
        this.updateMetrics();
      }
      
      calculateGripPoint() {
        const shoulderPos = this.shoulder;
        const elbowPos = this.getRotatedPoint(this.elbow, this.armRotation);
        const wristPos = this.getRotatedPoint(this.wrist, this.armRotation);
        
        // Extend beyond wrist for hand
        const forearmVector = { 
          x: wristPos.x - elbowPos.x, 
          y: wristPos.y - elbowPos.y 
        };
        const forearmLength = Math.sqrt(forearmVector.x * forearmVector.x + forearmVector.y * forearmVector.y);
        const normalizedVector = { 
          x: forearmVector.x / forearmLength, 
          y: forearmVector.y / forearmLength 
        };
        const handEnd = {
          x: wristPos.x + normalizedVector.x * 80,
          y: wristPos.y + normalizedVector.y * 80
        };
        
        // Check all segments and find closest point
        const segments = [
          { start: shoulderPos, end: elbowPos },
          { start: elbowPos, end: wristPos },
          { start: wristPos, end: handEnd }
        ];
        
        let closestPoint: { x: number; y: number } | null = null;
        let minDistance = Infinity;
        
        segments.forEach(segment => {
          const point = this.projectPointOntoSegment(this.mouse, segment.start, segment.end);
          const dist = this.distance(this.mouse, point);
          if (dist < minDistance) {
            minDistance = dist;
            closestPoint = point;
          }
        });
        
        this.gripPoint = closestPoint ?? { x: 0, y: 0 };
      }
      
      projectPointOntoSegment(point: { x: number; y: number }, segmentStart: { x: number; y: number }, segmentEnd: { x: number; y: number }) {
        const A = segmentStart;
        const B = segmentEnd;
        const P = point;
        
        const AB = { x: B.x - A.x, y: B.y - A.y };
        const AP = { x: P.x - A.x, y: P.y - A.y };
        
        const ABdotAB = AB.x * AB.x + AB.y * AB.y;
        const APdotAB = AP.x * AB.x + AP.y * AB.y;
        
        let t = APdotAB / ABdotAB;
        t = Math.max(0, Math.min(1, t));
        
        return {
          x: A.x + AB.x * t,
          y: A.y + AB.y * t
        };
      }
      
      updateArmRotation(dt: number) {
        // Generate escape attempts
        if (Math.random() < 0.01) {
          this.targetRotation = (Math.random() - 0.5) * 0.5;
          this.escapeAttempts++;
        }
        
        // Apply rotation resistance based on control
        const control = this.getControlLevel();
        const resistance = control * 0.8;
        
        const rotationDiff = this.targetRotation - this.armRotation;
        this.armRotation += rotationDiff * this.rotationSpeed * (1 - resistance) * dt * 60;
      }
      
             getLeverageLevel() {
         const shoulderPos = this.shoulder;
         const elbowPos = this.getRotatedPoint(this.elbow, this.armRotation);
         const wristPos = this.getRotatedPoint(this.wrist, this.armRotation);
         
         // Calculate distance along forearm from wrist to grip point
         const forearmVector = {
           x: wristPos.x - elbowPos.x,
           y: wristPos.y - elbowPos.y
         };
         const forearmLength = Math.sqrt(forearmVector.x * forearmVector.x + forearmVector.y * forearmVector.y);
         
         // Project grip point onto forearm
         const gripProjection = this.projectPointOntoSegment(this.gripPoint, wristPos, elbowPos);
         const distanceFromWrist = this.distance(wristPos, gripProjection);
         
         // Optimal leverage is at the wrist (0% distance from wrist)
         // Going further toward elbow reduces leverage
         const optimalDistance = 0;
         const maxDistance = forearmLength * 0.8; // 80% of forearm length
         
         let leverage;
         if (distanceFromWrist <= optimalDistance) {
           leverage = 1.0; // Perfect at wrist
         } else if (distanceFromWrist >= maxDistance) {
           leverage = 0.0; // No leverage beyond max distance
         } else {
           // Linear dropoff from wrist to max distance
           leverage = 1.0 - (distanceFromWrist / maxDistance);
         }
         
         return leverage;
       }
      
      getControlLevel() {
        const elbowPos = this.getRotatedPoint(this.elbow, this.armRotation);
        const fulcrumNearElbow = this.distance(this.fulcrum, elbowPos) < 40;
        
        // Calculate if pressure and fulcrum forces are opposite
        const armVector = {
          x: this.getRotatedPoint(this.wrist, this.armRotation).x - elbowPos.x,
          y: this.getRotatedPoint(this.wrist, this.armRotation).y - elbowPos.y
        };
        
        const fulcrumVector = {
          x: this.fulcrum.x - elbowPos.x,
          y: this.fulcrum.y - elbowPos.y
        };
        
        // Normalize vectors
        const armLength = Math.sqrt(armVector.x * armVector.x + armVector.y * armVector.y);
        const fulcrumLength = Math.sqrt(fulcrumVector.x * fulcrumVector.x + fulcrumVector.y * fulcrumVector.y);
        
        if (armLength > 0 && fulcrumLength > 0) {
          const armNorm = { x: armVector.x / armLength, y: armVector.y / armLength };
          const fulcrumNorm = { x: fulcrumVector.x / fulcrumLength, y: fulcrumVector.y / fulcrumLength };
          
          // Check if pressure angle opposes fulcrum direction
          const pressureVector = { x: Math.cos(this.pressureAngle), y: Math.sin(this.pressureAngle) };
          const oppositionDot = -(pressureVector.x * fulcrumNorm.x + pressureVector.y * fulcrumNorm.y);
          const oppositionQuality = Math.max(0, oppositionDot);
          
          let control = 0;
          if (fulcrumNearElbow) control += 0.5;
          if (this.isApplyingPressure) control += 0.3 * oppositionQuality;
          if (oppositionQuality > 0.8) control += 0.2;
          
          return Math.min(1, control);
        }
        
        return fulcrumNearElbow ? 0.3 : 0;
      }
      
      getPressureLevel() {
        if (!this.isApplyingPressure) return 0;
        
        const leverage = this.getLeverageLevel();
        const control = this.getControlLevel();
        return leverage * control;
      }
      
      getAngleDelta() {
        const elbowPos = this.getRotatedPoint(this.elbow, this.armRotation);
        
        // Calculate fulcrum force vector (from fulcrum to elbow)
        const fulcrumVector = {
          x: elbowPos.x - this.fulcrum.x,
          y: elbowPos.y - this.fulcrum.y
        };
        const fulcrumAngle = Math.atan2(fulcrumVector.y, fulcrumVector.x);
        
        // Calculate pressure force vector
        const pressureVector = {
          x: Math.cos(this.pressureAngle),
          y: Math.sin(this.pressureAngle)
        };
        const pressureAngle = this.pressureAngle;
        
        // Calculate angle difference (perfect shearing is 180 degrees apart)
        let angleDiff = Math.abs(fulcrumAngle - pressureAngle);
        if (angleDiff > Math.PI) {
          angleDiff = 2 * Math.PI - angleDiff;
        }
        
        // Convert to percentage (0% = perfect 180 degrees, 100% = same direction)
        const perfectShearing = Math.PI; // 180 degrees
        const angleDelta = Math.abs(angleDiff - perfectShearing) / perfectShearing;
        
        return Math.max(0, 1 - angleDelta); // Higher is better
      }
      
      updateMetrics() {
        const leverage = this.getLeverageLevel();
        const control = this.getControlLevel();
        const pressure = this.getPressureLevel();
        const angleDelta = this.getAngleDelta();
        
        // Update React state
        setMetrics({
          leverage,
          control,
          pressure,
          energy: this.energy,
          angleDelta,
          score: this.score,
          time: this.time,
          hasWon: this.hasWon
        });
        
        // Score based on sustained high pressure and good shearing
        if (pressure > 0.8 && angleDelta > 0.8) {
          this.score += 15;
        } else if (pressure > 0.5) {
          this.score += 2;
        }
        
        // Check for WIN condition
        if (leverage >= 0.9 && control > 0.7 && angleDelta > 0.8 && this.isApplyingPressure) {
          this.checkWinCondition();
        }
      }
      
      checkWinCondition() {
        if (!this.hasWon) {
          this.hasWon = true;
          this.winTime = this.time;
        }
      }
      
      getRotatedPoint(point: { x: number; y: number }, rotation: number) {
        const dx = point.x - this.shoulder.x;
        const dy = point.y - this.shoulder.y;
        return {
          x: this.shoulder.x + dx * Math.cos(rotation) - dy * Math.sin(rotation),
          y: this.shoulder.y + dx * Math.sin(rotation) + dy * Math.cos(rotation)
        };
      }
      
      distance(a: { x: number; y: number }, b: { x: number; y: number }) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
      }
      
      draw() {
        // Clear canvas
        this.ctx.fillStyle = '#2a2a2a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get rotated arm positions
        const rotatedElbow = this.getRotatedPoint(this.elbow, this.armRotation);
        const rotatedWrist = this.getRotatedPoint(this.wrist, this.armRotation);
        
        // Draw arm bones
        this.ctx.strokeStyle = '#888';
        this.ctx.lineWidth = 15;
        this.ctx.lineCap = 'round';
        
        // Upper arm
        this.ctx.beginPath();
        this.ctx.moveTo(this.shoulder.x, this.shoulder.y);
        this.ctx.lineTo(rotatedElbow.x, rotatedElbow.y);
        this.ctx.stroke();
        
        // Forearm
        this.ctx.beginPath();
        this.ctx.moveTo(rotatedElbow.x, rotatedElbow.y);
        this.ctx.lineTo(rotatedWrist.x, rotatedWrist.y);
        this.ctx.stroke();
        
        // Draw extended hand area
        const wristPos = this.getRotatedPoint(this.wrist, this.armRotation);
        const elbowPos = this.getRotatedPoint(this.elbow, this.armRotation);
        const forearmVector = { 
          x: wristPos.x - elbowPos.x, 
          y: wristPos.y - elbowPos.y 
        };
        const forearmLength = Math.sqrt(forearmVector.x * forearmVector.x + forearmVector.y * forearmVector.y);
        const handNormalizedVector = { 
          x: forearmVector.x / forearmLength, 
          y: forearmVector.y / forearmLength 
        };
        const handEnd = {
          x: wristPos.x + handNormalizedVector.x * 80,
          y: wristPos.y + handNormalizedVector.y * 80
        };
        
        // Draw hand extension
        this.ctx.strokeStyle = '#555';
        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        this.ctx.moveTo(wristPos.x, wristPos.y);
        this.ctx.lineTo(handEnd.x, handEnd.y);
        this.ctx.stroke();
        
                 // Draw joints
         this.drawJoint(this.shoulder.x, this.shoulder.y, '#666', 25, 'Shoulder');
         this.drawJoint(rotatedElbow.x, rotatedElbow.y, '#666', 18);
         this.drawJoint(rotatedWrist.x, rotatedWrist.y, '#666', 16);
        
                 // Draw fulcrum force vector (dynamic, from fulcrum position)
         const fulcrumForceVector = {
           x: rotatedElbow.x - this.fulcrum.x,
           y: rotatedElbow.y - this.fulcrum.y
         };
         const fulcrumForceLength = Math.sqrt(fulcrumForceVector.x * fulcrumForceVector.x + fulcrumForceVector.y * fulcrumForceVector.y);
         
         if (fulcrumForceLength > 0) {
           this.ctx.strokeStyle = '#4488ff';
           this.ctx.lineWidth = 4;
           this.ctx.beginPath();
           this.ctx.moveTo(this.fulcrum.x, this.fulcrum.y);
           
           const forceScale = 60;
           const normalizedForce = {
             x: fulcrumForceVector.x / fulcrumForceLength,
             y: fulcrumForceVector.y / fulcrumForceLength
           };
           this.ctx.lineTo(
             this.fulcrum.x + normalizedForce.x * forceScale,
             this.fulcrum.y + normalizedForce.y * forceScale
           );
           this.ctx.stroke();
           
           const arrowEnd = {
             x: this.fulcrum.x + normalizedForce.x * forceScale,
             y: this.fulcrum.y + normalizedForce.y * forceScale
           };
           this.drawArrowHead(arrowEnd, normalizedForce, '#4488ff');
         }
        
        // Draw fulcrum
        this.drawJoint(this.fulcrum.x, this.fulcrum.y, '#4444ff', 12);
        
        // Draw grip point
        this.drawJoint(this.gripPoint.x, this.gripPoint.y, '#ff4444', 8);
        
        // Draw pressure vector with arrow
        if (this.isApplyingPressure) {
          const pressureLength = 50 * this.getPressureLevel();
          const pressureEnd = {
            x: this.gripPoint.x + Math.cos(this.pressureAngle) * pressureLength,
            y: this.gripPoint.y + Math.sin(this.pressureAngle) * pressureLength
          };
          
          this.ctx.strokeStyle = '#ff6644';
          this.ctx.lineWidth = 3;
          this.ctx.beginPath();
          this.ctx.moveTo(this.gripPoint.x, this.gripPoint.y);
          this.ctx.lineTo(pressureEnd.x, pressureEnd.y);
          this.ctx.stroke();
          
          if (pressureLength > 10) {
            const pressureDir = { x: Math.cos(this.pressureAngle), y: Math.sin(this.pressureAngle) };
            this.drawArrowHead(pressureEnd, pressureDir, '#ff6644');
          }
        }
        
                 // Draw optimal leverage point (at wrist)
         this.ctx.fillStyle = '#44ff44';
         this.ctx.beginPath();
         this.ctx.arc(rotatedWrist.x, rotatedWrist.y, 8, 0, Math.PI * 2);
         this.ctx.fill();
         this.ctx.strokeStyle = '#88ff88';
         this.ctx.lineWidth = 2;
         this.ctx.stroke();
      }
      
      drawArrowHead(position: { x: number; y: number }, direction: { x: number; y: number }, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        
        const arrowSize = 8;
        const angle1 = Math.atan2(direction.y, direction.x) + Math.PI * 0.8;
        const angle2 = Math.atan2(direction.y, direction.x) - Math.PI * 0.8;
        
        this.ctx.beginPath();
        this.ctx.moveTo(position.x, position.y);
        this.ctx.lineTo(
          position.x + Math.cos(angle1) * arrowSize,
          position.y + Math.sin(angle1) * arrowSize
        );
        this.ctx.lineTo(
          position.x + Math.cos(angle2) * arrowSize,
          position.y + Math.sin(angle2) * arrowSize
        );
        this.ctx.closePath();
        this.ctx.fill();
      }
      
             drawJoint(x: number, y: number, color: string, size: number, label?: string) {
         this.ctx.fillStyle = color;
         this.ctx.beginPath();
         this.ctx.arc(x, y, size, 0, Math.PI * 2);
         this.ctx.fill();
         
         this.ctx.strokeStyle = '#fff';
         this.ctx.lineWidth = 2;
         this.ctx.stroke();
         
         // Add label if provided
         if (label) {
           this.ctx.fillStyle = '#fff';
           this.ctx.font = '12px Arial';
           this.ctx.textAlign = 'center';
           this.ctx.textBaseline = 'middle';
           this.ctx.fillText(label, x, y);
         }
       }
      
      gameLoop() {
        const now = performance.now();
        const dt = (now - (this.lastTime || now)) / 1000;
        this.lastTime = now;
        
        this.update(dt);
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
      }
      
      lastTime?: number;
    }

    // Start the game
    gameRef.current = new ArmbarGame(canvas, ctx);

    // Cleanup
    return () => {
      if (gameRef.current) {
        // Remove event listeners
        document.removeEventListener('keydown', () => {});
        document.removeEventListener('keyup', () => {});
      }
    };
  }, []);

  return (
    <Box sx={{ 
      p: { xs: 1, md: 2 }, 
      m: 'auto', 
      width: '100%', 
      maxWidth: 1200,
      fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', 
      letterSpacing: '0.06em' 
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontFamily: 'inherit' }}>Armbar Shearing Sim</Typography>
        <Button variant="outlined" size="small" sx={{ fontFamily: 'inherit', letterSpacing: 'inherit' }} onClick={onExit}>
          ← Back to Games
        </Button>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'rgba(0,0,0,0.05)',
        borderRadius: 2,
        p: 4,
        position: 'relative'
      }}>
        {/* Game UI */}
        <Box sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 100,
          bgcolor: 'rgba(0,0,0,0.8)',
          p: 2,
          borderRadius: 2,
          color: 'white',
          fontFamily: 'inherit'
        }}>
          <Box sx={{ mb: 1 }}>
            Leverage: <span style={{ color: '#44ff44' }}>{Math.round(metrics.leverage * 100)}%</span>
          </Box>
          <Box sx={{ 
            width: 200, 
            height: 20, 
            bgcolor: '#333', 
            border: '2px solid #555',
            borderRadius: '10px',
            overflow: 'hidden',
            mb: 1
          }}>
            <Box sx={{
              width: `${metrics.leverage * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ff4444, #44ff44)',
              borderRadius: '8px',
              transition: 'width 0.1s'
            }} />
          </Box>
          
          <Box sx={{ mb: 1 }}>
            Control: <span style={{ color: '#4488ff' }}>{Math.round(metrics.control * 100)}%</span>
          </Box>
          <Box sx={{ 
            width: 200, 
            height: 20, 
            bgcolor: '#333', 
            border: '2px solid #555',
            borderRadius: '10px',
            overflow: 'hidden',
            mb: 1
          }}>
            <Box sx={{
              width: `${metrics.control * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4444ff, #44ff44)',
              borderRadius: '8px',
              transition: 'width 0.1s'
            }} />
          </Box>
          
                     <Box sx={{ mb: 1 }}>
             Pressure: <span style={{ color: '#ff6644' }}>{Math.round(metrics.pressure * 100)}%</span>
           </Box>
           <Box sx={{ 
             width: 200, 
             height: 20, 
             bgcolor: '#333', 
             border: '2px solid #555',
             borderRadius: '10px',
             overflow: 'hidden',
             mb: 1
           }}>
             <Box sx={{
               width: `${metrics.pressure * 100}%`,
               height: '100%',
               background: 'linear-gradient(90deg, #666, #ff6644)',
               borderRadius: '8px',
               transition: 'width 0.1s'
             }} />
           </Box>
           
           <Box sx={{ mb: 1 }}>
             Energy: <span style={{ color: '#ffaa00' }}>{isNaN(metrics.energy) ? 0 : Math.round(metrics.energy)}%</span>
           </Box>
           <Box sx={{ 
             width: 200, 
             height: 20, 
             bgcolor: '#333', 
             border: '2px solid #555',
             borderRadius: '10px',
             overflow: 'hidden',
             mb: 1
           }}>
             <Box sx={{
               width: `${isNaN(metrics.energy) ? 0 : metrics.energy}%`,
               height: '100%',
               background: 'linear-gradient(90deg, #ff4444, #ffaa00)',
               borderRadius: '8px',
               transition: 'width 0.1s'
             }} />
           </Box>
           
           <Box sx={{ mb: 1 }}>
             Shearing: <span style={{ color: '#aa44ff' }}>{isNaN(metrics.angleDelta) ? 0 : Math.round(metrics.angleDelta * 100)}%</span>
           </Box>
           <Box sx={{ 
             width: 200, 
             height: 20, 
             bgcolor: '#333', 
             border: '2px solid #555',
             borderRadius: '10px',
             overflow: 'hidden',
             mb: 2
           }}>
             <Box sx={{
               width: `${isNaN(metrics.angleDelta) ? 0 : metrics.angleDelta * 100}%`,
               height: '100%',
               background: 'linear-gradient(90deg, #4444ff, #aa44ff)',
               borderRadius: '8px',
               transition: 'width 0.1s'
             }} />
           </Box>
          
          <Box sx={{ mb: 1 }}>
            Score: <span style={{ color: '#ffaa00' }}>{metrics.score}</span>
          </Box>
          <Box sx={{ mb: 1 }}>
            Time: <span style={{ color: '#aaa' }}>{metrics.time.toFixed(1)}s</span>
          </Box>
          {metrics.hasWon && (
            <Box sx={{ color: '#44ff44', fontWeight: 'bold' }}>
              SUBMISSION!
            </Box>
          )}
        </Box>

        {/* Instructions */}
        <Box sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          fontSize: '14px',
          color: '#aaa',
          fontFamily: 'inherit',
          bgcolor: 'rgba(0,0,0,0.8)',
          p: 2,
          borderRadius: 2,
          zIndex: 100
        }}>
                     Mouse: Position grip | Click: Apply leverage | WASD: Move fulcrum | Hold Space: Apply pressure<br />
           <span style={{ color: '#44ff44' }}>Green dot</span>: Optimal leverage point (wrist) | 
           <span style={{ color: '#4488ff' }}> Blue arrow</span>: Fulcrum force | 
           <span style={{ color: '#ff6644' }}> Red arrow</span>: Applied pressure
        </Box>

        {/* Game Canvas */}
        <canvas
          ref={canvasRef}
          width={1200}
          height={800}
          style={{
            border: '2px solid #333',
            background: '#2a2a2a',
            cursor: 'crosshair',
            borderRadius: '8px',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </Box>
    </Box>
  );
};

export default ArmbarShearingSim;
