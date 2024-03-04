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
  const testSurveyResponse = {
    "test_question": 1,
    "age": 23,
    "sex": 1,
    "height": 17,
    "weight": 125,
    "zipcode": "98053",
    "ethnicity": 4,
    "income": 11,
    "education": 7,
    "prior_surg": 0,
    "religion": 2,
    "odi_1": 1,
    "odi_2": 1,
    "odi_3": 1,
    "odi_4": 1,
    "odi_5": 1,
    "odi_6": 1,
    "odi_7": 1,
    "odi_8": 1,
    "odi_9": 1,
    "odi_10": 1,
    "dospert_1": 7,
    "dospert_2": 7,
    "dospert_3": 1,
    "dospert_4": 5,
    "dospert_5": 2,
    "dospert_6": 1,
    "dospert_7": 5,
    "dospert_8": 1,
    "dospert_9": 1,
    "dospert_10": 1,
    "dospert_11": 6,
    "dospert_12": 2,
    "dospert_13": 2,
    "dospert_14": 1,
    "dospert_15": 2,
    "dospert_16": 3,
    "dospert_17": 1,
    "dospert_18": 1,
    "dospert_19": 7,
    "dospert_20": 1,
    "dospert_21": 3,
    "dospert_22": 5,
    "dospert_23": 2,
    "dospert_24": 2,
    "dospert_25": 2,
    "dospert_26": 2,
    "dospert_27": 3,
    "dospert_28": 4,
    "dospert_29": 1,
    "dospert_30": 1,
    "type_improvement": 0,
    "percent_improvement": 50,
    "type_complication": 1,
    "percent_complication": 50
}

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