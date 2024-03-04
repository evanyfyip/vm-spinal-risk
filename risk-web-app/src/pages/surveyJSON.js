export const surveyJson = {
    pages: [
        // INTRO PAGE
        {
            elements: [
                {
                    type: "html",
                    html: "<h4>In this preoperation survey, we will ask you questions pertaining to your ODI and personality.</h4>"
                },
                {
                    name: "test_question",
                    title: "Use test result?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "yes" },
                        { value: 0, text: "no" }
                    ],
                    isRequired: true
                }
            ]
        },
        // PAGE 1 DEMOGRAPHICS 
        {
            elements: [
                {
                    type: "html",
                    html: "<h4>Demographics page will go here</h4>"
                },
                {
                    name: "age",
                    title: "What is your age in years?",
                    type: "text",
                    inputType: "number",
                    min: 0,
                    max: 120,
                    isRequired: true
                },
                {
                    name: "sex",
                    title: "Which sex were you assigned at birth?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "Male" },
                        { value: 2, text: "Female" },
                        { value: 3, text: "Intersex" },
                        { value: 4, text: "Prefer not to say" }
                    ],
                    isRequired: true
                },
                {
                    name: "height",
                    title: "What is your height?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "Shorter than 4'0\" (four feet) - Less than 121.92 cm" },
                        { value: 2, text: "4'1\" (four feet, one inch) - 124.46 cm" },
                        { value: 3, text: "4'2\" (four feet, two inches) - 126.99 cm" },
                        { value: 4, text: "4'3\" (four feet, three inches) - 129.54 cm" },
                        { value: 5, text: "4'4\" (four feet, four inches) - 132.08 cm" },
                        { value: 6, text: "4'5\" (four feet, five inches) - 134.62 cm" },
                        { value: 7, text: "4'6\" (four feet, six inches) - 137.16 cm" },
                        { value: 8, text: "4'7\" (four feet, seven inches) - 139.70 cm" },
                        { value: 9, text: "4'8\" (four feet, eight inches) - 142.24 cm" },
                        { value: 10, text: "4'9\" (four feet, nine inches) - 144.78 cm" },
                        { value: 11, text: "4'10\" (four feet, ten inches) - 147.32 cm" },
                        { value: 12, text: "4'11\" (four feet, eleven inches) - 149.86 cm" },
                        { value: 13, text: "5'0\" (five feet) - 152.40 cm" },
                        { value: 14, text: "5'1\" (five feet, one inch) - 154.94 cm" },
                        { value: 15, text: "5'2\" (five feet, two inches) - 157.48 cm" },
                        { value: 16, text: "5'3\" (five feet, three inches) - 160.02 cm" },
                        { value: 17, text: "5'4\" (five feet, four inches) - 162.56 cm" },
                        { value: 18, text: "5'5\" (five feet, five inches) - 165.10 cm" },
                        { value: 19, text: "5'6\" (five feet, six inches) - 167.64 cm" },
                        { value: 20, text: "5'7\" (five feet, seven inches) - 170.18 cm" },
                        { value: 21, text: "5'8\" (five feet, eight inches) - 172.72 cm" },
                        { value: 22, text: "5'9\" (five feet, nine inches) - 175.26 cm" },
                        { value: 23, text: "5'10\" (five feet, ten inches) - 177.80 cm" },
                        { value: 24, text: "5'11\" (five feet, eleven inches) - 180.34 cm" },
                        { value: 25, text: "6'0\" (six feet) - 182.88 cm" },
                        { value: 26, text: "6'1\" (six feet, one inch) - 185.42 cm" },
                        { value: 27, text: "6'2\" (six feet, two inches) - 187.96 cm" },
                        { value: 28, text: "6'3\" (six feet, three inches) - 190.50 cm" },
                        { value: 29, text: "6'4\" (six feet, four inches) - 193.04 cm" },
                        { value: 30, text: "6'5\" (six feet, five inches) - 195.58 cm" },
                        { value: 31, text: "6'6\" (six feet, six inches) - 198.12 cm" },
                        { value: 32, text: "6'7\" (six feet, seven inches) - 200.66 cm" },
                        { value: 33, text: "6'8\" (six feet, eight inches) - 203.20 cm" },
                        { value: 34, text: "6'9\" (six feet, nine inches) - 205.74 cm" },
                        { value: 35, text: "6'10\" (six feet, ten inches) - 208.28 cm" },
                        { value: 36, text: "6'11\" (six feet, eleven inches) - 210.82 cm" },
                        { value: 37, text: "7'0\" (seven feet) - 213.36 cm" },
                        { value: 38, text: "Taller than 7'0\" (seven feet) - More than 213.36 cm" }
                    ],
                    isRequired: true
                },
                {
                    name: "weight",
                    title: "What is your weight in pounds?",
                    type: "text",
                    inputType: "number",
                    min: 0,
                    max: 400,
                    isRequired: true
                },
                {
                    name: "zipcode",
                    title: "What is your zipcode?",
                    type: "text",
                    isRequired: true
                },
                {
                    name: "ethnicity",
                    title: "Which racial group do you belong to?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "White" },
                        { value: 2, text: "Black or African American" },
                        { value: 3, text: "American Indian or Alaska Native" },
                        { value: 4, text: "Asian or Pacific Islander" },
                        { value: 5, text: "Hispanic, Latino, or Spanish origin" },
                        { value: 6, text: "An ethnicity not listed here" },
                        { value: 7, text: "Prefer not to say" }
                    ],
                    isRequired: true
                },
                {
                    name: "income",
                    title: "What was your personal income last year?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "Less than $10,000" },
                        { value: 2, text: "$10,000-19,999" },
                        { value: 3, text: "$20,000-29,999" },
                        { value: 4, text: "$30,000-39,999" },
                        { value: 5, text: "$40,000-49,999" },
                        { value: 6, text: "$50,000-59,999" },
                        { value: 7, text: "$60,000-69,999" },
                        { value: 8, text: "$70,000-79,999" },
                        { value: 9, text: "$80,000-89,999" },
                        { value: 10, text: "$90,000-99,999" },
                        { value: 11, text: "$100,000-$124,999" },
                        { value: 12, text: "$125,000-$149,999" },
                        { value: 13, text: "$150,000-$174,999" },
                        { value: 14, text: "$175,000-$199,999" },
                        { value: 15, text: "$200,000-$224,999" },
                        { value: 16, text: "$225,000-$249,999" },
                        { value: 17, text: "$250,000 or more" },
                        { value: 18, text: "Prefer not to say" }
                    ],
                    isRequired: true
                },
                {
                    name: "education",
                    title: "What is the highest level of education you have completed?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "No formal education" },
                        { value: 2, text: "Less than a high school diploma" },
                        { value: 3, text: "High school graduate - high school diploma or equivalent (example: GED)" },
                        { value: 4, text: "Some college, but no degree" },
                        { value: 5, text: "Associate degree (example: AA, AS)" },
                        { value: 6, text: "Bachelor's degree (example: BA, AB, BS)" },
                        { value: 7, text: "Master's degree (example: MA, MS, MEng, MEd, MSW, MBA)" },
                        { value: 8, text: "Professional degree (example: MD, DDS, DVM, LLB, JD)" },
                        { value: 9, text: "Doctorate degree (example: PhD, EdD)" },
                        { value: 10, text: "Prefer not to say" }
                    ],
                    isRequired: true
                },
                {
                    name: "prior_surg",
                    title: "Have you ever had surgery before?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "yes" },
                        { value: 0, text: "no" }
                    ],
                    isRequired: true
                },
                {
                    name: "spin_surg",
                    title: "Was your surgery in the spine?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "yes" },
                        { value: 0, text: "no" }
                    ],
                    visibleIf: "{prior_surg} = 1",
                    isRequired: true
                },
                {
                    name: "succ_surg",
                    title: "Was your surgery overall successful?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "yes" },
                        { value: 0, text: "no" }
                    ],
                    visibleIf: "{prior_surg} = 1",
                    isRequired: true
                },
                {
                    name: "religion",
                    title: "Which religion best describes your religious beliefs/practice?",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "Agnostic" },
                        { value: 2, text: "Atheist" },
                        { value: 3, text: "Baha'i" },
                        { value: 4, text: "Buddhism" },
                        { value: 5, text: "Catholic" },
                        { value: 6, text: "Confucianism" },
                        { value: 7, text: "Hinduism" },
                        { value: 8, text: "Islam" },
                        { value: 9, text: "Judaism" },
                        { value: 10, text: "Protestant" },
                        { value: 11, text: "Shinto" },
                        { value: 12, text: "Sikhism" },
                        { value: 13, text: "Taoism" },
                        { value: 14, text: "Spiritual" },
                        { value: 15, text: "None" },
                        { value: 16, text: "Other" }
                    ],
                    isRequired: true
                },
            ],
            visibleIf: "{test_question} = 0"
        },
        // PAGE 2 ODI
        {
            elements: [
                {
                    type: "html",
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
            ],
            visibleIf: "{test_question} = 0"
        },
        // PAGE 3 DOSPERT
        {
            elements: [
                {
                    type: "html",
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
            ],
            visibleIf: "{test_question} = 0"
        },
        // PAGE 4 HAND SURVEY TO SURGEON
        {
            elements: [
                {
                    type: "html",
                    html: "<h4>Please hand device over to surgeon.</h4>"
                }
            ],
            visibleIf: "{test_question} = 0"
        },
        // PAGE 5 SURGEON INPUT
        {
            elements: [
                {
                    name: "type_improvement",
                    title: "What type of improvement?",
                    type: "radiogroup",
                    choices: [
                        { value: 0, text: "Exercise" },
                        { value: 1, text: "Work" }
                    ],
                    isRequired: true
                },
                {
                    name: "percent_improvement",
                    title: "What percentage of improvement?",
                    type: "radiogroup",
                    choices: [
                        { value: 90, text: "90%" },
                        { value: 50, text: "50%" }
                    ],
                    isRequired: true
                },
                {
                    name: "type_complication",
                    title: "What type of complication?",
                    type: "radiogroup",
                    choices: [
                        { value: 0, text: "Foot Drop" },
                        { value: 1, text: "Paralysis" },
                        { value: 2, text: "Death" }
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
                        { value: 10, text: "10%" },
                        { value: 1, text: "1%" }
                    ],
                    isRequired: true
                }
            ],
            visibleIf: "{test_question} = 0"
        }
    ],
    showQuestionNumbers: "on",
    pageNextText: "Next",
    completeText: "Submit",
    showPrevButton: true,
    // firstPageIsStarted: true,
    startSurveyText: "Take the Survey",
    showProgressBar: "top",
    showCompletedPage: false
};