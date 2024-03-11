export const surveyJson = {
    pages: [
        // INTRO PAGE
        {
            elements: [
                {
                    type: "html",
                    html: "<h4>In this preoperation survey, we will ask you questions pertaining to your demographics and personality.</h4>"
                },
                // TODO: remove this question for production
                {
                    name: "test_question",
                    title: "Would you like to bypass the survey and use a sample survey response?",
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
                    html: "<h4>The first 10 questions will ask about your current physical attributes like age, sex, height, weight and socioeconomic status.</h4>"
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
                        { value: 1, text: "I can tolerate any pain I have without having to use pain killers" },
                        { value: 2, text: "The pain is bad but I manage without taking pain killers" },
                        { value: 3, text: "Pain killers give complete relief from pain" },
                        { value: 4, text: "Pain killers give moderate relief from pain" },
                        { value: 5, text: "Pain killers give very little relief from pain" },
                        { value: 6, text: "Pain killers have no effect on the pain and I do not use them" }
                    ],
                    isRequired: true
                },
                {
                    name: "odi_2",
                    title: "PERSONAL CARE (e.g. Washing, Dressing)",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "I can look after myself normally without causing extra pain" },
                        { value: 2, text: "I can look after myself normally but it causes extra pain" },
                        { value: 3, text: "It is painful to look after myself and I am slow and careful" },
                        { value: 4, text: "I need some help but manage most of my personal care" },
                        { value: 5, text: "I need help every day in most aspects of self care I don't get dressed, I was with difficulty and stay in bed" }
                    ],
                    isRequired: true
                },
                {
                    name: "odi_3",
                    title: "LIFTING",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "I can lift heavy weights without extra pain" },
                        { value: 2, text: "I can lift heavy weights but it gives extra pain" },
                        { value: 3, text: "Pain prevents me from lifting heavy weights off the floor, but I can manage if they are conveniently positioned, i.e. on a table" },
                        { value: 4, text: "Pain prevents me from lifting heavy weights, but I can manage light to medium weights if they are conveniently positioned" },
                        { value: 5, text: "I can lift very light weights" },
                        { value: 6, text: "I cannot lift or carry anything at all" }
                    ],
                    isRequired: true
                },
                {
                    name: "odi_4",
                    title: "WALKING",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "Pain does not prevent me walking any distance" },
                        { value: 2, text: "Pain prevents me walking more than one mile" },
                        { value: 3, text: "Pain prevents me walking more than ½ mile" },
                        { value: 4, text: "Pain prevents me walking more than ¼ mile" },
                        { value: 5, text: "I can only walk using a stick or crutches" },
                        { value: 6, text: "I am in bed most of the time and have to crawl to the toilet" }
                    ],
                    isRequired: true
                },
                {
                    name: "odi_5",
                    title: "SITTING",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "I can sit in any chair as long as I like" },
                        { value: 2, text: "I can only sit in my favorite chair as long as I like" },
                        { value: 3, text: "Pain prevents me from sitting more than one hour" },
                        { value: 4, text: "Pain prevents me from sitting more than ½ hour" },
                        { value: 5, text: "Pain prevents me from sitting more than 10 minutes" },
                        { value: 6, text: "Pain prevents me from sitting at all" }
                    ],
                    isRequired: true
                },
                {
                    name: "odi_6",
                    title: "STANDING",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "I can stand as long as I want without extra pain" },
                        { value: 2, text: "I can stand as long as I want but it gives me extra pain" },
                        { value: 3, text: "Pain prevents me from standing for more than one hour" },
                        { value: 4, text: "Pain prevents me from standing for more than 30 minutes" },
                        { value: 5, text: "Pain prevents me from standing for more than 10 minutes" },
                        { value: 6, text: "Pain prevents me from standing at all" },
                    ],
                    isRequired: true
                },
                {
                    name: "odi_7",
                    title: "SLEEPING",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "Pain does not prevent me from sleeping well" },
                        { value: 2, text: "I can sleep well only by using medication" },
                        { value: 3, text: "Even when I take medication, I have less than 6 hrs sleep" },
                        { value: 4, text: "Even when I take medication, I have less than 4 hrs sleep" },
                        { value: 5, text: "Even when I take medication, I have less than 2 hrs sleep" },
                        { value: 6, text: "Pain prevents me from sleeping at all" }
                    ],
                    isRequired: true
                },
                {
                    name: "odi_8",
                    title: "SOCIAL LIFE",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "My social life is normal and gives me no extra pain" },
                        { value: 2, text: "My social life is normal but increases the degree of pain" },
                        { value: 3, text: "Pain has no significant effect on my social life apart from limiting my more energetic interests, i.e. dancing,etc." },
                        { value: 4, text: "Pain has restricted my social life and I do not go out as often" },
                        { value: 5, text: "Pain has restricted my social life to my home" },
                        { value: 6, text: "I have no social life because of pain" }
                    ],
                    isRequired: true
                },
                {
                    name: "odi_9",
                    title: "TRAVELLING",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "I can travel anywhere without extra pain" },
                        { value: 2, text: "I can travel anywhere but it gives me extra pain" },
                        { value: 3, text: "Pain is bad, but I manage journeys over 2 hours" },
                        { value: 4, text: "Pain restricts me to journeys of less than 1 hour" },
                        { value: 5, text: "Pain restricts me to short necessary journeys under 30 minutes" },
                        { value: 6, text: "Pain prevents me from traveling except to the doctor or hospital" }
                    ],
                    isRequired: true
                },
                {
                    name: "odi_10",
                    title: "EMPLOYMENT/ HOMEMAKING",
                    type: "radiogroup",
                    choices: [
                        { value: 1, text: "My normal homemaking/ job activities do not cause pain." },
                        { value: 2, text: "My normal homemaking/ job activities increase my pain, but I can still perform all that is required of me." },
                        { value: 3, text: "I can perform most of my homemaking/ job duties, but pain prevents me from performing more physicallystressful activities (e.g. lifting, vacuuming)" },
                        { value: 4, text: "Pain prevents me from doing anything but light duties." },
                        { value: 5, text: "Pain prevents me from doing even light duties." },
                        { value: 6, text: "Pain prevents me from performing any job or homemaking chores" }
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
                    name: "dospert1",
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
                },
                {
                    name: "dospert2",
                    title: "Going camping in the wilderness.",
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
                },
                {
                    name: "dospert3",
                    title: "Betting a day's income at the horse races.",
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
                },
                {
                    name: "dospert4",
                    title: "Investing 10% of your annual income in a moderate growth mutual fund.",
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
                },
                {
                    name: "dospert5",
                    title: "Drinking heavily at a social function.",
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
                },
                {
                    name: "dospert6",
                    title: "Taking some questionable deductions on your income tax return.",
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
                },
                {
                    name: "dospert7",
                    title: "Disagreeing with an authority figure on a major issue.",
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
                },
                {
                    name: "dospert8",
                    title: "Betting a day's income at a high-stake poker game.",
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
                },
                {
                    name: "dospert9",
                    title: "Having an affair with a married man/woman.",
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
                },
                {
                    name: "dospert10",
                    title: "Passing off somebody else's work as your own.",
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
                },
                {
                    name: "dospert11",
                    title: "Going down a ski run that is beyond your ability.",
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
                },
                {
                    name: "dospert12",
                    title: "Investing 5% of your annual income in a very speculative stock.",
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
                },
                {
                    name: "dospert13",
                    title: "Going whitewater rafting at high water in the spring.",
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
                },
                {
                    name: "dospert14",
                    title: "Betting a day's income on the outcome of a sporting event",
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
                },
                {
                    name: "dospert15",
                    title: "Engaging in unprotected sex.",
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
                },
                {
                    name: "dospert16",
                    title: "Revealing a friend's secret to someone else.",
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
                },
                {
                    name: "dospert17",
                    title: "Driving a car without wearing a seat belt.",
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
                },
                {
                    name: "dospert18",
                    title: "Investing 10% of your annual income in a new business venture.",
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
                },
                {
                    name: "dospert19",
                    title: "Taking a skydiving class.",
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
                },
                {
                    name: "dospert20",
                    title: "Riding a motorcycle without a helmet.",
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
                },
                {
                    name: "dospert21",
                    title: "Choosing a career that you truly enjoy over a more secure one.",
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
                },
                {
                    name: "dospert22",
                    title: "Speaking your mind about an unpopular issue in a meeting at work.",
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
                },
                {
                    name: "dospert23",
                    title: "Sunbathing without sunscreen.",
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
                },
                {
                    name: "dospert24",
                    title: "Bungee jumping off a tall bridge.",
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
                },
                {
                    name: "dospert25",
                    title: "Piloting a small plane.",
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
                },
                {
                    name: "dospert26",
                    title: "Walking home alone at night in an unsafe area of town.",
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
                },
                {
                    name: "dospert27",
                    title: "Moving to a city far away from your extended family.",
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
                },
                {
                    name: "dospert28",
                    title: "Starting a new career in your mid-thirties.",
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
                },
                {
                    name: "dospert29",
                    title: "Leaving your young children alone at home while running an errand.",
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
                },
                {
                    name: "dospert30",
                    title: "Not returning a wallet you found that contains $200.",
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
                    name: "activity",
                    title: "What type of improvement?",
                    type: "radiogroup",
                    choices: [
                        { value: 0, text: "Exercise" },
                        { value: 1, text: "Work" }
                    ],
                    isRequired: true
                },
                {
                    name: "pct_improv",
                    title: "What percentage of improvement?",
                    type: "radiogroup",
                    choices: [
                        { value: 90, text: "90%" },
                        { value: 50, text: "50%" }
                    ],
                    isRequired: true
                },
                {
                    name: "comp",
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
                    name: "pct_comp",
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