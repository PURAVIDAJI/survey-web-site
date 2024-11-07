// QuestionProgressBar.jsx
import React from "react";

function QuestionProgressBar({ currentQuestion, totalQuestions }) {
  const percentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="question-progress-bar">
      <svg viewBox="0 0 36 36" className="circular-chart">
        <path
          className="circle-bg"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="percentage-text">
        {currentQuestion}/{totalQuestions}
      </div>
    </div>
  );
}

export default QuestionProgressBar;
