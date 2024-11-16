// questions.js
const questionSets = [
  [
    {
      question: "Enter the Participant Code",
      type: "short answer",
      options: [],
    },
    { question: "What is your age?", type: "short answer", options: [] },
    {
      question: "What is your gender?",
      type: "multiple choice",
      options: [
        "Female",
        "Male",
        "Transgender Female",
        "Transgender Male",
        "Non-binary",
        "Genderqueer",
        "Prefer not to answer",
        "Other",
      ],
    },
    { question: "What is your occupation?", type: "short answer", options: [] },
    {
      question: "What is your education level?",
      type: "multiple choice",
      options: [
        "High school",
        "Associates",
        "Bachelors",
        "Masters",
        "PhD",
        "Other",
      ],
    },
    {
      question: "If you graduated from college, what was your major?",
      type: "short answer",
      options: [],
    },
  ],
  [
    {
      question:
        "In a given year, how often are you asked to complete surveys (regardless of whether or not you choose to complete them)?",
      type: "multiple choice",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question:
        "In a given year, out of all the surveys you are asked to take, how many of them do you complete?",
      type: "multiple choice",
      options: ["None", "A few", "Some", "Most", "All"],
    },
    {
      question: "How many questions do you prefer in a survey?",
      type: "short answer",
      options: [],
    },
    {
      question:
        "In your opinion, what is the optimal amount of time a survey should take to fill out?",
      type: "short answer",
      options: [],
    },
    {
      question: "Do you ever seek out surveys to take?",
      type: "multiple choice",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
    {
      question:
        "Regarding the previous question, if you do seek out surveys to take, what kind of surveys are these?",
      type: "short answer",
      options: [],
    },
    {
      question:
        "When you are asked to take surveys, where do the requests to take these surveys usually come from (select all that apply)?",
      type: "multiple choice",
      isMultipleSelect: true,
      options: [
        "Work",
        "School",
        "Social media",
        "Friends/Family",
        "Companies",
        "Other",
      ],
    },
    {
      question:
        "When you choose to take surveys, where do the requests to take these surveys usually come from (select all that apply)?",
      type: "multiple choice",
      isMultipleSelect: true,
      options: ["Work", "School", "Social media", "Friends/Family", "Other"],
    },
    {
      question:
        "When you are asked to take a survey, what factors influence your decision to take, or not to take, the survey (select all that apply)?",
      type: "multiple choice",
      isMultipleSelect: true,
      options: [
        "Time constraints",
        "Being paid to take a survey",
        "My interest in the survey topic",
        "My connections to the people running the survey",
        "A feeling of obligation to contribute to the survey data",
        "Other",
      ],
    },
    {
      question:
        "What survey formats have you taken before? (select all that apply)",
      type: "multiple choice",
      isMultipleSelect: true,
      options: [
        "Online surveys",
        "In-person interviews",
        "Online interviews",
        "Telephone surveys",
        "Focus groups",
        "Mail-in surveys",
        "Kiosk surveys",
      ],
    },
    {
      question: [
        "This is a simple question.",
        "",
        "You don't need to be an avid survey-taker to answer.",
        "To help us understand the experience of taking surveys, please select not applicable for the following question.",
        "",
        "  How likely are you to participate in future surveys?",
        "",
      ],
      options: [
        "Not at all likely",
        "Somewhat likely",
        "Extremely likely",
        "Not Applicable",
      ],
    },

    {
      question: "Do you ever make surveys to send out to other people?",
      type: "multiple choice",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
  ],
  [
    {
      question: "I enjoy taking surveys",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "I believe surveys are useful ways of gathering information",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "When I take surveys, I feel like my responses are valued",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "When I am taking a survey, I feel motivated",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "When I am taking a survey, I feel energized",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "When I am taking a survey, I feel bored",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "When I am taking a survey, I feel annoyed",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "When I am taking a survey, I feel angry",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "When I am taking a survey, I feel impatient",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "When I am taking a survey, I like seeing a progress bar",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question:
        "When I choose to complete a survey, I try to make sure my responses are as thorough and accurate as possible",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question:
        "Please rate how much you prefer the following type of survey question: yes/no questions",
      type: "multiple choice",
      options: [
        "Strongly disprefer",
        "Disprefer",
        "Neutral",
        "Prefer",
        "Strongly prefer",
      ],
    },
    {
      question:
        "Please rate how much you prefer the following type of survey question: questions that ask you to respond on a scale of 'strongly disagree' to 'strongly agree'",
      type: "multiple choice",
      options: [
        "Strongly disprefer",
        "Disprefer",
        "Neutral",
        "Prefer",
        "Strongly prefer",
      ],
    },
    {
      question:
        "Please rate how much you prefer the following type of survey question: multiple choice questions",
      type: "multiple choice",
      options: [
        "Strongly disprefer",
        "Disprefer",
        "Neutral",
        "Prefer",
        "Strongly prefer",
      ],
    },
    {
      question:
        "Please rate how much you prefer the following type of survey question: free response",
      type: "multiple choice",
      options: [
        "Strongly disprefer",
        "Disprefer",
        "Neutral",
        "Prefer",
        "Strongly prefer",
      ],
    },
    {
      question: "What do you like, if anything, about taking surveys?",
      type: "short answer",
      options: [],
    },
    {
      question: "What do you dislike, if anything, about taking surveys?",
      type: "short answer",
      options: [],
    },
    {
      question: "I believe surveys are a waste of time",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question:
        "I am more inclined to take a survey if I will be paid for doing so",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question:
        "I am more inclined to take a survey if a friend tells me to take it",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question:
        "I am more inclined to take a survey if I am in a group of people also taking it",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "I am more inclined to take a survey if I am alone",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "Please select strongly disagree for this question.",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "I am more inclined to take a survey if it is anonymous",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question:
        "I feel that my survey responses are influential and make an impact",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "I enjoy receiving feedback or results from surveys I complete",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question: "I like being sent reminders to complete a survey",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
    {
      question:
        "I feel more engaged when taking aesthetically pleasing surveys.",
      type: "multiple choice",
      options: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
    },
  ],
  [
    {
      question: "Have you ever abandoned a survey? If so, why?",
      type: "short answer",
      options: [],
    },
    {
      question:
        "Are you ever concerned about the privacy of your survey responses?",
      type: "short answer",
      options: [],
    },
    {
      question:
        "Have you ever felt that your feedback from a survey led to a tangible change?",
      type: "short answer",
      options: [],
    },
    {
      question:
        "On a scale of 1 to 10, how important is the aesthetic design of a survey to you?",
      type: "short answer",
      options: [],
    },
    {
      question: "What types of surveys are you more inclined to respond to?",
      type: "multiple choice",
      options: [
        "Online surveys",
        "In-person interviews",
        "Online interviews",
        "Telephone surveys",
        "Focus groups",
        "Mail-in surveys",
        "Kiosk surveys",
      ],
    },
    {
      question:
        "What devices do you usually use to complete surveys? (Select all that apply)",
      type: "multiple choice",
      isMultipleSelect: true,
      options: ["Smartphone", "Tablet", "Computer", "Other"],
    },
    {
      question:
        "Does your level of trust in a survey depend on the type of organization conducting the survey (e.g., academic, government, commercial)?",
      type: "short answer",
      options: [],
    },
    {
      question:
        "Do you ever feel fatigued while completing and/or after completing a survey? If so, what factors contribute to this fatigue?",
      type: "short answer",
      options: [],
    },

    {
      question:
        "How important is it for organizations to disclose how they will use your data from surveys?",
      type: "short answer",
      options: [],
    },
    {
      question:
        "Have you ever encountered a question in a survey that was difficult to answer? Please explain.",
      type: "short answer",
      options: [],
    },
  ],
];

export default questionSets;
