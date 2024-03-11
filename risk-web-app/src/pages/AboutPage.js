import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

function AboutPage() {
    return (
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={9} lg={9}> 
              <Box sx={{ marginY: 4 }}> 
              <Typography variant="h3" gutterBottom align="left">
                Risk Assessment Machine Learning Model to Improve Personalized Medicine in Spinal Surgery
                </Typography>
                <Typography variant="body1" gutterBottom style={{marginBottom:'20px'}}>
                  The goal of this project was to help spinal surgeons better understand how to assess a patients tendency
                  to take risk in minimally invasive spine surgery. This tool was designed to provide insight on a patients risk and
                  also predict how likely a patient would take a surgery with specific complication and improvement rates. This is
                  the start of an ongoing project, and we (the MSDS Capstone team) hopes that this will be the framework for significant
                  progress in the future as we hand off the project to Virginia Mason Franciscan Health.
                </Typography>
                <Typography variant="body1" gutterBottom style={{marginBottom:'20px'}}>
                  
                </Typography>
              {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img
                src="/mq_pic.jpeg"
                alt="Description of image 1"
                style={{ width: '25%', height: 'auto', marginRight: '5px', borderRadius:25 }}
                />
                <img
                src="/mq_pic.jpeg"
                alt="Description of image 1"
                style={{ width: '25%', height: 'auto', marginRight: '5px' }}
                />
                <img
                src="/mq_pic.jpeg"
                alt="Description of image 1"
                style={{ width: '25%', height: 'auto', marginRight: '5px' }}
                />
                <img
                src="/mq_pic.jpeg"
                alt="Description of image 1"
                style={{ width: '25%', height: 'auto', marginRight: '5px' }}
                />
               </div> */}
                <Typography variant="h3" gutterBottom align="left">
                  Frequently Asked Questions
                </Typography>
                <Typography variant="body1" gutterBottom style={{marginBottom:'20px'}}>
                  This section is dedicated towards answering some more detailed technical questions about this project, 
                  ranging from data collection, feature selection, model selection, and model performance. 
                </Typography>
                <Typography variant="h5" gutterBottom align="left">
                  How was the data collected?
                </Typography>
                <img src={'/cloudresearch.png'} alt="cloudresearch" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <Typography variant="body1" gutterBottom align="left">
                  Data was collected from survey responses using CloudResarch, a data crowdsourcing platform. Adjustments were
                  made to ensure that features were roughly balanced and data was collected to obtain a rough sample of the U.S
                  Census distribution. 
                </Typography>
                <Typography variant="h5" gutterBottom align="left">
                  How exactly is risk score calculated?
                </Typography>
                <img src={'/spinalrisk.png'} alt="cloudresearch" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <Typography variant="body1" gutterBottom align="left" style={{marginBottom:'20px'}}>
                Risk score was calculated for each patient as a summation of survey responses using variables from each risk 
                scenario question. These variables include the percentage of complication, percentage of improvement, 
                choice on a likert scale, and the weight of complication/improvement. 
                Complication weights were calculated by finding the slope of the weighted average response 
                against the complication and improvement rate. The slope (weighted average response/complication rate) 
                represents how the response of the cohort shifts from a one percent increase in complication or improvement rate.
                For a more in depth explanation about risk score, refer to our documentation. 
                </Typography>

                <Typography variant="h5" gutterBottom align="left">
                What was the process of training models?
                </Typography>
                <Typography variant="body1" gutterBottom align="left" style={{marginBottom:'20px'}}>
                Using features such as demographics, risk behavior, pain tolerance and personality, 
                this model predicts the spinal risk score of a potential spine surgery patient.

                We tuned, validated and tested 1,200 models including regularized linear regression, 
                decision tree, and neural network models before landing on a Lasso regression model.
                </Typography>

                <Typography variant="h5" gutterBottom align="left">
                How was the final model selected?
                </Typography>
                <Typography variant="body1" gutterBottom align="left" style={{marginBottom:'20px'}}>
                The choice model uses the same features as the risk score model along with the risk of improvement/complication 
                and the type of improvement/complication of a spinal surgery scenario to predict a patient’s probability of opting 
                to undergo the spinal surgery.
                After performing similar testing as the risk score model, we landed on an XGBoost regression model that 
                predicts a patient’s likelihood of opting for surgery given a surgical scenario.

                The risk score and choice models together can help a surgeon provide personalized surgery recommendations 
                to patients by both assessing the patient’s willingness to take on risk and their likelihood of 
                agreeing to the benefits and risks of  a surgical scenario.

                </Typography>

              </Box>
            </Grid>
          </Grid>
        </Container>
      );
}

export default AboutPage;