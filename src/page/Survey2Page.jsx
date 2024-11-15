// Survey2Page.jsx
import React, { useState, useEffect, useRef } from "react";
import SectionProgressBar from "../component/SectionProgressBar";
import SurveyQuestion from "../component/SurveyQeustion";
import NavigationButtons from "../component/NavigationButtons";
import questionSets from "../questions";

function Survey2Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentGif, setCurrentGif] = useState("");
  const [answers, setAnswers] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const firstUnansweredRef = useRef(null); // Reference to scroll to first unanswered question
  const [startTime] = useState(Date.now());
  const [timer, setTimer] = useState(0);

  // Array of Giphy iframe URLs
  const gifs = [
    '<iframe src="https://giphy.com/embed/wD3zyGzDFjKL6bEMDb" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/iiEKbVQJOysUjMEU0K" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/xT0xeAIDaF8WaeHF6w" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/xT9DPIBYf0pAviBLzO" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/26xBSxisb1xYv1dja" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/ur5T6Wuw4xK2afXVmd" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/T9AdlFYHRvcqJG0czT" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/xlMWh89tib67i2jSJO" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/KpUmECkP8UDX4L7SkU" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
  ];

  const handleNext = () => {
    const currentQuestions = questionSets[currentPage];
    let allAnswered = true;

    // Check if all questions on the current page have been answered
    currentQuestions.forEach((q, index) => {
      if (!responses[`question-${currentPage}-${index}`]) {
        allAnswered = false;
        if (!firstUnansweredRef.current) {
          firstUnansweredRef.current = `question-${currentPage}-${index}`;
        }
      }
    });

    if (allAnswered) {
      setIsLoading(true); // Start loading with GIF
      setShowErrors(false); // Hide any previous errors
      // Randomly select a GIF iframe from the array
      const randomIndex = Math.floor(Math.random() * gifs.length);
      setCurrentGif(gifs[randomIndex]);

      setTimeout(() => {
        setIsLoading(false); // Hide GIF
        setCurrentPage(currentPage + 1); // Move to the next page
      }, 3500); // 3.5 seconds delay
    } else {
      setShowErrors(true); // Show errors for unanswered questions
      alert("Please answer all questions before proceeding.");
      document
        .getElementById(firstUnansweredRef.current)
        .scrollIntoView({ behavior: "smooth" });
      firstUnansweredRef.current = null; // Reset for next validation check
    }
  };

  const handlePrevious = () => {
    setShowErrors(false); // Reset errors when going back
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  const downloadCSV = () => {
    const timeSpent = new Date(timer * 1000).toISOString().substr(14, 5);
    const headers = [
      ["Time Spent", timeSpent],
      ["Question", "Answer"],
    ];
    const rows = Object.entries(responses);
    const participant_code = responses["question-0-0"] || "participant";
    const csvContent = [...headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${participant_code}_survey_responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="survey-page">
      <SectionProgressBar currentSection={currentPage + 1} totalSections={4} />

      {/* Display GIF loader if isLoading is true */}
      {isLoading ? (
        <div
          className="gif-container"
          dangerouslySetInnerHTML={{ __html: currentGif }}
        />
      ) : (
        <div className="survey-content">
          {questionSets[currentPage].map((q, index) => (
            <SurveyQuestion
              key={`${currentPage}-${index}`}
              q={q}
              questionNumber={index + 1}
              questionId={`question-${currentPage}-${index}`}
              onAnswerChange={(answer) =>
                handleAnswerChange(`question-${currentPage}-${index}`, answer)
              }
              showError={
                showErrors && !responses[`question-${currentPage}-${index}`]
              } // Show error if unanswered and showErrors is true
              response={responses[`question-${currentPage}-${index}`] || ""}
            />
          ))}
        </div>
      )}

      {/* Render navigation buttons only when not loading */}
      {!isLoading && (
        <NavigationButtons
          currentPage={currentPage}
          questionSetsLength={questionSets.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={downloadCSV}
        />
      )}
    </div>
  );
}

export default Survey2Page;
