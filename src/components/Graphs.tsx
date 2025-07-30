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

interface GraphData {
  id: string;
  title: string;
  description: string;
  category: string;
  data: Array<{ time: string; moarTechs: number; principles: number; health: number }>;
}

const graphsData: GraphData[] = [
  {
    id: 'grappler-training-changes',
    title: 'Grappler Training Changes Over Time',
    description: 'How grapplers\' training priorities evolve with experience',
    category: 'Training Evolution',
    data: [
      { time: 'Beginner', moarTechs: 80, principles: 20, health: 10 },
      { time: 'White Belt', moarTechs: 70, principles: 30, health: 15 },
      { time: 'Blue Belt', moarTechs: 50, principles: 50, health: 25 },
      { time: 'Purple Belt', moarTechs: 30, principles: 70, health: 40 },
      { time: 'Brown Belt', moarTechs: 20, principles: 75, health: 60 },
      { time: 'Black Belt', moarTechs: 15, principles: 80, health: 85 }
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
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ 
              color: 'text.primary',
              fontWeight: 'bold'
            }}
          >
            {selectedGraph.title}
          </Typography>
          <Chip 
            label={selectedGraph.category} 
            size="small"
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              color: 'white'
            }}
          />
        </Box>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            mb: 4,
            lineHeight: 1.6
          }}
        >
          {selectedGraph.description}
        </Typography>

        <Card sx={{ 
          backgroundColor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          mb: 3
        }}>
          <CardContent sx={{ p: 3 }}>
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
                <Legend />
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