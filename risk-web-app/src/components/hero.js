import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Button, Box } from '@mui/material';

function Hero() {
  return (
    <Box
      sx={{
        padding: '50px 20px',
        backgroundSize: 'cover',
        color: '#3a0ca3',
        textAlign: 'left',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            Aligning Personalized Care with Machine Learning
          </Typography>
          <Typography variant="body1" paragraph>
            Discover how our ML model is helping surgeons and patients better understand each other.
          </Typography>
          <Button variant="contained" component={RouterLink} to="/survey" style={{ backgroundColor: '#3a0ca3', 
                                                color: '#fff', 
                                                borderRadius: '20px', 
                                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                                 }}>
            Test It Out
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="healthcare.svg"
            alt="Picture of healthcare SVG"
            sx={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Hero;