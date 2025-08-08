import React, { useRef, useEffect, useMemo } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRef as useReactRef } from 'react';

interface BellCurveChartProps {
  width?: number;
  height?: number;
}

const BellCurveChart: React.FC<BellCurveChartProps> = ({ width, height }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const isSmall = useMediaQuery('(max-width:600px)');

  // Measure available size and set responsive dimensions
  const measured = useMemo(() => {
    const w = width ?? (wrapperRef.current?.clientWidth || 800);
    const hBase = Math.max(220, Math.min(520, Math.round((w * 0.6))));
    const h = height ?? hBase;
    return { w, h };
  }, [width, height]);

  // Belt configurations: [mean, standardDeviation, color, alpha]
  const belts: [number, number, string, number][] = [
    [20, 8, '#E8E8E8', 0.7],   // White - keep as is
    [35, 15, '#4A90E2', 0.4],  // Blue - flattened
    [50, 18, '#8E44AD', 0.3],  // Purple - flattened
    [75, 22, '#8B4513', 0.2],  // Brown - flattened
    [95, 30, '#2C2C2C', 0.6]   // Black - further right, flattened
  ];

  const beltNames = ['White', 'Blue', 'Purple', 'Brown', 'Black'];
  // Responsive padding: less on small screens, more on large
  const padding = Math.max(16, Math.min(48, Math.round((measured.w) * 0.05)));

  // Function to calculate normal distribution
  const normalDistribution = (x: number, mean: number, stdDev: number) => {
    const variance = stdDev * stdDev;
    const denominator = Math.sqrt(2 * Math.PI * variance);
    const exponent = -Math.pow(x - mean, 2) / (2 * variance);
    return Math.exp(exponent) / denominator;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(measured.w * dpr);
    canvas.height = Math.floor(measured.h * dpr);
    canvas.style.width = measured.w + 'px';
    canvas.style.height = measured.h + 'px';
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = theme.palette.background.paper;
    ctx.fillRect(0, 0, measured.w, measured.h);

    // Find max value for scaling
    let maxY = 0;
    const step = measured.w < 420 ? 1.0 : 0.5;
    for (let x = 0; x <= 200; x += step) {
      for (let belt of belts) {
        const y = normalDistribution(x, belt[0], belt[1]);
        if (y > maxY) maxY = y;
      }
    }

    // Draw grid lines
    ctx.strokeStyle = theme.palette.divider;
    ctx.lineWidth = 0.5;

    // Vertical grid lines
    const vLines = isSmall ? 4 : 10;
    for (let i = 0; i <= vLines; i++) {
      const x = padding + (i / vLines) * (measured.w - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, measured.h - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    const hLines = isSmall ? 3 : 5;
    for (let i = 0; i <= hLines; i++) {
      const y = padding + (i / hLines) * (measured.h - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(measured.w - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = theme.palette.text.secondary;
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, measured.h - padding);
    ctx.lineTo(measured.w - padding, measured.h - padding);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, measured.h - padding);
    ctx.stroke();

    // Draw distributions
    belts.forEach(([mean, stdDev, color, alpha], index) => {
      const isBlackBelt = beltNames[index] === 'Black';
      
      // For black belt, draw white outline first
      if (isBlackBelt) {
        // White outer outline to ensure contrast on dark themes
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 5;

        ctx.beginPath();
        let firstPoint = true;

        for (let x = 0; x <= 200; x += step) {
          const y = normalDistribution(x, mean, stdDev);
          const canvasX = padding + (x / 200) * (measured.w - 2 * padding);
          const canvasY = measured.h - padding - (y / maxY) * (measured.h - 2 * padding);

          if (firstPoint) {
            ctx.moveTo(canvasX, canvasY);
            firstPoint = false;
          } else {
            ctx.lineTo(canvasX, canvasY);
          }
        }

        ctx.stroke();
      }

      // Draw the actual curve
      if (isBlackBelt) {
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.globalAlpha = 1.0;
      } else {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
      }
      ctx.lineWidth = 3;

      ctx.beginPath();
      let firstPoint = true;

      for (let x = 0; x <= 200; x += step) {
        const y = normalDistribution(x, mean, stdDev);
        const canvasX = padding + (x / 200) * (measured.w - 2 * padding);
        const canvasY = measured.h - padding - (y / maxY) * (measured.h - 2 * padding);

        if (firstPoint) {
          ctx.moveTo(canvasX, canvasY);
          firstPoint = false;
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }

      ctx.stroke();

      // Fill under curve with lower alpha
      ctx.globalAlpha = isBlackBelt ? 0.2 : alpha * 0.3;
      ctx.lineTo(measured.w - padding, measured.h - padding);
      ctx.lineTo(padding, measured.h - padding);
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = 1.0;
    });

    // Add axis labels
    ctx.fillStyle = theme.palette.text.secondary;
    ctx.font = `${Math.round(Math.max(10, Math.min(13, measured.w * 0.016)))}px Arial`;
    ctx.textAlign = 'center';

    // X-axis label
    ctx.fillText('ability 能力', measured.w / 2, measured.h - 15);

    // Y-axis label
    ctx.save();
    ctx.translate(20, measured.h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('# people 人数', 0, 0);
    ctx.restore();

    // X-axis tick labels - removed as requested

    // Add belt level annotations
    ctx.font = `${Math.round(Math.max(10, Math.min(12, measured.w * 0.014)))}px Arial`;
    ctx.textAlign = 'center';

    belts.forEach(([mean, stdDev, color], index) => {
      const canvasX = padding + (mean / 200) * (measured.w - 2 * padding);
      const peakY = normalDistribution(mean, mean, stdDev);
      const canvasY = measured.h - padding - (peakY / maxY) * (measured.h - 2 * padding) - 20;

      ctx.fillStyle = color;
      ctx.fillText(beltNames[index], canvasX, canvasY);
    });

    // Add overlap indication - moved outside canvas

  }, [measured, theme, padding, isSmall]);

  return (
    <Box
      ref={wrapperRef}
      sx={{
        textAlign: 'center',
        width: { xs: '100vw', md: '100%' },
        mx: { xs: 'calc(50% - 50vw)', md: 0 }
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      
      {/* Comprehensive text below graph */}
      <Box sx={{ mt: 3, textAlign: 'left', maxWidth: 800, mx: 'auto' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>
          *"other things being equal" (which they rarely are)
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
          The "average" belt will typically best the "average" belt below, but ymmv.
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
          Belt color is a decent proxy for ability, but there are wide discrepancies within belt colors
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>
          「能力の概算」として帯色が悪くないですが、同じ帯色でも幅広く分布されています。
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
          There are typically lots of white belts, fewest brown belts as they either go to black or quit before brown
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2, fontWeight: 'bold' }}>
          All training hours are not equal:
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>
          e.g. One hour of half-assed shrimping and resistance-less armbar drills vs the same one-hour with a great mentor giving tailor-made pointers with increasingly challenging drills keeping you in the flow zone.
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2, fontWeight: 'bold' }}>
          some outliers:
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontStyle: 'italic' }}>
          e.g Ex-Wrestling champ or trained since 5 y/o Blue Belt
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontStyle: 'italic' }}>
          レスリング背景や5歳から練習している青帯
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontStyle: 'italic' }}>
          "out-of-prime hobbyist Brown/Black Belt with a bad knee"
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontStyle: 'italic' }}>
          「最近練習不足の茶黒帯、膝も痛いし」
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontStyle: 'italic' }}>
          Elite "colored belts" competitors
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontStyle: 'italic' }}>
          「色帯の一流選手」
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 1 }}>
          Always some outliers, freaks of nature, phenoms, full-time pros, PED users
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>
          桁外れの選手も勿論いる（天才やプロ、薬など）
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
          About 2,500 hours on the mat for a black belt seems a recurring and reasonable estimate. Black Belts know that there's always more to learn and refine. The Gladwell "10,000 hours to mastery" myth has kinda been debunked. (Quality vs time)
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2, fontWeight: 'bold' }}>
          Other Factors
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontStyle: 'italic' }}>
          Weight • Age • Cardio • Gi vs No-Gi, rulesets • Injuries • Other sports Experience
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>
          その他の要素：体重 • 年齢 • 耐久 • ノーギや道着・ルール次第 • 怪我 • 他の武術などの体得
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
          About 2500 hours on the mats for a black belt seems a recurring and reasonable estimate. At one hour per session twice a week that would take 25 years. At 3 hours per session 10x a week it might take 2 or 3 years. (rare, not impossible if fully dedicated with some athletic base)
        </Typography>
      </Box>
    </Box>
  );
};

export default BellCurveChart; 