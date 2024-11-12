// Survey2Page.jsx
import React, { useState, useEffect, useRef } from "react";
import SectionProgressBar from "../component/SectionProgressBar";
import SurveyQuestion from "../component/SurveyQeustion";
import NavigationButtons from "../component/NavigationButtons";
import questionSets from "../questions";

function Survey2Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGif, setCurrentGif] = useState("");
  const [answers, setAnswers] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const firstUnansweredRef = useRef(null); // Reference to scroll to first unanswered question

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
      if (!answers[`question-${currentPage}-${index}`]) {
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

  const handleAnswerChange = (questionId, isAnswered) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: isAnswered,
    }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="survey-page">
      <SectionProgressBar currentSection={currentPage + 1} totalSections={3} />

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
              key={index}
              q={q}
              questionNumber={index + 1}
              questionId={`question-${currentPage}-${index}`}
              onAnswerChange={(isAnswered) =>
                handleAnswerChange(
                  `question-${currentPage}-${index}`,
                  isAnswered
                )
              }
              showError={
                showErrors && !answers[`question-${currentPage}-${index}`]
              } // Show error if unanswered and showErrors is true
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
        />
      )}
    </div>
  );
}

export default Survey2Page;
