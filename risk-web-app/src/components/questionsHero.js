import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

function QuestionsHero() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Box
      sx={{
        padding: '50px 20px',
        backgroundImage: 'url(YourBackgroundImageUrl)',
        backgroundSize: 'cover',
        color: '#3a0ca3',
        textAlign: 'center',
      }}
    >
          <Typography variant="h3" component="h1" gutterBottom>
            Have questions about the project?
          </Typography>
          <Typography variant="body1" paragraph>
            Check out the about page for more details
          </Typography>
          <Button variant="contained" component={RouterLink} to="/about" style={{ backgroundColor: '#3a0ca3', 
                                                color: '#fff', 
                                                borderRadius: '20px', 
                                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                                 }} onClick={handleClick}>
            Learn More
          </Button>
    </Box>

    
  );
}

export default QuestionsHero;