import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  useTheme
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMediaQuery } from '@mui/material';
import BellCurveChart from './BellCurveChart';

interface FlowDiagramChartProps {
  data: Array<{ step?: string; position?: number }>;
}

const FlowDiagramChart: React.FC<FlowDiagramChartProps> = ({ data }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isXs = useMediaQuery('(max-width:400px)');
  const markerW = isSmall ? 7 : 10;
  const markerH = isSmall ? 5 : 7;
  const baseFont = isSmall ? 'clamp(10px, 2.8vw, 12px)' : 'clamp(11px, 1.4vw, 14px)';
  
  return (
    <Box sx={{ width: '100%', height: { xs: 320, sm: 480, md: 640 }, position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
        {/* Gradient line from bottom-left to top-right */}
        <defs>
          <linearGradient id="positionGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4444" /> {/* Red at bottom */}
            <stop offset="25%" stopColor="#ff6b35" /> {/* Orange-red */}
            <stop offset="50%" stopColor="#808080" /> {/* Grey at center */}
            <stop offset="75%" stopColor="#4caf50" /> {/* Light green */}
            <stop offset="100%" stopColor="#2e7d32" /> {/* Dark green at top */}
          </linearGradient>
        </defs>
        
        <line 
          x1="50" y1="750" x2="750" y2="50" 
          stroke="url(#positionGradient)" 
          strokeWidth={isSmall ? 2 : 3}
        />
        
        {/* Bidirectional arrows */}
        <defs>
          <marker 
            id="arrowhead-red" 
            markerWidth={markerW} 
            markerHeight={markerH} 
            refX="9" 
            refY="3.5" 
            orient="auto"
          >
            <polygon 
              points="0 0, 10 3.5, 0 7" 
              fill="#ff4444" 
            />
          </marker>
          <marker 
            id="arrowhead-green" 
            markerWidth={markerW} 
            markerHeight={markerH} 
            refX="9" 
            refY="3.5" 
            orient="auto"
          >
            <polygon 
              points="0 0, 10 3.5, 0 7" 
              fill="#4caf50" 
            />
          </marker>
        </defs>
        
        {/* Arrow pointing down (getting worse) - bottom right */}
        <line 
          x1="650" y1="700" x2="650" y2="750" 
          stroke="#ff4444" 
          strokeWidth={isSmall ? 1.5 : 2}
          markerEnd="url(#arrowhead-red)"
        />
        <text 
          x="670" y="725" 
          fill="#ff4444" 
          style={{ fontSize: baseFont }}
          fontWeight="bold"
        >
          getting worse
        </text>
        
        {/* Arrow pointing up (getting better) - top left */}
        <line 
          x1="150" y1="100" x2="150" y2="50" 
          stroke="#4caf50" 
          strokeWidth={isSmall ? 1.5 : 2}
          markerEnd="url(#arrowhead-green)"
        />
        <text 
          x="170" y="75" 
          fill="#4caf50" 
          style={{ fontSize: baseFont }}
          fontWeight="bold"
        >
          getting better
        </text>
        
        {/* Step labels */}
        {data.map((item, index) => {
          if (!item.step || item.position === undefined) return null;
          
          const totalSteps = data.length - 1;
          const progress = item.position / totalSteps;
          const x = 50 + progress * 700;
          const y = 750 - progress * 700; // Steeper angle for 67.5 degrees, full height utilization
          
          // Stagger text positioning to avoid overlap, with special handling for first and last steps
          let textOffset = index % 2 === 0 ? -25 : 25;
          let textAnchor = index % 2 === 0 ? 'end' : 'start';
          
          // Ensure first step text isn't cut off at bottom
          if (index === 0) {
            textOffset = 30; // Move text up from bottom
            textAnchor = 'start';
          }
          
          // Ensure last step text isn't cut off at top
          if (index === data.length - 1) {
            textOffset = -30; // Move text down from top
            textAnchor = 'end';
          }
          
          return (
            <g key={index}>
              {/* Circle at each step */}
              <circle 
                cx={x} cy={y} r="6" 
                fill={theme.palette.background.paper} 
                stroke={theme.palette.primary.main} 
                strokeWidth="2"
              />
              
              {/* Step text with wrapping for long text */}
              {(() => {
                const show = isXs ? index % 3 === 0 : isSmall ? index % 2 === 0 : true;
                if (!show) return null;
                const isLong = !!item.step && item.step.length > (isSmall ? 18 : 22);
                if (isLong) {
                  const lines = item.step!.split(' ').reduce((acc: string[], word: string) => {
                    const current = acc[acc.length - 1] || '';
                    const maxLen = isSmall ? 12 : 15;
                    if ((current + ' ' + word).trim().length <= maxLen && acc.length < 2) {
                      acc[acc.length - 1] = (current ? current + ' ' : '') + word;
                    } else {
                      acc.push(word);
                    }
                    return acc;
                  }, ['']);
                  return (
                    <g>
                      {lines.map((line, lineIndex) => (
                        <text
                          key={lineIndex}
                          x={x + (textOffset > 0 ? 15 : -15)}
                          y={y + textOffset + (lineIndex * 14)}
                          fill={theme.palette.text.primary}
                          fontSize={baseFont}
                          style={{ paintOrder: 'stroke' as any }}
                          stroke={theme.palette.background.paper}
                          strokeWidth={isSmall ? 2 : 3}
                          textAnchor={textAnchor}
                          dominantBaseline="middle"
                        >
                          {line}
                        </text>
                      ))}
                    </g>
                  );
                }
                return (
                  <text
                    x={x + (textOffset > 0 ? 15 : -15)}
                    y={y + textOffset}
                    fill={theme.palette.text.primary}
                    fontSize={baseFont}
                    style={{ paintOrder: 'stroke' as any }}
                    stroke={theme.palette.background.paper}
                    strokeWidth={isSmall ? 2 : 3}
                    textAnchor={textAnchor}
                    dominantBaseline="middle"
                  >
                    {item.step}
                  </text>
                );
              })()}
            </g>
          );
        })}
      </svg>
    </Box>
  );
};

interface GraphData {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'line' | 'bell-curve' | 'flow-diagram';
  data: Array<{ 
    time?: string; 
    moarTechs?: number; 
    principles?: number; 
    health?: number;
    step?: string;
    position?: number;
  }>;
}

const graphsData: GraphData[] = [
  {
    id: 'grappler-training-changes',
    title: 'Our training evolves',
    description: 'A Grappler\'s training priorities typically changes with time and wether they\'re a heavy competitor or not.',
    category: '',
    type: 'line',
    data: [
      { time: 'Beginner', moarTechs: 80, principles: 20, health: 10 },
      { time: 'Advanced', moarTechs: 50, principles: 50, health: 25 },
      { time: 'Veteran', moarTechs: 15, principles: 80, health: 85 }
    ]
  },
  {
    id: 'bjj-belt-skill-distribution',
    title: 'BJJ Belt Colors Expectations*',
    description: 'While higher belts generally indicate greater skill, there\'s significant overlap between levels. An experienced blue belt may outperform a newer purple belt.',
    category: '',
    type: 'bell-curve',
    data: [
      { time: 'White Belt', moarTechs: 20, principles: 8, health: 10 },
      { time: 'Blue Belt', moarTechs: 35, principles: 9, health: 15 },
      { time: 'Purple Belt', moarTechs: 55, principles: 7, health: 25 },
      { time: 'Brown Belt', moarTechs: 75, principles: 16, health: 40 },
      { time: 'Black Belt', moarTechs: 95, principles: 20, health: 60 }
    ]
  },
  {
    id: 'beyond-offense-defense',
    title: 'Beyond offense and defense',
    description: 'it\'s always the same : improve your relative position',
    category: '',
    type: 'flow-diagram',
    data: [
      { step: 'had to tap!', position: 0 },
      { step: 'Resisting a submission', position: 1 },
      { step: 'Limbs isolated', position: 2 },
      { step: 'Alignment compromised', position: 3 },
      { step: 'Frames collapsing', position: 4 },
      { step: 'Dominated Position', position: 5 },
      { step: 'Losing Grip Fight', position: 6 },
      { step: 'Disengaged', position: 7 },
      { step: 'Dominant Grips', position: 8 },
      { step: 'Dominant Position', position: 9 },
      { step: 'Pressure, Collapsing their frames', position: 10 },
      { step: 'Opponent\'s alignment compromised', position: 11 },
      { step: 'Opponent\'s Limbs isolated', position: 12 },
      { step: 'Applying a controlled submission', position: 13 },
      { step: 'Opponent tapped.', position: 14 }
    ]
  }
];

interface GraphsProps {
  // Each increment resets to landing view (three cards)
  resetToken?: number;
}

const Graphs: React.FC<GraphsProps> = ({ resetToken = 0 }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedGraph, setSelectedGraph] = useState<GraphData | null>(null);

  // Reset to overview whenever reset token changes
  useEffect(() => {
    setSelectedGraph(null);
  }, [resetToken]);

  const handleGraphClick = (graph: GraphData) => {
    setSelectedGraph(graph);
  };

  const handleBackClick = () => {
    setSelectedGraph(null);
  };

  if (selectedGraph) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ 
              color: 'text.primary',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            {selectedGraph.title}
          </Typography>
        </Box>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            mb: 3,
            lineHeight: 1.6
          }}
        >
          {selectedGraph.description}
        </Typography>
        
        {selectedGraph.id === 'grappler-training-changes' && (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.primary',
                mb: 2,
                lineHeight: 1.6
              }}
            >
              Earlier stages are punctuated by a desire to drink from the firehose and accumulate as much knowledge and techniques as possible.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.primary',
                mb: 2,
                lineHeight: 1.6
              }}
            >
              With time we refine, we see patterns, we seeks the underlying truth common to the techniques.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.primary',
                mb: 2,
                lineHeight: 1.6
              }}
            >
              And every once-athlete and now aging grappler longs for better health and mobility, not all put in the time! but we should.
            </Typography>
          </Box>
        )}
        


        <Box sx={{ 
          backgroundColor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          mb: 3,
          // Full-bleed on small screens to eliminate side padding
          width: { xs: '100vw', md: '100%' },
          mx: { xs: 'calc(50% - 50vw)', md: 0 }
        }}>
          <Box sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
            {selectedGraph.type === 'line' ? (
              <ResponsiveContainer width="100%" height={isSmall ? 260 : 420}>
                <LineChart data={selectedGraph.data} margin={{ top: 8, right: 8, bottom: 16, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="time" stroke={theme.palette.text.secondary} tick={{ fill: theme.palette.text.secondary }} tickCount={isSmall ? 3 : 5} />
                  <YAxis stroke={theme.palette.text.secondary} tick={{ fill: theme.palette.text.secondary }} domain={[0, 100]} tickCount={isSmall ? 3 : 5} />
                  {!isSmall && (
                    <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, color: theme.palette.text.primary }} />
                  )}
                  {!isSmall && (
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  )}
                  <Line 
                    type="monotone" 
                    dataKey="moarTechs" 
                    stroke="#ff9800" 
                    strokeWidth={3}
                    name="MOAR TECHS!"
                    dot={{ fill: '#ff9800', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="principles" 
                    stroke="#9e9e9e" 
                    strokeWidth={3}
                    name="PRINCIPLES!"
                    strokeDasharray="8 4"
                    dot={{ fill: '#9e9e9e', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="health" 
                    stroke="#4caf50" 
                    strokeWidth={3}
                    name="Health/Mobility!"
                    strokeDasharray="12 6"
                    dot={{ fill: '#4caf50', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : selectedGraph.type === 'flow-diagram' ? (
              <FlowDiagramChart data={selectedGraph.data} />
            ) : (
              <BellCurveChart />
            )}
          </Box>
        </Box>

        {selectedGraph.id === 'beyond-offense-defense' && (
          <Box sx={{ mt: 3, mb: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.primary',
                lineHeight: 1.6
              }}
            >
              This one was inspired by a discussion I had with Wim Deputter, and I like this model. It goes to a simple truth : wherever we are in a match or fight, we want to get to a better place, until it's over.
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography 
        variant="h4" 
        component="h1"
        sx={{ 
          color: 'text.primary',
          fontWeight: 'bold',
          mb: 3
        }}
      >
        Graphs & Analytics
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.secondary',
          mb: 4,
          lineHeight: 1.6
        }}
      >
        Visual representations of BJJ training patterns, skill development, and grappling insights.
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 3 
      }}>
        {graphsData.map((graph) => (
          <Card 
            key={graph.id}
            sx={{ 
              backgroundColor: 'background.paper',
              border: `1px solid ${theme.palette.divider}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[4]
              }
            }}
            onClick={() => handleGraphClick(graph)}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                component="h2"
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                {graph.title}
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 2,
                  lineHeight: 1.5
                }}
              >
                {graph.description}
              </Typography>
              
              <Chip 
                label={graph.category} 
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.primary.main,
                  color: 'white'
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Graphs; 