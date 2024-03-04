import {React, useCallback, useState, useRef } from 'react';

import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import axios from 'axios';
import { surveyJson } from "./surveyJSON";

function SurveyPatientPage() {
  const survey = useRef(new Model(surveyJson)).current;
  const [surveyResults, setSurveyResults] = useState("");
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const [modelPrediction, setModelPrediction] = useState("");
  const testSurveyResponse = {'test_question': -1, 'odi_1': -1, 'dospert_1': -1, 'type_improvement': -1, 'percent_improvement': -1, 'percent_complication': -1, 'type_complication': -1}
  const headers = {'Accept': 'application/json','Content-Type': 'application/json'}

  const sendSurveyResult = (data) => {
    axios.post('/survey/predict', data)
      .then(response => {
        setModelPrediction(JSON.stringify(response.data, null, 4));
      })
      .catch(error => {
        console.error('Error submitting survey:', error);
      });
  };

  const displayResults = useCallback((sender) => {
    if (sender.data["test_question"] == 1){
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
          <p>Survey Result sent to backend:</p>
          <code style={{ whiteSpace: 'pre' }}>
            {surveyResults}
          </code>

          <p>Model prediction received from backend:</p>
          <code style={{ whiteSpace: 'pre' }}>
            {modelPrediction}
          </code>
        </>
        )
      }
    </>
  );

  // const displayResults = useCallback((sender) => {
  //   if (sender.data["test_question"] == 1){
  //     setSurveyResults(JSON.stringify(testSurveyResponse, null, 4));
  //   } else {
  //     setSurveyResults(JSON.stringify(sender.data, null, 4));
  //   }
  //   sendSurveyResult(surveyResults)
  //   setIsSurveyCompleted(true);
  // }, []);

  // survey.onComplete.add(displayResults);

  // return (
  //   <>
  //     <Survey model={survey} id="surveyContainer" />
  //     {isSurveyCompleted && (
  //       <>
  //         <p>Sent to backend:</p>
  //         <code style={{ whiteSpace: 'pre' }}>
  //           {surveyResults}
  //         </code>
  //         <p>Prediction Result (received from backend):</p>
  //         <code style={{ whiteSpace: 'pre' }}>
  //           {modelPrediction}
  //         </code>
  //       </>
  //       )
  //     }
  //   </>
  // );
}

export default SurveyPatientPage;