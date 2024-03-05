import React, { useState } from 'react';
import Hero from '../components/hero';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import QuestionsHero from '../components/questionsHero';
import FunctionsIcon from '@mui/icons-material/Functions';
import BarChartIcon from '@mui/icons-material/BarChart';
import IconCard from '../components/Iconcard';
import InfoIcon from '@mui/icons-material/Info';
import Container from '@mui/material/Container';


const features = [
  {
    id: 1,
    title: 'About Our Project',
    icon:FunctionsIcon,
    description: 'Our MSDS capstone team partnered with Virginia Mason Franciscan Health to develop a model that will help surgeons better align outcomes with patient expecations.',
    detail: 'A'
  },
  {
    id: 2,
    title: 'Risk Score Calculation',
    icon:FunctionsIcon,
    description: 'Risk Scores for patients encapsulate a patients tendency to take risk in the spinal surgery domain, which provides valuable insight on their internal decision making process.',
    detail: 'A'
  },
  {
    id: 3,
    title: 'Data Driven',
    icon:BarChartIcon,
    description: 'Machine learning models can be used to predict patient risk scores from demographics, aiding physicians in providing the most personalized surgery options.',
    detail: 'A'
  },
];

function FeaturesSection() {

  return (
    <div>
      <div style={{ padding: '40px', backgroundColor: '#FFFFFF' }}>
        <Hero />
      </div>
      <div style={{ padding: '40px', marginBottom:'10px',backgroundColor: '#cdb4db' }}> 
        <Typography variant="h2" gutterBottom style={{ textAlign: 'center', color: 'white' }}>
          Core Features
        </Typography>
        <Grid container spacing={4} justify="center">
          {features.map((feature) => (
            <Grid item key={feature.id} xs={12} sm={6} md={4} >
              <Card style={{ display: 'flex', flexDirection: 'column', height: '350px' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                {feature.id === 1 ? (
                    <>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={'/uwlogo.png'} alt="uw image" style={{ width: '100px', marginBottom: '10px' }} />
                      <img src={'/virginiamason.png'} alt="vm image" style={{ width: '100px', marginBottom: '10px' }} />
                    </div>
                    </>
                  ) : (
                    feature.id === 2 || feature.id === 3 ? (
                        <feature.icon style={{ width: '100px', height: '100px'}} />
                    ) : (
                      <feature.icon style={{ width: '100px', height: '100px' }} />
                    )

                  )}
                  <Typography variant="h5" component="h2" style={{ color: '#42c333' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div style={{ padding: '40px', backgroundColor: '#FFFFFF' }}>
        <QuestionsHero></QuestionsHero>
        </div>
    </div>
  );
}


export default FeaturesSection;
