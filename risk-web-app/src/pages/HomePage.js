import React, { useState } from 'react';
import Hero from '../components/hero';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import IconCard from '../components/Iconcard';
import InfoIcon from '@mui/icons-material/Info';
import Container from '@mui/material/Container';
import { AccessAlarm, ThreeDRotation, AirplanemodeActive, ThumbUp } from '@mui/icons-material';


const features = [
  // {
  //   id: 1, 
  //   title: 'About Our Project',
  //   description: 'MSDS and VM',
  //   detail: 'Our MSDS capstone team partnered with Virginia Mason Franciscan Health to develop a model that will help surgeons better align outcomes with patient expecations.'
  // },
  {
    id: 1,
    title: 'Risk Score Calculation',
    description: 'Improve patient satisfaction and align physican and patient expecations',
    detail: 'Risk Scores for patients encapsulate a patients tendency to take risk in the spinal surgery domain, which provides valuable insight on their internal decision making process.'
  },
  {
    id: 2,
    title: 'Data Driven Decision Making',
    description: 'Risk Score Prediction Models',
    detail: 'Machine learning models can be used to predict patient risk scores from demographics, aiding physicians in providing the most personalized surgery options.'
  },
];

function FeaturesSection() {
  const [selectedFeatureDetail, setSelectedFeatureDetail] = useState("");

  return (
    <div style={{ padding: '40px', backgroundColor: '#0B6889' }}>
      <Hero />
      <Typography variant="h2" gutterBottom style={{ textAlign: 'center', color: 'white' }}>
        Core Features
      </Typography>
      <Grid container spacing={4} justify="center">
        {features.map((feature) => (
          <Grid item key={feature.id} xs={12} sm={6} md={6}>
            <Card style={{ cursor: 'pointer' }} onClick={() => setSelectedFeatureDetail(feature.detail)}>
              <CardContent>
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
      {selectedFeatureDetail && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'white', color: '#000', textAlign: 'center' }}>
          <Typography variant="body1">{selectedFeatureDetail}</Typography>
        </div>
      )}
    </div>
  );
}

export default FeaturesSection;
