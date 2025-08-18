import React from 'react';
import { Box, Card, CardContent, Typography, Link, Chip, Divider } from '@mui/material';
import { 
  School as SchoolIcon, 
  Science as ScienceIcon, 
  FitnessCenter as FitnessIcon, 
  Psychology as PsychologyIcon, 
  HealthAndSafety as HealthIcon 
} from '@mui/icons-material';
import { studies, categoryConfig, type Study } from '../data/studiesData';

// Icon mapping - precomputed for performance
const iconMap = {
  FitnessCenter: FitnessIcon,
  HealthAndSafety: HealthIcon,
  Psychology: PsychologyIcon,
  School: SchoolIcon,
  Science: ScienceIcon
} as const;

export const Studies: React.FC = () => {
  const renderStudy = (study: Study) => {
    const config = categoryConfig[study.category];
    const IconComponent = iconMap[config.icon as keyof typeof iconMap];
    
    return (
      <Card key={study.id} sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
              {study.title}
            </Typography>
            <Chip
              icon={<IconComponent />}
              label={config.label}
              size="small"
              sx={{ 
                backgroundColor: config.color,
                color: 'white',
                ml: 1
              }}
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {study.authors} • {study.journal} • {study.year}
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            {study.abstract}
          </Typography>
          
          <Link 
            href={study.url} 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ 
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Read Full Study →
          </Link>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
        Academic Studies & Research
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.7 }}>
        A curated collection of peer-reviewed academic studies and research papers focused on grappling sports, 
        including Brazilian Jiu-Jitsu, Judo, and Wrestling. These studies provide evidence-based 
        insights into biomechanics, physiology, psychology, injury prevention, and training methodologies.
      </Typography>
      
      <Divider sx={{ mb: 4 }} />
      
      <Box>
        {studies.map(renderStudy)}
      </Box>
      
      <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          These studies represent peer-reviewed research and evidence-based practices in grappling sports.
        </Typography>
      </Box>
    </Box>
  );
}; 