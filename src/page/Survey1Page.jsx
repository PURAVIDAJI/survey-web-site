// Survey1Page.jsx
import React, { useState, useEffect, useRef } from "react";
import SectionProgressBar from "../component/SectionProgressBar";
import SurveyQuestion from "../component/SurveyQeustion";
import NavigationButtons from "../component/NavigationButtons";
import questionSets from "../questions";

function Survey1Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showErrors, setShowErrors] = useState(false); // Control visibility of error highlights
  const firstUnansweredRef = useRef(null); // Reference to scroll to first unanswered question

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
      setTimeout(() => {
        setShowErrors(false);
        setCurrentPage(currentPage + 1); // Move to the next page
      }, 3500);
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

      <div className="survey-content">
        {questionSets[currentPage].map((q, index) => (
          <SurveyQuestion
            key={index}
            q={q}
            questionNumber={index + 1}
            questionId={`question-${currentPage}-${index}`}
            onAnswerChange={(isAnswered) =>
              handleAnswerChange(`question-${currentPage}-${index}`, isAnswered)
            }
            showError={
              showErrors && !answers[`question-${currentPage}-${index}`]
            } // Show error if unanswered and showErrors is true
          />
        ))}
      </div>

      <NavigationButtons
        currentPage={currentPage}
        questionSetsLength={questionSets.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}

export default Survey1Page;
