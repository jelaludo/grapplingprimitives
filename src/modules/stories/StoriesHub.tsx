import React, { useState, useEffect } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography, IconButton, Button, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface Story {
  id: string;
  title: string;
  description: string;
  pages: number;
  folder: string;
}

const stories: Story[] = [
  {
    id: 'explain-everything',
    title: 'Explain Everything!',
    description: "Let's start at the beginning...",
    pages: 4,
    folder: 'ExplainEverything'
  },
  {
    id: 'no-regrets',
    title: 'No Regrets',
    description: "You've never regretted going",
    pages: 8,
    folder: 'NoRegrets'
  }
];

interface StoriesHubProps {
  onExit?: () => void;
}

const StoriesHub: React.FC<StoriesHubProps> = ({ onExit }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setCurrentPage(1);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (!selectedStory) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (direction === 'next' && currentPage < selectedStory.pages) {
        setCurrentPage(currentPage + 1);
      } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setIsTransitioning(false);
    }, 150);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!selectedStory) return;
    
    if (event.key === 'ArrowRight' || event.key === ' ') {
      event.preventDefault();
      handlePageChange('next');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePageChange('prev');
    } else if (event.key === 'Escape') {
      setSelectedStory(null);
    }
  };

  useEffect(() => {
    if (selectedStory) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedStory, currentPage]);

  const getPageImage = (story: Story, page: number) => {
    const paddedPage = page.toString().padStart(3, '0');
    const fileName = story.folder === 'ExplainEverything' 
      ? `${paddedPage}Hobbit.avif`
      : `${paddedPage}Regret.avif`;
    return `/images/stories/${story.folder}/${fileName}`;
  };

  if (selectedStory) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#000',
        position: 'relative'
      }}>
        {/* Header */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 10,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
          p: 2
        }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton 
                onClick={() => setSelectedStory(null)}
                sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" sx={{ color: 'white', fontFamily: 'DS-Digital, monospace' }}>
                {selectedStory.title} - Page {currentPage} of {selectedStory.pages}
              </Typography>
            </Stack>
            <IconButton 
              onClick={onExit}
              sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Page Content */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: { xs: 1, md: 2 },
          position: 'relative'
        }}>
          {/* Navigation Buttons */}
          {currentPage > 1 && (
            <IconButton
              onClick={() => handlePageChange('prev')}
              sx={{
                position: 'absolute',
                left: { xs: 8, md: 16 },
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.7)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' },
                zIndex: 5
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
          )}
          
          {currentPage < selectedStory.pages && (
            <IconButton
              onClick={() => handlePageChange('next')}
              sx={{
                position: 'absolute',
                right: { xs: 8, md: 16 },
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.7)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' },
                zIndex: 5
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          )}

          {/* Page Image */}
          <Box sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            transition: 'opacity 0.15s ease-in-out',
            opacity: isTransitioning ? 0.3 : 1,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3
          }}>
            <img
              src={getPageImage(selectedStory, currentPage)}
              alt={`${selectedStory.title} - Page ${currentPage}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </Box>
        </Box>

        {/* Footer Navigation */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          p: 2
        }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <Button
              variant="outlined"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange('prev')}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Previous
            </Button>
            <Typography variant="body2" sx={{ color: 'white' }}>
              {currentPage} / {selectedStory.pages}
            </Typography>
            <Button
              variant="outlined"
              disabled={currentPage >= selectedStory.pages}
              onClick={() => handlePageChange('next')}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 1, md: 2 }, 
      m: 'auto', 
      width: '100%', 
      maxWidth: 980,
      fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', 
      letterSpacing: '0.06em' 
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontFamily: 'inherit' }}>Stories</Typography>
        <Button variant="outlined" size="small" sx={{ fontFamily: 'inherit', letterSpacing: 'inherit' }} onClick={onExit}>
          ← Back to Matrix
        </Button>
      </Box>
      
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
        {stories.map((story) => (
          <Card key={story.id} sx={{ aspectRatio: '1 / 1.2', borderRadius: 3, overflow: 'hidden' }}>
            <CardActionArea onClick={() => handleStorySelect(story)} sx={{ height: '100%' }}>
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1,
                fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', 
                letterSpacing: '0.06em' 
              }}>
                <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>{story.title}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'inherit' }}>
                  {story.description}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6, fontFamily: 'inherit' }}>
                  {story.pages} pages
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={getPageImage(story, 1)}
                    alt={`${story.title} preview`}
                    style={{
                      width: '80%',
                      height: '80%',
                      objectFit: 'cover',
                      borderRadius: 8,
                      opacity: 0.8
                    }}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default StoriesHub;
