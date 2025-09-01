import React, { useState } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { Unit, calculatePercent, toTargetUnits } from '../types';

interface HexExerciseProps {
  name: string;
  target: { value: number; unit: Unit };
  achieved?: { value: number; unit: Unit };
  size?: number;                 // px, outer box
  colors?: {
    track?: string;
    primary?: string;
    overflow?: string;
    text?: string;
    bg?: string;
  };
  onProgressChange?: (achieved: { value: number; unit: Unit }) => void;
  onEditTarget?: () => void;
  onUnfavorite?: () => void;
}

export const HexExercise: React.FC<HexExerciseProps> = ({
  name,
  target,
  achieved,
  size = 140,
  colors = {
    track: "#e5e7eb",
    primary: "#3b82f6",
    overflow: "#22c55e",
    text: "#111827",
    bg: "white",
  },
  onProgressChange,
  onEditTarget,
  onUnfavorite,
}) => {
  const achievedInTargetUnits = toTargetUnits(
    achieved?.value ?? 0,
    (achieved?.unit as Unit) ?? target.unit,
    target.unit
  );

  const rawPercent = target.value > 0 ? (achievedInTargetUnits / target.value) * 100 : 0;
  const percent = Math.max(0, Math.min(300, Math.round(rawPercent)));
  const p1 = Math.min(percent, 100);
  const p2 = Math.max(0, percent - 100); // 0..200

  const [open, setOpen] = useState(false);
  const [tempPercent, setTempPercent] = useState(percent);

  const displayPercent = open ? tempPercent : percent;

  const handleClick = () => {
    setOpen((v) => !v);
  };

  const handleLongPress = (e: React.MouseEvent) => {
    e.preventDefault();
    // Show context menu for edit target / unfavorite
    if (onEditTarget || onUnfavorite) {
      // For now, just call edit target
      onEditTarget?.();
    }
  };

  const handleSliderChange = (value: number) => {
    setTempPercent(value);
  };

  const handleSliderCommit = () => {
    if (onProgressChange) {
      const achievedValue = (tempPercent / 100) * target.value;
      onProgressChange({
        value: Math.round(achievedValue * 100) / 100, // Round to 2 decimal places
        unit: target.unit
      });
    }
    setOpen(false);
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={handleClick}
      onContextMenu={handleLongPress}
      title={`${name}: ${percent}%`}
    >
      {/* Outer metallic border with progress */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: `conic-gradient(from 0deg, 
            ${p1 > 0 ? colors.primary : colors.track} 0deg, 
            ${p1 > 0 ? colors.primary : colors.track} ${p1 * 3.6}deg, 
            ${p2 > 0 ? colors.overflow : colors.track} ${p1 * 3.6}deg, 
            ${p2 > 0 ? colors.overflow : colors.track} ${(p1 + p2) * 3.6}deg, 
            ${colors.track} ${(p1 + p2) * 3.6}deg, 
            ${colors.track} 360deg)`,
          boxShadow: "0 0 10px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.2)",
        }}
      />

      {/* Inner content area */}
      <div
        style={{
          position: "absolute",
          width: "85%",
          height: "85%",
          top: "7.5%",
          left: "7.5%",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          backgroundColor: colors.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ 
          textAlign: "center", 
          fontSize: "12px", 
          color: colors.text, 
          opacity: 0.8,
          fontWeight: "500",
          lineHeight: "1.2"
        }}>
          {name}
        </div>
        <div style={{ 
          fontSize: "16px", 
          fontWeight: "700", 
          color: colors.text,
          marginTop: "4px"
        }}>
          {displayPercent}%
        </div>
        <div style={{ 
          fontSize: "10px", 
          color: colors.text, 
          opacity: 0.7,
          marginTop: "2px",
          textAlign: "center"
        }}>
          {target.value} {target.unit}
        </div>
      </div>

      {/* Progress glow effect */}
      {percent > 0 && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: `conic-gradient(from 0deg, 
              ${p1 > 0 ? colors.primary : 'transparent'} 0deg, 
              ${p1 > 0 ? colors.primary : 'transparent'} ${p1 * 3.6}deg, 
              ${p2 > 0 ? colors.overflow : 'transparent'} ${p1 * 3.6}deg, 
              ${p2 > 0 ? colors.overflow : 'transparent'} ${(p1 + p2) * 3.6}deg, 
              transparent ${(p1 + p2) * 3.6}deg, 
              transparent 360deg)`,
            filter: "blur(3px)",
            opacity: 0.6,
            zIndex: -1,
          }}
        />
      )}

      {open && (
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            right: 8,
            padding: 8,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 3,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="caption" sx={{ display: "block", marginBottom: 1 }}>
            Set progress (0–300%)
          </Typography>
          <Slider
            value={tempPercent}
            onChange={(_, value) => handleSliderChange(value as number)}
            onChangeCommitted={handleSliderCommit}
            min={0}
            max={300}
            step={5}
            sx={{ width: "100%" }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span>0%</span><span>100%</span><span>200%</span><span>300%</span>
          </Box>
        </div>
      )}
    </div>
  );
};
