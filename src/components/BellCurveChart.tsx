import React, { useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface BellCurveChartProps {
  width?: number;
  height?: number;
}

const BellCurveChart: React.FC<BellCurveChartProps> = ({ 
  width = 800, 
  height = 500 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  // Belt configurations: [mean, standardDeviation, color, alpha]
  const belts: [number, number, string, number][] = [
    [20, 8, '#E8E8E8', 0.7],   // White - keep as is
    [35, 15, '#4A90E2', 0.4],  // Blue - flattened
    [50, 18, '#8E44AD', 0.3],  // Purple - flattened
    [75, 22, '#8B4513', 0.2],  // Brown - flattened
    [95, 30, '#2C2C2C', 0.6]   // Black - further right, flattened
  ];

  const beltNames = ['White', 'Blue', 'Purple', 'Brown', 'Black'];
  const padding = 60;

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

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = theme.palette.background.paper;
    ctx.fillRect(0, 0, width, height);

    // Find max value for scaling
    let maxY = 0;
    for (let x = 0; x <= 200; x += 0.5) {
      for (let belt of belts) {
        const y = normalDistribution(x, belt[0], belt[1]);
        if (y > maxY) maxY = y;
      }
    }

    // Draw grid lines
    ctx.strokeStyle = theme.palette.divider;
    ctx.lineWidth = 0.5;

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * (width - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * (height - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = theme.palette.text.secondary;
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Draw distributions
    belts.forEach(([mean, stdDev, color, alpha]) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 3;

      ctx.beginPath();
      let firstPoint = true;

      for (let x = 0; x <= 200; x += 0.5) {
        const y = normalDistribution(x, mean, stdDev);
        const canvasX = padding + (x / 200) * (width - 2 * padding);
        const canvasY = height - padding - (y / maxY) * (height - 2 * padding);

        if (firstPoint) {
          ctx.moveTo(canvasX, canvasY);
          firstPoint = false;
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }

      ctx.stroke();

      // Fill under curve with lower alpha
      ctx.globalAlpha = alpha * 0.3;
      ctx.lineTo(width - padding, height - padding);
      ctx.lineTo(padding, height - padding);
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = 1.0;
    });

    // Add axis labels
    ctx.fillStyle = theme.palette.text.secondary;
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';

    // X-axis label
    ctx.fillText('ability 能力', width / 2, height - 15);

    // Y-axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('# people 人数', 0, 0);
    ctx.restore();

    // X-axis tick labels - removed as requested

    // Add belt level annotations
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    belts.forEach(([mean, stdDev, color], index) => {
      const canvasX = padding + (mean / 200) * (width - 2 * padding);
      const peakY = normalDistribution(mean, mean, stdDev);
      const canvasY = height - padding - (peakY / maxY) * (height - 2 * padding) - 20;

      ctx.fillStyle = color;
      ctx.fillText(beltNames[index], canvasX, canvasY);
    });

    // Add overlap indication - moved outside canvas

  }, [width, height, theme]);

  return (
    <Box sx={{ textAlign: 'center' }}>
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