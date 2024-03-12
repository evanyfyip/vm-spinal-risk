import { React, useCallback, useState, useRef, Fragment } from 'react';

import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import axios from 'axios';
import { surveyJson } from "./surveyJSON";
import BoldNumbers from '../components/BoldNumbers';

function SurveyPage() {
  const survey = useRef(new Model(surveyJson)).current;
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const testSurveyResponse = {
    "test_question": 1, "age": 23, "sex": 1, "height": 17, "weight": 125, "zipcode": "98053", "ethnicity": 4, "income": 11, "education": 7, "prior_surg": 0, "religion": 2,
    "odi_1": 1, "odi_2": 1, "odi_3": 1, "odi_4": 1, "odi_5": 1, "odi_6": 1, "odi_7": 1, "odi_8": 1, "odi_9": 1, "odi_10": 1,
    "dospert1": 7, "dospert2": 7, "dospert3": 1, "dospert4": 5, "dospert5": 2, "dospert6": 1, "dospert7": 5, "dospert8": 1, "dospert9": 1, "dospert10": 1, "dospert11": 6, "dospert12": 2, "dospert13": 2, "dospert14": 1, "dospert15": 2, "dospert16": 3, "dospert17": 1, "dospert18": 1, "dospert19": 7, "dospert20": 1, "dospert21": 3, "dospert22": 5, "dospert23": 2, "dospert24": 2, "dospert25": 2, "dospert26": 2, "dospert27": 3, "dospert28": 4, "dospert29": 1, "dospert30": 1,
    "activity": 1, "pct_improv": 50, "comp": 2, "pct_comp": 90
  }
  const [demoPlot, setDemoPlot] = useState('');
  const [choiceShapPlot, setChoiceShapPlot] = useState('');
  const [riskShapPlot, setRiskShapPlot] = useState('');
  const [messageOutput, setMessageOutput] = useState('');

  // send the survey result to te backend endpoint
  const sendSurveyResult = (data) => {
    axios.post('/survey', data)
      .then(response => {
        setDemoPlot(`data:image/png;base64,${response.data.demo_plot}`);
        setChoiceShapPlot(`data:image/png;base64,${response.data.choice_plot}`);
        setRiskShapPlot(`data:image/png;base64,${response.data.risk_plot}`);
        setMessageOutput(response.data.message)
      })
      .catch(error => {
        console.error('Axios error:', error);
      });
  };

  // set survey results variable, call sendSurveyResult, and set surveyCompleted to true
  const displayResults = useCallback((sender) => {
    if (sender.data["test_question"] === 1) {
      sendSurveyResult(testSurveyResponse)
    } else {
      sendSurveyResult(sender.data)
    }
    setIsSurveyCompleted(true);
  }, []);

  survey.onComplete.add(displayResults);

  return (
    <>
      <Survey model={survey} id="surveyContainer" />
      {isSurveyCompleted && (
        <>
          <Fragment>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
              <h1>Model Results:</h1>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60vw', margin: 0 }}><BoldNumbers constructedString={messageOutput} /></div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60vw', margin: 0 , paddingTop: '10px', paddingBottom: '10px'}}></div>
            </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60vw'}}>{demoPlot && <img src={demoPlot} alt="Demographics Plot" />}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60vw' }}>{choiceShapPlot && <img src={choiceShapPlot} alt="Choice Model SHAP Values Plot" />}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60vw' }}>{riskShapPlot && <img src={riskShapPlot} alt="Risk Model SHAP Values Plot" />}</div>
            </div>
          </Fragment>
        </>
      )
      }
    </>
  );
}

export default SurveyPage;