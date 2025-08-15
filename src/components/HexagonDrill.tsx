import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HexagonDrillProps {
  drill: {
    id: string;
    name: string;
    hexagon_icon?: string;
    current_mastery: number;
    target_mastery: number;
    category: string;
    tags?: string[];
    difficulty: number;
  };
  size?: number;
  onClick?: () => void;
  isActive?: boolean;
}

// Styled hexagon container
const HexagonContainer = styled(Box, {
  shouldForwardProp: (prop) => !['size', 'isActive'].includes(prop as string),
})<{ size: number; isActive: boolean }>(({ theme, size, isActive }) => ({
  position: 'relative',
  width: size,
  height: size * 0.866, // Hexagon height ratio
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  transform: isActive ? 'scale(1.05)' : 'scale(1)',
  filter: isActive ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
  
  '&:hover': {
    transform: 'scale(1.1)',
    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
  },
}));

// SVG hexagon with progress fill
const HexagonSVG = styled('svg')<{ size: number }>(({ size }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
}));

// Content container for icon and text
const HexagonContent = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '70%',
  height: '70%',
  zIndex: 2,
});

// Placeholder icon component
const PlaceholderIcon = styled(Box)(({ theme }) => ({
  width: '60%',
  height: '60%',
  backgroundColor: theme.palette.grey[300],
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '8px',
  fontSize: '1.2rem',
  color: theme.palette.grey[600],
  fontWeight: 'bold',
}));

const HexagonDrill: React.FC<HexagonDrillProps> = ({
  drill,
  size = 120,
  onClick,
  isActive = false,
}) => {
  const progressPercentage = Math.min((drill.current_mastery / drill.target_mastery) * 100, 100);
  
  // Calculate hexagon points
  const centerX = size / 2;
  const centerY = size * 0.433; // Hexagon center Y
  const radius = size * 0.4; // Inner radius for the hexagon
  
  // Generate hexagon points
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 30) * (Math.PI / 180); // Start from top point
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');
  
  // Generate progress stroke (perimeter fill)
  const progressStroke = generateProgressStroke(centerX, centerY, radius, progressPercentage);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">{drill.name}</Typography>
          <Typography variant="caption">Progress: {Math.round(progressPercentage)}%</Typography>
          <Typography variant="caption">Difficulty: {drill.difficulty}/5</Typography>
          <Typography variant="caption">Category: {drill.category}</Typography>
          {drill.tags && drill.tags.length > 0 && (
            <Typography variant="caption">Tags: {drill.tags.join(', ')}</Typography>
          )}
        </Box>
      }
      arrow
    >
      <HexagonContainer size={size} isActive={isActive} onClick={handleClick}>
        {/* Background hexagon */}
        <HexagonSVG size={size}>
          <polygon
            points={points}
            fill="#2a2a2a"
            stroke="#444"
            strokeWidth="2"
          />
        </HexagonSVG>
        
        {/* Progress stroke (perimeter fill) */}
        {progressPercentage > 0 && (
          <HexagonSVG size={size}>
            <path
              d={progressStroke}
              fill="none"
              stroke="#4caf50"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </HexagonSVG>
        )}
        
        {/* Content */}
        <HexagonContent>
          {drill.hexagon_icon ? (
            <img 
              src={drill.hexagon_icon} 
              alt={drill.name}
              style={{ width: '60%', height: '60%', objectFit: 'contain' }}
            />
          ) : (
            <PlaceholderIcon>
              {drill.name.charAt(0).toUpperCase()}
            </PlaceholderIcon>
          )}
          
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: '0.7rem',
              textAlign: 'center',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              fontWeight: 'bold',
              lineHeight: 1,
            }}
          >
            {drill.name.length > 8 ? drill.name.substring(0, 8) + '...' : drill.name}
          </Typography>
        </HexagonContent>
      </HexagonContainer>
    </Tooltip>
  );
};

// Helper function to generate progress stroke path (perimeter fill)
function generateProgressStroke(centerX: number, centerY: number, radius: number, progress: number): string {
  if (progress <= 0) return '';
  if (progress >= 100) {
    // Full hexagon perimeter
    const points = Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 - 30) * (Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    });
    return `M ${points[0]} L ${points.slice(1).join(' L ')} Z`;
  }
  
  // Partial hexagon perimeter based on progress
  const totalPerimeter = 6; // 6 sides
  const filledSides = (progress / 100) * totalPerimeter;
  const completeSides = Math.floor(filledSides);
  const partialSide = filledSides - completeSides;
  
  const pathSegments: string[] = [];
  
  // Start from top point
  const startAngle = -30 * (Math.PI / 180);
  const startX = centerX + radius * Math.cos(startAngle);
  const startY = centerY + radius * Math.sin(startAngle);
  pathSegments.push(`M ${startX},${startY}`);
  
  // Add complete sides
  for (let i = 1; i <= completeSides; i++) {
    const angle = (i * 60 - 30) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    pathSegments.push(`L ${x},${y}`);
  }
  
  // Add partial side if needed
  if (partialSide > 0 && completeSides < 6) {
    const nextAngle = ((completeSides + 1) * 60 - 30) * (Math.PI / 180);
    const nextX = centerX + radius * Math.cos(nextAngle);
    const nextY = centerY + radius * Math.sin(nextAngle);
    
    // Interpolate between current and next point
    const currentAngle = (completeSides * 60 - 30) * (Math.PI / 180);
    const currentX = centerX + radius * Math.cos(currentAngle);
    const currentY = centerY + radius * Math.sin(currentAngle);
    
    const interpolatedX = currentX + (nextX - currentX) * partialSide;
    const interpolatedY = currentY + (nextY - currentY) * partialSide;
    
    pathSegments.push(`L ${interpolatedX},${interpolatedY}`);
  }
  
  return pathSegments.join(' ');
}

export default HexagonDrill;
