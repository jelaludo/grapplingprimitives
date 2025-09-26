import React, { useState, useEffect, useRef } from 'react';
import { useViewManagement } from '../../hooks';

const BreathingApp = () => {
  const viewManagement = useViewManagement();
  const [currentMode, setCurrentMode] = useState('vagus');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [infoTimeout, setInfoTimeout] = useState<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const modes = {
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

  const currentModeConfig = modes[currentMode];
  const currentPhaseIndex = currentModeConfig.phases.findIndex(p => p.name === phase);
  const currentPhaseConfig = currentModeConfig.phases[currentPhaseIndex];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setTimeout(() => {
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
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isActive, timeLeft, currentPhaseIndex, currentModeConfig.phases]);

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

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    setIsActive(false);
    setPhase(modes[mode].phases[0].name);
    setTimeLeft(modes[mode].phases[0].duration);
    setCycles(0);
    setShowInfo(true);
    
    if (infoTimeout) clearTimeout(infoTimeout);
    const timeout = setTimeout(() => setShowInfo(false), 4000);
    setInfoTimeout(timeout);
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

  return (
    <>
      <style>
        {`
          @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
          }
        `}
      </style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #3b82f6 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace',
        letterSpacing: '0.06em',
        position: 'relative'
      }}>
      {/* Back Button */}
      <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
        <button
          onClick={viewManagement.switchToTraining}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            borderRadius: '20px',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          ← Back to Training Hub
        </button>
      </div>
      
      {/* Mode Selection */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {Object.entries(modes).map(([key, mode]) => (
          <button
            key={key}
            onClick={() => handleModeChange(key)}
            style={{
              padding: '12px 20px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: 'inherit',
              backgroundColor: currentMode === key ? 'white' : 'rgba(255, 255, 255, 0.2)',
              color: currentMode === key ? '#7c3aed' : 'white',
              boxShadow: currentMode === key ? '0 4px 20px rgba(255, 255, 255, 0.3)' : 'none',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              if (currentMode !== key) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentMode !== key) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
          >
            {mode.name}
          </button>
        ))}
      </div>

      {/* Info Message */}
      {showInfo && (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          maxWidth: '400px',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '14px',
          lineHeight: '1.6',
          fontFamily: 'inherit'
        }}>
          {currentModeConfig.info}
          {currentMode === 'calf' && (
            <div style={{ marginTop: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>
              Goal: 10 reps
            </div>
          )}
        </div>
      )}

      {/* Cycles Counter */}
      <div style={{
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '18px',
        marginBottom: '24px',
        fontFamily: 'inherit'
      }}>
        {currentMode === 'calf' ? 'Reps' : 'Cycles'}: <span style={{ fontWeight: 'bold', color: 'white' }}>{cycles}</span>
        {currentMode === 'calf' && cycles < 10 && (
          <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginLeft: '8px' }}>/ 10</span>
        )}
      </div>

      {/* Breathing Circle */}
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <div style={{ 
          position: 'relative', 
          width: '320px', 
          height: '320px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {/* Outer ring */}
          <div style={{
            position: 'absolute',
            inset: '0',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
          
          {/* Progress indicators */}
          <div style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}></div>
          
          {/* Main breathing circle */}
          <div
            style={{
              borderRadius: '50%',
              transition: 'all 1s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontFamily: 'inherit',
              width: `${getCircleScale() * 200}px`,
              height: `${getCircleScale() * 200}px`,
              backgroundColor: getCircleColor(),
              boxShadow: `0 0 60px ${getCircleColor()}60, inset 0 0 20px rgba(255, 255, 255, 0.1)`,
              animation: isActive ? 'breathe 4s ease-in-out infinite' : 'none'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '18px',
                fontWeight: '500',
                marginBottom: '4px',
                letterSpacing: 'inherit'
              }}>
                {currentPhaseConfig?.text || 'Ready'}
              </div>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                letterSpacing: 'inherit'
              }}>
                {timeLeft}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={handleStart}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#7c3aed',
            borderRadius: '25px',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
            letterSpacing: 'inherit'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {isActive ? '⏸️' : '▶️'}
          {isActive ? 'Pause' : 'Start'}
        </button>
        
        <button
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            borderRadius: '25px',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
            letterSpacing: 'inherit'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          🔄 Reset
        </button>
      </div>

      {/* Progress indicator for calf raises */}
      {currentMode === 'calf' && cycles < 10 && (
        <div style={{ marginTop: '24px', width: '256px' }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
                height: '8px',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                width: `${(cycles / 10) * 100}%`
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Completion message for calf raises */}
      {currentMode === 'calf' && cycles >= 10 && (
        <div style={{
          marginTop: '24px',
          color: '#10b981',
          fontWeight: '500',
          fontSize: '16px',
          fontFamily: 'inherit'
        }}>
          Great job! You've completed 10 reps! 🎉
        </div>
      )}
      </div>
    </>
  );
};

export default BreathingApp;