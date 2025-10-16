import React, { useEffect, useRef, useState } from 'react';
import { getRandomBelt, calculateRequiredRoll, BELT_STATS } from './combatData';
import { getCombatOutcome, type CombatResult, type Technique } from './combatScenarios';
import { getRandomImageForBelt, getImagePaths, type AdultBelt } from './imageMapping';

interface SPTCGameProps {
  onExit?: () => void;
}

interface CombatMatchup {
  playerBelt: AdultBelt;
  opponentBelt: AdultBelt;
  playerImage: string;
  opponentImage: string;
  requiredRoll: number | 'Auto';
}

const SPTCGame: React.FC<SPTCGameProps> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const gameRef = useRef<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  // Mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });
  
  // Combat system state
  const [combatMatchup, setCombatMatchup] = useState<CombatMatchup | null>(null);
  const [nextMatchup, setNextMatchup] = useState<CombatMatchup | null>(null);
  const [combatOutcome, setCombatOutcome] = useState<{ result: CombatResult; technique: Technique } | null>(null);
  
  // Custom settings
  const [noiseFrequency, setNoiseFrequency] = useState(0.020);
  const [timeDuration, setTimeDuration] = useState(5);
  const [dotSpeed, setDotSpeed] = useState(1);
  const [dotSize, setDotSize] = useState(6);
  const [playerControl, setPlayerControl] = useState(0.8);
  const [maxCanvasTilt, setMaxCanvasTilt] = useState(0);
  const [difficulty, setDifficulty] = useState(5);
  const [displayGauges, setDisplayGauges] = useState({ w: 0, a: 0, s: 0, d: 0 });

  // Listen for resize to toggle mobile layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize combat matchup only when entering menu without an existing matchup,
  // and preserve it through the play to show the same creatures on results.
  useEffect(() => {
    if (gameState === 'menu' && !combatMatchup) {
      const playerBelt = getRandomBelt();
      const opponentBelt = getRandomBelt();
      const playerImage = getRandomImageForBelt(playerBelt);
      const opponentImage = getRandomImageForBelt(opponentBelt);
      const requiredRoll = calculateRequiredRoll(playerBelt, opponentBelt);
      setCombatMatchup({
        playerBelt,
        opponentBelt,
        playerImage,
        opponentImage,
        requiredRoll
      });
    }
  }, [gameState, combatMatchup]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw background heatmap for menu
    if (gameState === 'menu') {
      class MenuPerlin {
        perm: number[];
        
        constructor() {
          this.perm = [];
          for (let i = 0; i < 256; i++) this.perm[i] = i;
          for (let i = 255; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.perm[i], this.perm[j]] = [this.perm[j], this.perm[i]];
          }
          this.perm = [...this.perm, ...this.perm];
        }
        fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
        lerp(t: number, a: number, b: number) { return a + t * (b - a); }
        grad(hash: number, x: number, y: number) {
          const h = hash & 3;
          const u = h < 2 ? x : y;
          const v = h < 2 ? y : x;
          return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
        }
        noise(x: number, y: number) {
          const X = Math.floor(x) & 255;
          const Y = Math.floor(y) & 255;
          x -= Math.floor(x);
          y -= Math.floor(y);
          const u = this.fade(x);
          const v = this.fade(y);
          const a = this.perm[X] + Y;
          const b = this.perm[X + 1] + Y;
          return this.lerp(v,
            this.lerp(u, this.grad(this.perm[a], x, y), this.grad(this.perm[b], x - 1, y)),
            this.lerp(u, this.grad(this.perm[a + 1], x, y - 1), this.grad(this.perm[b + 1], x - 1, y - 1))
          );
        }
      }

      const perlin = new MenuPerlin();
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.45;
      const freq = 0.015;

      for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) / radius;
          
          if (dist < 1) {
            let value = perlin.noise(x * freq, y * freq);
            value += perlin.noise(x * freq * 2, y * freq * 2) * 0.5;
            value = (value + 1.5) / 3;
            value = Math.pow(value, 0.5);
            value *= (1 - dist * 0.3);
            value = Math.max(0, Math.min(1, value));
            
            let r, g, b;
            if (value < 0.25) {
              const t = value / 0.25;
              r = 0; g = Math.floor(100 + t * 155); b = Math.floor(255 - t * 55);
            } else if (value < 0.5) {
              const t = (value - 0.25) / 0.25;
              r = Math.floor(t * 200); g = 255; b = Math.floor(200 - t * 200);
            } else if (value < 0.75) {
              const t = (value - 0.5) / 0.25;
              r = Math.floor(200 + t * 55); g = Math.floor(255 - t * 100); b = 0;
            } else {
              const t = (value - 0.75) / 0.25;
              r = 255; g = Math.floor(155 - t * 155); b = 0;
            }
            
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
            ctx.fillRect(x, y, 2, 2);
          }
        }
      }
      return;
    }

    if (gameState !== 'playing') return;

    // Perlin noise implementation
    class PerlinNoise {
      perm: number[];
      
      constructor() {
        this.perm = [];
        for (let i = 0; i < 256; i++) this.perm[i] = i;
        for (let i = 255; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.perm[i], this.perm[j]] = [this.perm[j], this.perm[i]];
        }
        this.perm = [...this.perm, ...this.perm];
      }

      fade(t: number) {
        return t * t * t * (t * (t * 6 - 15) + 10);
      }

      lerp(t: number, a: number, b: number) {
        return a + t * (b - a);
      }

      grad(hash: number, x: number, y: number) {
        const h = hash & 3;
        const u = h < 2 ? x : y;
        const v = h < 2 ? y : x;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
      }

      noise(x: number, y: number) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        const u = this.fade(x);
        const v = this.fade(y);
        const a = this.perm[X] + Y;
        const b = this.perm[X + 1] + Y;
        return this.lerp(v,
          this.lerp(u, this.grad(this.perm[a], x, y), this.grad(this.perm[b], x - 1, y)),
          this.lerp(u, this.grad(this.perm[a + 1], x, y - 1), this.grad(this.perm[b + 1], x - 1, y - 1))
        );
      }
    }

    class Game {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      perlin: PerlinNoise;
      centerX: number;
      centerY: number;
      radius: number;
      heatmapData: number[][];
      dot: { x: number; y: number; noiseOffset: number };
      pressed: boolean;
      pressPoint: { x: number; y: number } | null;
      pulseRadius: number;
      noiseFreq: number;
      dotSpeed: number;
      dotSize: number;
      playerControl: number;
      maxCanvasTilt: number;
      difficulty: number;
      gauges: { w: number; a: number; s: number; d: number };
      keys: { w: boolean; a: boolean; s: boolean; d: boolean };
      tilt: { x: number; y: number };
      frameCount: number;
      finished: boolean;
      
      constructor(canvasElement: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvasElement;
        this.ctx = context;
        this.perlin = new PerlinNoise();
        this.centerX = canvasElement.width / 2;
        this.centerY = canvasElement.height / 2;
        this.radius = Math.min(canvasElement.width, canvasElement.height) * 0.4;
        this.heatmapData = [];
        this.dot = { x: 0, y: 0, noiseOffset: Math.random() * 1000 };
        this.pressed = false;
        this.pressPoint = null;
        this.pulseRadius = 0;
        this.noiseFreq = noiseFrequency;
        this.dotSpeed = dotSpeed;
        this.dotSize = dotSize;
        this.playerControl = playerControl;
        this.maxCanvasTilt = maxCanvasTilt;
        this.difficulty = difficulty;
        this.gauges = { w: 0, a: 0, s: 0, d: 0 };
        this.keys = { w: false, a: false, s: false, d: false };
        this.tilt = { x: 0, y: 0 };
        this.frameCount = 0;
        this.finished = false;
        this.generateHeatmap();
      }

      generateHeatmap() {
        const size = 200;
        
        const redThreshold = 0.65 + (this.difficulty * 0.03);
        const peakSharpness = 0.3 + (this.difficulty * 0.05);
        const peakBoost = 3.0 - (this.difficulty * 0.2);
        const valleyDepth = 0.1 + (this.difficulty * 0.02);
        
        for (let y = 0; y < size; y++) {
          this.heatmapData[y] = [];
          for (let x = 0; x < size; x++) {
            const nx = (x / size - 0.5) * 2;
            const ny = (y / size - 0.5) * 2;
            const dist = Math.sqrt(nx * nx + ny * ny);
            if (dist > 1) {
              this.heatmapData[y][x] = 0;
            } else {
              let value = this.perlin.noise(x * this.noiseFreq, y * this.noiseFreq);
              value += this.perlin.noise(x * this.noiseFreq * 2, y * this.noiseFreq * 2) * 0.5;
              value += this.perlin.noise(x * this.noiseFreq * 4, y * this.noiseFreq * 4) * 0.25;
              value += this.perlin.noise(x * this.noiseFreq * 8, y * this.noiseFreq * 8) * 0.125;
              
              value = (value + 1.875) / 3.75;
              value *= (1 - dist * 0.15);
              value = Math.pow(value, peakSharpness);
              
              if (value < 0.5) {
                value = value * 2 * valleyDepth;
              } else {
                const peakValue = (value - 0.5) * 2;
                const amplified = Math.pow(peakValue, 1.5 / peakBoost);
                value = 0.5 + amplified * 0.5;
                
                if (value > 0.85) {
                  const ultraBoost = (value - 0.85) / 0.15;
                  value = 0.85 + ultraBoost * 0.15 * (2.0 + peakBoost);
                }
              }
              
              this.heatmapData[y][x] = Math.max(0, Math.min(1, value));
            }
          }
        }
      }

      getHeatmapValue(x: number, y: number) {
        const relX = (x - this.centerX) / this.radius;
        const relY = (y - this.centerY) / this.radius;
        const mapX = Math.floor((relX + 1) * 100);
        const mapY = Math.floor((relY + 1) * 100);
        if (mapX < 0 || mapX >= 200 || mapY < 0 || mapY >= 200) return 0;
        return this.heatmapData[mapY][mapX] || 0;
      }

      getColor(value: number) {
        if (value < 0.25) {
          const t = value / 0.25;
          return `rgb(${Math.floor(0 + t * 0)}, ${Math.floor(100 + t * 155)}, ${Math.floor(255 - t * 55)})`;
        } else if (value < 0.5) {
          const t = (value - 0.25) / 0.25;
          return `rgb(${Math.floor(0 + t * 200)}, ${Math.floor(255)}, ${Math.floor(200 - t * 200)})`;
        } else if (value < 0.75) {
          const t = (value - 0.5) / 0.25;
          return `rgb(${Math.floor(200 + t * 55)}, ${Math.floor(255 - t * 100)}, ${Math.floor(0)})`;
        } else if (value < 0.95) {
          const t = (value - 0.75) / 0.2;
          return `rgb(${Math.floor(255)}, ${Math.floor(155 - t * 155)}, ${Math.floor(0)})`;
        } else {
          const t = (value - 0.95) / 0.05;
          return `rgb(${Math.floor(255)}, ${Math.floor(0)}, ${Math.floor(0 + t * 50)})`;
        }
      }

      updateGauges() {
        const buildRate = 0.04;
        const decayRate = 0.97;
        const maxGauge = 1;
        
        if (this.keys.w) this.gauges.w = Math.min(maxGauge, this.gauges.w + buildRate);
        else this.gauges.w *= decayRate;
        
        if (this.keys.a) this.gauges.a = Math.min(maxGauge, this.gauges.a + buildRate);
        else this.gauges.a *= decayRate;
        
        if (this.keys.s) this.gauges.s = Math.min(maxGauge, this.gauges.s + buildRate);
        else this.gauges.s *= decayRate;
        
        if (this.keys.d) this.gauges.d = Math.min(maxGauge, this.gauges.d + buildRate);
        else this.gauges.d *= decayRate;
        
        this.tilt.x = this.gauges.d - this.gauges.a;
        this.tilt.y = this.gauges.s - this.gauges.w;
        
        this.frameCount++;
        if (this.frameCount % 3 === 0) {
          setDisplayGauges({ ...this.gauges });
        }
      }

      updateDot(time: number) {
        const speed = 0.001 * this.dotSpeed;
        const angle = this.perlin.noise(time * speed + this.dot.noiseOffset, 0) * Math.PI * 2;
        const radius = this.perlin.noise(0, time * speed + this.dot.noiseOffset) * 0.5 + 0.5;
        
        const rngAmount = 1 - this.playerControl;
        const rngX = Math.cos(angle) * radius * this.radius * 0.85 * rngAmount;
        const rngY = Math.sin(angle) * radius * this.radius * 0.85 * rngAmount;
        
        let targetX = this.centerX + rngX;
        let targetY = this.centerY + rngY;
        
        targetX += this.tilt.x * this.radius * this.playerControl;
        targetY += this.tilt.y * this.radius * this.playerControl;
        
        const dx = targetX - this.centerX;
        const dy = targetY - this.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > this.radius * 0.9) {
          const scale = (this.radius * 0.9) / dist;
          targetX = this.centerX + dx * scale;
          targetY = this.centerY + dy * scale;
        }
        
        this.dot.x = targetX;
        this.dot.y = targetY;
      }

      drawHeatmap() {
        const size = this.radius * 2;
        const pixelSize = 2;
        for (let y = 0; y < size; y += pixelSize) {
          for (let x = 0; x < size; x += pixelSize) {
            const screenX = this.centerX - this.radius + x;
            const screenY = this.centerY - this.radius + y;
            const value = this.getHeatmapValue(screenX, screenY);
            if (value > 0) {
              this.ctx.fillStyle = this.getColor(value);
              this.ctx.fillRect(screenX, screenY, pixelSize, pixelSize);
            }
          }
        }
      }

      drawDot() {
        this.ctx.beginPath();
        this.ctx.arc(this.dot.x, this.dot.y, this.dotSize, 0, Math.PI * 2);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }

      drawPulse() {
        if (this.pulseRadius > 0 && this.pressPoint) {
          this.ctx.beginPath();
          this.ctx.arc(this.pressPoint.x, this.pressPoint.y, this.pulseRadius, 0, Math.PI * 2);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.pulseRadius / 100})`;
          this.ctx.lineWidth = 3;
          this.ctx.stroke();
          this.pulseRadius += 3;
          if (this.pulseRadius > 100) this.pulseRadius = 0;
        }
      }

      finishRound() {
        if (this.finished) return;
        this.finished = true;
        this.pressed = true;
        this.pressPoint = { x: this.dot.x, y: this.dot.y };
        this.pulseRadius = 1;
        const value = this.getHeatmapValue(this.dot.x, this.dot.y);
        const finalScore = Math.max(1, Math.round(value * 20)); // Scale 1-20 instead of 0-100
        setScore(finalScore);
        
        // Calculate combat outcome
        if (combatMatchup) {
          const outcome = getCombatOutcome(finalScore, combatMatchup.requiredRoll, 'pressure');
          setCombatOutcome(outcome);

          // Precompute next matchup for preview on results screen
          const nmPlayer = getRandomBelt();
          const nmOpp = getRandomBelt();
          const nmPlayerImg = getRandomImageForBelt(nmPlayer);
          const nmOppImg = getRandomImageForBelt(nmOpp);
          const nmReq = calculateRequiredRoll(nmPlayer, nmOpp);
          setNextMatchup({
            playerBelt: nmPlayer,
            opponentBelt: nmOpp,
            playerImage: nmPlayerImg,
            opponentImage: nmOppImg,
            requiredRoll: nmReq
          });
        }
        
        setTimeout(() => setGameState('finished'), 500);
      }

      draw(time: number) {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.tilt.x * this.maxCanvasTilt);
        this.ctx.scale(1 - Math.abs(this.tilt.y) * 0.05, 1 - Math.abs(this.tilt.x) * 0.05);
        this.ctx.translate(-this.centerX, -this.centerY);
        
        this.drawHeatmap();
        this.ctx.restore();
        
        if (!this.pressed) {
          this.updateGauges();
          this.updateDot(time);
        }
        
        this.drawDot();
        this.drawPulse();
      }
    }

    let animationId: number;
    let startTime: number;
    let timerInterval: NodeJS.Timeout;

    const game = new Game(canvas, ctx);
    gameRef.current = game;
    startTime = Date.now();
    const maxTime = timeDuration * 1000;

    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, maxTime - elapsed);
      setTimeLeft(Math.ceil(remaining / 1000));
      
      if (remaining <= 0 && !game.finished) {
        clearInterval(timerInterval);
        game.finishRound();
      }
    }, 100);

    const animate = () => {
      const time = Date.now();
      game.draw(time);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (['w', 'a', 's', 'd'].includes(key)) {
        e.preventDefault();
        if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
          game.keys[key] = true;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
          game.keys[key] = false;
        }
      }
    };

    if (gameState === 'playing') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(timerInterval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, noiseFrequency, timeDuration, dotSpeed, dotSize, playerControl, maxCanvasTilt, difficulty]);

  const startNewGame = () => {
    setScore(0);
    setTimeLeft(timeDuration);
    setDisplayGauges({ w: 0, a: 0, s: 0, d: 0 });
    setShowSettings(false);
    setCombatOutcome(null);
    // If starting from finished (retry/new match), prefer the precomputed next matchup
    // If starting from menu, keep the current matchup to avoid off-by-one creatures.
    if (gameState !== 'menu') {
      if (nextMatchup) {
        setCombatMatchup(nextMatchup);
        setNextMatchup(null);
      } else {
      const playerBelt = getRandomBelt();
      const opponentBelt = getRandomBelt();
      const playerImage = getRandomImageForBelt(playerBelt);
      const opponentImage = getRandomImageForBelt(opponentBelt);
      const requiredRoll = calculateRequiredRoll(playerBelt, opponentBelt);
      setCombatMatchup({
        playerBelt,
        opponentBelt,
        playerImage,
        opponentImage,
        requiredRoll
      });
      }
    }
    
    setGameState('playing');
  };

  const handleDPadPress = (key: 'w' | 'a' | 's' | 'd', pressed: boolean) => {
    if (gameRef.current) {
      gameRef.current.keys[key] = pressed;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#000', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }} />
      
      {gameState === 'menu' && combatMatchup && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', overflowY: 'auto' }}>
          <div style={{ textAlign: 'center', padding: isMobile ? '1rem 1rem 2rem' : '2rem', maxWidth: '42rem', margin: isMobile ? '1rem 0 2rem' : '2rem 0', position: 'relative', zIndex: 10, width: '100%' }}>
            <h1 style={{ fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.25rem)' : '3rem', fontWeight: 'bold', color: 'white', marginBottom: isMobile ? '1rem' : '2rem' }}>Timing & Pressure Challenge</h1>
            
            {/* Combat Matchup Display */}
            <div style={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', padding: isMobile ? '1rem' : '1.5rem', borderRadius: '0.5rem', marginBottom: isMobile ? '1rem' : '2rem' }}>
              <h2 style={{ color: '#fbbf24', fontSize: isMobile ? '1rem' : '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>⚔️ COMBAT SCENARIO</h2>
              
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: isMobile ? '1rem' : '2rem', marginBottom: '1rem', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                {/* Player */}
                <div style={{ textAlign: 'center' }}>
                  <picture>
                    <source srcSet={getImagePaths(combatMatchup.playerImage).avif} type="image/avif" />
                    <source srcSet={getImagePaths(combatMatchup.playerImage).webp} type="image/webp" />
                    <img 
                      src={getImagePaths(combatMatchup.playerImage).webp} 
                      alt="Player" 
                      style={{ width: isMobile ? '90px' : '120px', height: isMobile ? '120px' : '160px', borderRadius: '0.5rem', border: '3px solid #60a5fa', objectFit: 'cover' }}
                    />
                  </picture>
                  <div style={{ marginTop: '0.5rem', color: 'white', fontWeight: 'bold' }}>
                    {BELT_STATS[combatMatchup.playerBelt].emoji} YOU
                  </div>
                  <div style={{ color: BELT_STATS[combatMatchup.playerBelt].color, fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                    {BELT_STATS[combatMatchup.playerBelt].name}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                    +{BELT_STATS[combatMatchup.playerBelt].attackModifier} Attack
                  </div>
                </div>
                
                {/* VS */}
                <div style={{ color: '#fbbf24', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold' }}>VS</div>
                
                {/* Opponent */}
                <div style={{ textAlign: 'center' }}>
                  <picture>
                    <source srcSet={getImagePaths(combatMatchup.opponentImage).avif} type="image/avif" />
                    <source srcSet={getImagePaths(combatMatchup.opponentImage).webp} type="image/webp" />
                    <img 
                      src={getImagePaths(combatMatchup.opponentImage).webp} 
                      alt="Opponent" 
                      style={{ width: isMobile ? '90px' : '120px', height: isMobile ? '120px' : '160px', borderRadius: '0.5rem', border: '3px solid #ef4444', objectFit: 'cover' }}
                    />
                  </picture>
                  <div style={{ marginTop: '0.5rem', color: 'white', fontWeight: 'bold' }}>
                    {BELT_STATS[combatMatchup.opponentBelt].emoji} OPPONENT
                  </div>
                  <div style={{ color: BELT_STATS[combatMatchup.opponentBelt].color, fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                    {BELT_STATS[combatMatchup.opponentBelt].name}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                    DC {BELT_STATS[combatMatchup.opponentBelt].dc}
                  </div>
                </div>
              </div>
              
              {/* Required Roll */}
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: isMobile ? '0.75rem' : '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
                <div style={{ color: '#fbbf24', fontSize: '0.875rem', marginBottom: '0.25rem' }}>YOU NEED</div>
                <div style={{ color: 'white', fontSize: isMobile ? '1.125rem' : '1.5rem', fontWeight: 'bold' }}>
                  {combatMatchup.requiredRoll === 'Auto' ? '🎯 AUTO SUCCESS' : `${combatMatchup.requiredRoll}+ on d20`}
                </div>
                <div style={{ color: '#9ca3af', fontSize: isMobile ? '0.7rem' : '0.75rem', marginTop: '0.25rem' }}>
                  {combatMatchup.requiredRoll === 'Auto' ? 'Guaranteed Victory!' : `Approx. ${Math.round(((21 - (combatMatchup.requiredRoll as number)) / 20) * 100)}% success chance`}
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', padding: isMobile ? '1rem' : '1.5rem', borderRadius: '0.5rem', marginBottom: isMobile ? '1rem' : '2rem' }}>
              <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>
                Dot must be in RED Zone by the end of the timer
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                Use WASD keys or touch D-PAD to guide the dot
              </p>
            </div>

            {showSettings && (
              <div style={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', padding: isMobile ? '1rem' : '1.5rem', borderRadius: '0.5rem', textAlign: 'left', maxHeight: isMobile ? 'calc(100vh - 10rem)' : '24rem', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: 'bold', color: 'white' }}>Settings</h3>
                  <button 
                    onClick={() => setShowSettings(false)}
                    style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}
                  >
                    ✕
                  </button>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Peaks Density: {noiseFrequency.toFixed(3)} 
                    <span style={{ color: '#6b7280', fontSize: '0.75rem', marginLeft: '0.5rem' }}>(higher = more peaks)</span>
                  </label>
                  <input
                    type="range"
                    min="0.003"
                    max="0.06"
                    step="0.001"
                    value={noiseFrequency}
                    onChange={(e) => setNoiseFrequency(parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Time Duration: {timeDuration}s
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={timeDuration}
                    onChange={(e) => setTimeDuration(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Dot Speed: {dotSpeed.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={dotSpeed}
                    onChange={(e) => setDotSpeed(parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Dot Size: {dotSize}px
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    step="1"
                    value={dotSize}
                    onChange={(e) => setDotSize(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Player Control: {(playerControl * 100).toFixed(0)}%
                    <span style={{ color: '#6b7280', fontSize: '0.75rem', marginLeft: '0.5rem' }}>(0% = pure RNG, 100% = full control)</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={playerControl}
                    onChange={(e) => setPlayerControl(parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Canvas Tilt Amount: {(maxCanvasTilt * 100).toFixed(0)}%
                    <span style={{ color: '#6b7280', fontSize: '0.75rem', marginLeft: '0.5rem' }}>(visual rotation intensity)</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.3"
                    step="0.01"
                    value={maxCanvasTilt}
                    onChange={(e) => setMaxCanvasTilt(parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Difficulty Level: {difficulty}/10
                    <span style={{ color: '#6b7280', fontSize: '0.75rem', marginLeft: '0.5rem' }}>(1=many large reds, 10=few tiny reds)</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={difficulty}
                    onChange={(e) => setDifficulty(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            )}

            {!showSettings && (
              <button
                onClick={() => setShowSettings(true)}
                style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginBottom: '1rem' }}
              >
                ⚙️ Settings
              </button>
            )}

            <button
              onClick={startNewGame}
              style={{ 
                width: '16rem', 
                margin: '0 auto', 
                backgroundColor: '#2563eb', 
                color: 'white', 
                fontWeight: 'bold', 
                padding: '1rem 2rem', 
                borderRadius: '0.5rem', 
                fontSize: '1.25rem', 
                border: 'none',
                cursor: 'pointer',
                display: 'block',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Start Game
            </button>
            {onExit && (
              <button
                onClick={onExit}
                style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginTop: '1rem', display: 'block', margin: '1rem auto 0' }}
              >
                ← Back to Games
              </button>
            )}
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <div style={{ fontSize: '6rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem', filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.4))' }}>{timeLeft}</div>
          <div style={{ fontSize: '1.125rem', color: '#d1d5db' }}>Get to RED zone!</div>
        </div>
      )}

      {/* Playing thumbnails - top corners */}
      {gameState === 'playing' && combatMatchup && (
        <>
          {/* Player thumbnail (top-left) */}
          <div style={{ position: 'absolute', top: isMobile ? '0.5rem' : '1rem', left: isMobile ? '0.5rem' : '1rem', zIndex: 5, textAlign: 'center' }}>
            <picture>
              <source srcSet={getImagePaths(combatMatchup.playerImage).avif} type="image/avif" />
              <source srcSet={getImagePaths(combatMatchup.playerImage).webp} type="image/webp" />
              <img
                src={getImagePaths(combatMatchup.playerImage).webp}
                alt="You"
                style={{ width: isMobile ? '64px' : '80px', height: isMobile ? '86px' : '108px', borderRadius: '0.4rem', border: '3px solid #60a5fa', objectFit: 'cover', boxShadow: '0 6px 18px rgba(0,0,0,0.5)' }}
              />
            </picture>
            <div style={{ color: '#a7f3d0', fontSize: '0.7rem', marginTop: '0.25rem' }}>YOU</div>
          </div>

          {/* Opponent thumbnail (top-right) */}
          <div style={{ position: 'absolute', top: isMobile ? '0.5rem' : '1rem', right: isMobile ? '0.5rem' : '1rem', zIndex: 5, textAlign: 'center' }}>
            <picture>
              <source srcSet={getImagePaths(combatMatchup.opponentImage).avif} type="image/avif" />
              <source srcSet={getImagePaths(combatMatchup.opponentImage).webp} type="image/webp" />
              <img
                src={getImagePaths(combatMatchup.opponentImage).webp}
                alt="Opponent"
                style={{ width: isMobile ? '64px' : '80px', height: isMobile ? '86px' : '108px', borderRadius: '0.4rem', border: '3px solid #ef4444', objectFit: 'cover', boxShadow: '0 6px 18px rgba(0,0,0,0.5)' }}
              />
            </picture>
            <div style={{ color: '#fecaca', fontSize: '0.7rem', marginTop: '0.25rem' }}>OPPONENT</div>
          </div>
        </>
      )}

      {gameState === 'playing' && (
        <button
          onClick={() => { setGameState('menu'); setShowSettings(true); }}
          style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'white', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
          title="Settings"
        >
          ⚙️
        </button>
      )}

      {gameState === 'playing' && (
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', userSelect: 'none' }}>
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '0.5rem', padding: '1rem' }}>
            <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>WASD Gauges</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', width: '10rem' }}>
              <div></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '0.25rem' }}>W</div>
                <div style={{ width: '100%', height: '4rem', backgroundColor: '#1f2937', borderRadius: '0.25rem', position: 'relative', overflow: 'hidden' }}>
                  <div 
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#3b82f6', transition: 'all 75ms', height: `${displayGauges.w * 100}%` }}
                  ></div>
                </div>
              </div>
              <div></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '0.25rem' }}>A</div>
                <div style={{ width: '100%', height: '4rem', backgroundColor: '#1f2937', borderRadius: '0.25rem', position: 'relative', overflow: 'hidden' }}>
                  <div 
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#3b82f6', transition: 'all 75ms', height: `${displayGauges.a * 100}%` }}
                  ></div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '0.25rem' }}>S</div>
                <div style={{ width: '100%', height: '4rem', backgroundColor: '#1f2937', borderRadius: '0.25rem', position: 'relative', overflow: 'hidden' }}>
                  <div 
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#3b82f6', transition: 'all 75ms', height: `${displayGauges.s * 100}%` }}
                  ></div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '0.25rem' }}>D</div>
                <div style={{ width: '100%', height: '4rem', backgroundColor: '#1f2937', borderRadius: '0.25rem', position: 'relative', overflow: 'hidden' }}>
                  <div 
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#3b82f6', transition: 'all 75ms', height: `${displayGauges.d * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile D-PAD Controls */}
      {gameState === 'playing' && (
        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', userSelect: 'none' }}>
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '0.5rem', padding: '1rem' }}>
            <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>Touch Controls</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', width: '10rem' }}>
              <div></div>
              <button
                onTouchStart={() => handleDPadPress('w', true)}
                onTouchEnd={() => handleDPadPress('w', false)}
                onMouseDown={() => handleDPadPress('w', true)}
                onMouseUp={() => handleDPadPress('w', false)}
                onMouseLeave={() => handleDPadPress('w', false)}
                style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: displayGauges.w > 0 ? '#3b82f6' : '#374151',
                  border: '2px solid #60a5fa',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  touchAction: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                W
              </button>
              <div></div>
              
              <button
                onTouchStart={() => handleDPadPress('a', true)}
                onTouchEnd={() => handleDPadPress('a', false)}
                onMouseDown={() => handleDPadPress('a', true)}
                onMouseUp={() => handleDPadPress('a', false)}
                onMouseLeave={() => handleDPadPress('a', false)}
                style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: displayGauges.a > 0 ? '#3b82f6' : '#374151',
                  border: '2px solid #60a5fa',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  touchAction: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                A
              </button>
              <button
                onTouchStart={() => handleDPadPress('s', true)}
                onTouchEnd={() => handleDPadPress('s', false)}
                onMouseDown={() => handleDPadPress('s', true)}
                onMouseUp={() => handleDPadPress('s', false)}
                onMouseLeave={() => handleDPadPress('s', false)}
                style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: displayGauges.s > 0 ? '#3b82f6' : '#374151',
                  border: '2px solid #60a5fa',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  touchAction: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                S
              </button>
              <button
                onTouchStart={() => handleDPadPress('d', true)}
                onTouchEnd={() => handleDPadPress('d', false)}
                onMouseDown={() => handleDPadPress('d', true)}
                onMouseUp={() => handleDPadPress('d', false)}
                onMouseLeave={() => handleDPadPress('d', false)}
                style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: displayGauges.d > 0 ? '#3b82f6' : '#374151',
                  border: '2px solid #60a5fa',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  touchAction: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                D
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'finished' && combatMatchup && combatOutcome && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.95)', overflowY: 'auto', padding: '2rem 1rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '42rem', width: '100%' }}>
            {/* Score Display */}
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24', marginBottom: '0.5rem' }}>ROLL RESULT</h2>
            <div style={{ 
              fontSize: '5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: score >= 16 ? '#f87171' : score >= 10 ? '#facc15' : '#60a5fa'
            }}>
              {score}
            </div>
            
            {/* Combat Matchup Summary */}
            <div style={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                <span style={{ color: 'white' }}>
                  {BELT_STATS[combatMatchup.playerBelt].emoji} {BELT_STATS[combatMatchup.playerBelt].name}
                </span>
                <span style={{ color: '#9ca3af' }}>vs</span>
                <span style={{ color: 'white' }}>
                  {BELT_STATS[combatMatchup.opponentBelt].emoji} {BELT_STATS[combatMatchup.opponentBelt].name}
                </span>
              </div>
              <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                Required: {combatMatchup.requiredRoll === 'Auto' ? 'Auto Success' : `${combatMatchup.requiredRoll}+`} | Rolled: {score}
              </div>
            </div>
            
            {/* Combat Outcome with integrated images */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '120px 1fr 120px',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: combatOutcome.result === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
              border: `2px solid ${combatOutcome.result === 'success' ? '#10b981' : '#ef4444'}`,
              padding: '1rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              {/* LEFT: YOU */}
              <div style={{ textAlign: 'center' }}>
                <picture>
                  <source srcSet={getImagePaths(combatMatchup.playerImage).avif} type="image/avif" />
                  <source srcSet={getImagePaths(combatMatchup.playerImage).webp} type="image/webp" />
                  <img 
                    src={getImagePaths(combatMatchup.playerImage).webp} 
                    alt="Player" 
                    style={{ width: '100%', height: '133px', borderRadius: '0.5rem', border: `3px solid ${combatOutcome.result === 'success' ? '#10b981' : '#ef4444'}`, objectFit: 'cover', opacity: combatOutcome.result === 'success' ? 1 : 0.5 }}
                  />
                </picture>
                <div style={{ color: 'white', fontSize: '0.75rem', marginTop: '0.25rem' }}>YOU</div>
              </div>

              {/* CENTER: Outcome + Technique */}
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: combatOutcome.result === 'success' ? '#10b981' : '#ef4444', marginBottom: '0.5rem', textAlign: 'center' }}>
                  {combatOutcome.result === 'success' ? '✅ SUCCESS!' : '❌ FAILED!'}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem', textAlign: 'center' }}>
                  📌 {combatOutcome.technique.name}
                </div>
                <div style={{ fontSize: '1rem', color: '#d1d5db', fontStyle: 'italic', textAlign: 'center' }}>
                  {combatOutcome.technique.description}
                </div>
              </div>

              {/* RIGHT: OPPONENT */}
              <div style={{ textAlign: 'center' }}>
                <picture>
                  <source srcSet={getImagePaths(combatMatchup.opponentImage).avif} type="image/avif" />
                  <source srcSet={getImagePaths(combatMatchup.opponentImage).webp} type="image/webp" />
                  <img 
                    src={getImagePaths(combatMatchup.opponentImage).webp} 
                    alt="Opponent" 
                    style={{ width: '100%', height: '133px', borderRadius: '0.5rem', border: `3px solid ${combatOutcome.result === 'success' ? '#ef4444' : '#10b981'}`, objectFit: 'cover', opacity: combatOutcome.result === 'success' ? 0.5 : 1 }}
                  />
                </picture>
                <div style={{ color: 'white', fontSize: '0.75rem', marginTop: '0.25rem' }}>OPPONENT</div>
              </div>
            </div>
            
            {/* Next Match Preview + Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
              {nextMatchup && (
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '28rem', marginBottom: '0.25rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <picture>
                      <source srcSet={getImagePaths(nextMatchup.playerImage).avif} type="image/avif" />
                      <source srcSet={getImagePaths(nextMatchup.playerImage).webp} type="image/webp" />
                      <img src={getImagePaths(nextMatchup.playerImage).webp} alt="Next Player" style={{ width: '100%', height: '120px', borderRadius: '0.5rem', border: '2px solid #60a5fa', objectFit: 'cover' }} />
                    </picture>
                  </div>
                  <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
                    Next Matchup · {BELT_STATS[nextMatchup.playerBelt].emoji} vs {BELT_STATS[nextMatchup.opponentBelt].emoji} · {nextMatchup.requiredRoll === 'Auto' ? 'Auto Success' : `${nextMatchup.requiredRoll}+`}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <picture>
                      <source srcSet={getImagePaths(nextMatchup.opponentImage).avif} type="image/avif" />
                      <source srcSet={getImagePaths(nextMatchup.opponentImage).webp} type="image/webp" />
                      <img src={getImagePaths(nextMatchup.opponentImage).webp} alt="Next Opponent" style={{ width: '100%', height: '120px', borderRadius: '0.5rem', border: '2px solid #ef4444', objectFit: 'cover' }} />
                    </picture>
                  </div>
                </div>
              )}
              <button
                onClick={startNewGame}
                style={{ 
                  backgroundColor: '#2563eb', 
                  color: 'white', 
                  fontWeight: 'bold', 
                  padding: '1rem 3rem', 
                  borderRadius: '0.5rem', 
                  fontSize: '1.25rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                New Match
              </button>
              <button
                onClick={() => { setGameState('menu'); setCombatOutcome(null); }}
                style={{ 
                  color: '#9ca3af', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SPTCGame;