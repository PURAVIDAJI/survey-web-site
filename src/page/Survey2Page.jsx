// Survey2Page.jsx
import React, { useState } from "react";
import SectionProgressBar from "../component/SectionProgressBar";
import QuestionProgressBar from "../component/QuestionProgressBar";
import SurveyQuestion from "../component/SurveyQeustion";
import NavigationButtons from "../component/NavigationButtons";
import questionSets from "../questions";

function Survey2Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalQuestions = 10; // Total number of questions for progress

  const handleNext = () => {
    if (currentPage < questionSets.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="survey-page">
      <SectionProgressBar currentSection={1} totalSections={3} />
      <div className="survey-content">
        <div className="questions">
          {questionSets[currentPage].map((q, index) => (
            <SurveyQuestion key={index} q={q} questionNumber={index + 1} />
          ))}
        </div>
        <QuestionProgressBar
          currentQuestion={currentPage + 1}
          totalQuestions={totalQuestions}
        />
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

export default Survey2Page;
