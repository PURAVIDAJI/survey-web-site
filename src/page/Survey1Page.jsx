// Survey1Page.jsx
import React, { useState } from "react";
import SurveyQuestion from "../component/SurveyQeustion";
import NavigationButtons from "../component/NavigationButtons";
import questionSets from "../questions";

function Survey1Page() {
  const [currentPage, setCurrentPage] = useState(0);

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
      <div className="survey-content">
        {questionSets[currentPage].map((q, index) => (
          <SurveyQuestion key={index} q={q} questionNumber={index + 1} />
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
