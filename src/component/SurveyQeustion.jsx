// SurveyQuestion.jsx
import React from "react";

function SurveyQuestion({ q, questionNumber }) {
  const handleInputChange = () => {
    if (onAnswerSubmit) {
      onAnswerSubmit();
    }
  };

  return (
    <div className="survey-question">
      <p style={{ backgroundColor: "#F8E8EE" }}>
        {questionNumber + "." + q.question}
      </p>
      {q.type === "short answer" ? (
        <div style={{ backgroundColor: "#F8E8EE" }}>
          <input
            type="text"
            placeholder="Type your answer here"
            className="short-answer-input"
            name={`question-${questionNumber}`}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        q.options.map((option, index) => (
          <div
            key={index}
            className="option"
            style={{ backgroundColor: "#F8E8EE" }}
          >
            <input
              type="radio"
              id={option}
              name={`question-${questionNumber}`}
              value={option}
              onChange={handleInputChange}
            />
            <label htmlFor={option} style={{ backgroundColor: "#F8E8EE" }}>
              {option}
            </label>
          </div>
        ))
      )}
    </div>
  );
}

export default SurveyQuestion;
