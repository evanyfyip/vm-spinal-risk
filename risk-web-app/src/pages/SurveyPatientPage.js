import {React, useCallback, useState, useRef } from 'react';

import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import axios from 'axios';

const surveyJson = {
  pages: [
    // INTRO PAGE
    {
      elements: [{
        type: "html",
        html: "<h4>In this preoperation survey, we will ask you questions pertaining to your ODI and personality.</h4>"
      }]
    }, 
    // PAGE 1 DEMOGRAPHICS 
    {
      elements: [
        {
          type:"html",
          html: "<h4>Do we need a demographics page???</h4>"
        }
      ]
    },
    // PAGE 2 ODI
    {
      elements: [
        {
          type:"html",
          html: "<h4>The next 10 questions will ask questions about how your back pain (If you have any) has affected your ability to manage everyday life.</h4>"
        },
        {
          name: "odi_1",
          title: "PAIN INTENSITY",
          type: "radiogroup",
          choices: [
            { value: 6, text: "I can tollerate..." },
            { value: 5, text: "The pain is bad..." },
            { value: 4, text: "Pain killers give complete..." },
            { value: 3, text: "Pain killers give moderate..." },
            { value: 2, text: "Pain killers give very little..." },
            { value: 1, text: "Pain killers have no effect..." }
          ],
          isRequired: true
        }
      ]
    },
    // PAGE 3 DOSPERT
    {
      elements: [
        {
          type:"html",
          html: "<h4>In the next 30 questions, you will assess the likelihood of your engagement in various activities,\
           covering areas such as financial decisions, health/safety, recreational pursuits, ethical choices, and social decisions.</h4>"
        },
        {
          name: "dospert_1",
          title: "Admitting that your tastes are different from those of a friend.",
          type: "radiogroup",
          choices: [
            { value: 7, text: "Extremely likely" },
            { value: 6, text: "Moderately likely" },
            { value: 5, text: "Somewhat likely" },
            { value: 4, text: "Not sure" },
            { value: 3, text: "Somewhat unlikely" },
            { value: 2, text: "Moderately unlikely" },
            { value: 1, text: "Extremely unlikely" }
          ],
          isRequired: true
        }
      ]
    },
    // PAGE 4 HAND SURVEY TO SURGEON
    {
      elements: [
        {
          type:"html",
          html: "<h4>Please hand device over to surgeon.</h4>"
        }
      ]
    },
    // PAGE 5 SURGEON INPUT
    {
      elements: [
        {
          name: "percent_improvement",
          title: "What percentage of improvement?",
          type: "radiogroup",
          choices: [
            { value: 90, text: "90%" },
            { value: 50, text: "50%" },
            { value: 10, text: "10%" }
          ],
          isRequired: true
        },
        {
          name: "percent_complication",
          title: "What percentage of complication?",
          type: "radiogroup",
          choices: [
            { value: 90, text: "90%" },
            { value: 50, text: "50%" },
            { value: 10, text: "10%" }
          ],
          isRequired: true
        }
      ]
    }
  ],
  showQuestionNumbers: "on",
  pageNextText: "Next",
  completeText: "Submit",
  showPrevButton: true,
  firstPageIsStarted: true,
  startSurveyText: "Take the Survey",
  showProgressBar: "top",
  showCompletedPage: false
};

function SurveyPatientPage() {
  const survey = useRef(new Model(surveyJson)).current;
  const [surveyResults, setSurveyResults] = useState("");
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

  const sendSurveyResult = (data) => {
    axios.post('/survey/predict', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error submitting survey:', error);
      });
  };

  const displayResults = useCallback((sender) => {
    setSurveyResults(JSON.stringify(sender.data, null, 4));
    sendSurveyResult(sender.data)
    setIsSurveyCompleted(true);
  }, []);

  survey.onComplete.add(displayResults);

  return (
    <>
      <Survey model={survey} id="surveyContainer" />
      {isSurveyCompleted && (
        <>
          <h1>AFTER THIS QUESTION, SEND RESULTS TO MODEL THROUGH API POST REQUEST AND DISPLAY RESULTS PAGE WITH VISUALS</h1>
          <p>Result JSON:</p>
          <code style={{ whiteSpace: 'pre' }}>
            {surveyResults}
          </code>
        </>
        )
      }
    </>
  );
}

export default SurveyPatientPage;