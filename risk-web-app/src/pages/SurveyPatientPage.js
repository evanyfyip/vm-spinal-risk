import { React, useCallback, useState, useRef, Fragment } from 'react';

import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import axios from 'axios';
import { surveyJson } from "./surveyJSON";

function SurveyPatientPage() {
  const survey = useRef(new Model(surveyJson)).current;
  const [surveyResults, setSurveyResults] = useState("");
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const testSurveyResponse = {
    "test_question": 1, "age": 23, "sex": 1, "height": 17, "weight": 56.699, "zipcode": "98053", "ethnicity": 4, "income": 11, "education": 7, "prior_surg": 0, "religion": 2,
    "odi_1": 1, "odi_2": 1, "odi_3": 1, "odi_4": 1, "odi_5": 1, "odi_6": 1, "odi_7": 1, "odi_8": 1, "odi_9": 1, "odi_10": 1,
    "dospert1": 7, "dospert2": 7, "dospert3": 1, "dospert4": 5, "dospert5": 2, "dospert6": 1, "dospert7": 5, "dospert8": 1, "dospert9": 1, "dospert10": 1, "dospert11": 6, "dospert12": 2, "dospert13": 2, "dospert14": 1, "dospert15": 2, "dospert16": 3, "dospert17": 1, "dospert18": 1, "dospert19": 7, "dospert20": 1, "dospert21": 3, "dospert22": 5, "dospert23": 2, "dospert24": 2, "dospert25": 2, "dospert26": 2, "dospert27": 3, "dospert28": 4, "dospert29": 1, "dospert30": 1,
    "activity": 0, "pct_improv": 50, "comp": 1, "pct_comp": 50
  }
  const [demoPlot, setDemoPlot] = useState('');
  const [choiceShapPlot, setChoiceShapPlot] = useState('');
  const [riskShapPlot, setRiskShapPlot] = useState('');
  const [predChoice, setPredChoice] = useState('');
  const [predRisk, setPredRisk] = useState('');

  // send the survey result to te backend endpoint
  const sendSurveyResult = (data) => {
    axios.post('/survey/predict', data)
      .then(response => {
        setDemoPlot(`data:image/png;base64,${response.data.demo_plot}`);
        setChoiceShapPlot(`data:image/png;base64,${response.data.choice_plot}`);
        setRiskShapPlot(`data:image/png;base64,${response.data.risk_plot}`);
        // setPredChoice(data.pred_choice)
        // setPredRisk(data.pred_risk)
      })
      .catch(error => {
        console.error('Axios error:', error);
      });
  };

  // set survey results variable, call sendSurveyResult, and set surveyCompleted to true
  const displayResults = useCallback((sender) => {
    if (sender.data["test_question"] == 1) {
      setSurveyResults(JSON.stringify(testSurveyResponse, null, 4));
      sendSurveyResult(testSurveyResponse)
    } else {
      setSurveyResults(JSON.stringify(sender.data, null, 4));
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
          {/* The patient has a {predChoice} percent chance to proceed with surgery. The patient has a risk score of {predRisk}. */}
          <Fragment>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{demoPlot && <img src={demoPlot} alt="Demographics Plot" />}</div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{choiceShapPlot && <img src={choiceShapPlot} alt="Choice Model SHAP Values Plot" />}</div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{riskShapPlot && <img src={riskShapPlot} alt="Risk Model SHAP Values Plot" />}</div>
          </Fragment>
        </>
      )
      }
    </>
  );
}

export default SurveyPatientPage;