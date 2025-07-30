import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  useTheme
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BellCurveChart from './BellCurveChart';

interface GraphData {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'line' | 'bell-curve';
  data: Array<{ time: string; moarTechs: number; principles: number; health: number }>;
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
  }
];

const Graphs: React.FC = () => {
  const theme = useTheme();
  const [selectedGraph, setSelectedGraph] = useState<GraphData | null>(null);

  const handleGraphClick = (graph: GraphData) => {
    setSelectedGraph(graph);
  };

  const handleBackClick = () => {
    setSelectedGraph(null);
  };

  if (selectedGraph) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
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

        <Card sx={{ 
          backgroundColor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          mb: 3
        }}>
          <CardContent sx={{ p: 3 }}>
            {selectedGraph.type === 'line' ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={selectedGraph.data}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme.palette.divider}
                  />
                  <XAxis 
                    dataKey="time" 
                    stroke={theme.palette.text.secondary}
                    tick={{ fill: theme.palette.text.secondary }}
                  />
                  <YAxis 
                    stroke={theme.palette.text.secondary}
                    tick={{ fill: theme.palette.text.secondary }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      color: theme.palette.text.primary
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      fontSize: '12px',
                      paddingTop: '10px'
                    }}
                  />
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
            ) : (
              <BellCurveChart width={800} height={500} />
            )}
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography 
            variant="button"
            onClick={handleBackClick}
            sx={{ 
              color: theme.palette.primary.main,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            ← Back to Graphs
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
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