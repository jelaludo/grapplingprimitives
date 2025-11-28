"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type ModeKey = 'vagus' | 'box' | 'calf';
type Phase = 'inhale' | 'exhale' | 'hold1' | 'hold2' | 'up' | 'down';

interface ModeConfig {
  name: string;
  info: string;
  phases: Array<{ name: Phase; duration: number; text: string }>;
}

const modes: Record<ModeKey, ModeConfig> = {
  vagus: {
    name: 'Vagus Nerve',
    info: 'Activating the vagus nerve helps reduce stress and promotes relaxation. Breathe deeply with your diaphragm.',
    phases: [
      { name: 'inhale', duration: 4, text: 'Breathe In' },
      { name: 'exhale', duration: 8, text: 'Breathe Out' }
    ]
  },
  box: {
    name: 'Box Breathing',
    info: 'Box breathing is used by Navy SEALs and helps improve focus and reduce anxiety.',
    phases: [
      { name: 'inhale', duration: 4, text: 'Breathe In' },
      { name: 'hold1', duration: 4, text: 'Hold' },
      { name: 'exhale', duration: 4, text: 'Breathe Out' },
      { name: 'hold2', duration: 4, text: 'Hold' }
    ]
  },
  calf: {
    name: 'Calf Raises',
    info: 'Calf raises improve circulation and strengthen your lower legs. Rise slowly, hold, then lower with control.',
    phases: [
      { name: 'up', duration: 3, text: 'Rise Up' },
      { name: 'down', duration: 3, text: 'Lower Down' }
    ]
  }
};

export const BreathingCycles: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<ModeKey>('vagus');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const infoTimeoutRef = useRef<number | null>(null);

  const currentModeConfig = modes[currentMode];
  const currentPhaseIndex = currentModeConfig.phases.findIndex(p => p.name === phase);
  const currentPhaseConfig = currentModeConfig.phases[currentPhaseIndex];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const nextPhaseIndex = (currentPhaseIndex + 1) % currentModeConfig.phases.length;
      const nextPhase = currentModeConfig.phases[nextPhaseIndex];
      
      setPhase(nextPhase.name);
      setTimeLeft(nextPhase.duration);
      
      if (nextPhaseIndex === 0) {
        setCycles(prev => prev + 1);
      }
    }

    return () => {
      if (intervalRef.current) {
        window.clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timeLeft, currentPhaseIndex, currentModeConfig.phases]);

  useEffect(() => {
    return () => {
      if (infoTimeoutRef.current) {
        window.clearTimeout(infoTimeoutRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase(currentModeConfig.phases[0].name);
      setTimeLeft(currentModeConfig.phases[0].duration);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase(currentModeConfig.phases[0].name);
    setTimeLeft(currentModeConfig.phases[0].duration);
    setCycles(0);
  };

  const handleModeChange = (mode: ModeKey) => {
    setCurrentMode(mode);
    setIsActive(false);
    setPhase(modes[mode].phases[0].name);
    setTimeLeft(modes[mode].phases[0].duration);
    setCycles(0);
    setShowInfo(true);
    
    if (infoTimeoutRef.current) {
      window.clearTimeout(infoTimeoutRef.current);
    }
    infoTimeoutRef.current = window.setTimeout(() => setShowInfo(false), 4000);
  };

  const getCircleScale = () => {
    const progress = (currentPhaseConfig.duration - timeLeft) / currentPhaseConfig.duration;
    if (phase === 'inhale' || phase === 'up') {
      return 0.6 + (0.4 * progress);
    } else if (phase === 'exhale' || phase === 'down') {
      return 1 - (0.4 * progress);
    }
    return 1; // for hold phases
  };

  const getCircleColor = () => {
    if (currentMode === 'calf') return '#10b981'; // green for exercise
    switch(phase) {
      case 'inhale': return '#3b82f6';
      case 'exhale': return '#8b5cf6';
      case 'hold1':
      case 'hold2': return '#f59e0b';
      case 'up': return '#10b981';
      case 'down': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  const circleScale = getCircleScale();
  const circleColor = getCircleColor();

  return (
    <div className="w-full space-y-6 py-4 min-h-[600px] flex flex-col items-center justify-center">
      {/* Mode Selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {(Object.entries(modes) as [ModeKey, ModeConfig][]).map(([key, mode]) => (
          <button
            key={key}
            onClick={() => handleModeChange(key)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              "backdrop-blur-sm",
              currentMode === key
                ? "bg-white text-purple-600 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            {mode.name}
          </button>
        ))}
      </div>

      {/* Info Message */}
      {showInfo && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto text-center text-white text-sm leading-relaxed">
          {currentModeConfig.info}
          {currentMode === 'calf' && (
            <div className="mt-2 text-white/80">
              Goal: 10 reps
            </div>
          )}
        </div>
      )}

      {/* Cycles Counter */}
      <div className="text-center text-white/80 text-lg font-mono">
        {currentMode === 'calf' ? 'Reps' : 'Cycles'}: <span className="font-bold text-white">{cycles}</span>
        {currentMode === 'calf' && cycles < 10 && (
          <span className="text-sm text-white/60 ml-2">/ 10</span>
        )}
      </div>

      {/* Breathing Circle */}
      <div className="relative flex items-center justify-center my-8">
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
          {/* Outer ring */}
          <div className={cn(
            "absolute inset-0 rounded-full border-2 border-white/20",
            isActive && "animate-pulse"
          )} />
          
          {/* Progress indicators */}
          <div className="absolute inset-4 rounded-full border border-white/10" />
          
          {/* Main breathing circle */}
          <div
            className={cn(
              "rounded-full flex items-center justify-center text-white font-mono transition-all duration-1000 ease-in-out",
              isActive && "animate-pulse"
            )}
            style={{
              width: `${circleScale * 200}px`,
              height: `${circleScale * 200}px`,
              backgroundColor: circleColor,
              boxShadow: `0 0 60px ${circleColor}60, inset 0 0 20px rgba(255, 255, 255, 0.1)`,
            }}
          >
            <div className="text-center">
              <div className="text-lg font-medium mb-1">
                {currentPhaseConfig?.text || 'Ready'}
              </div>
              <div className="text-5xl font-bold">
                {timeLeft}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button
          size="lg"
          onClick={handleStart}
          className="bg-white text-purple-600 hover:bg-white/90 shadow-lg min-w-[120px]"
        >
          {isActive ? (
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
        
        <Button
          size="lg"
          variant="outline"
          onClick={handleReset}
          className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Progress indicator for calf raises */}
      {currentMode === 'calf' && cycles < 10 && (
        <div className="mt-6 max-w-xs mx-auto">
          <div className="bg-white/20 rounded-lg h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-lg transition-all duration-300"
              style={{ width: `${(cycles / 10) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Completion message for calf raises */}
      {currentMode === 'calf' && cycles >= 10 && (
        <div className="mt-6 text-center text-green-400 font-medium text-lg">
          Great job! You've completed 10 reps! 🎉
        </div>
      )}
    </div>
  );
};

