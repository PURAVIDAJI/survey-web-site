// SurveyQuestion.jsx
import React from "react";

function SurveyQuestion({
  q,
  questionNumber,
  questionId,
  onAnswerChange,
  showError,
}) {
  const handleInputChange = (event) => {
    const hasAnswer = event.target.value.trim() !== "";
    onAnswerChange(hasAnswer); // Notify parent component of the answer status
  };

  const questionStyle = {
    border: showError ? "2px solid red" : "1px solid #ddd", // Red border if showError is true
    padding: "20px",
    borderRadius: "8px",
    margin: "40px 0", // Consistent spacing
  };

  const optionStyle = {
    backgroundColor: "transparent", // Ensure transparent background
    padding: "5px 0", // Adjust spacing as needed
    display: "flex",
    alignItems: "center",
  };

  return (
    <div id={questionId} className="survey-question" style={questionStyle}>
      <p style={{ backgroundColor: "transparent" }}>
        {questionNumber + ". " + q.question}
      </p>
      {q.type === "short answer" ? (
        <input
          type="text"
          placeholder="Type your answer here"
          className="short-answer-input"
          name={`question-${questionNumber}`}
          onChange={handleInputChange}
        />
      ) : (
        q.options.map((option, index) => (
          <div key={index} className="option" style={optionStyle}>
            <input
              type="radio"
              id={option}
              name={`question-${questionNumber}`}
              value={option}
              onChange={handleInputChange}
              style={{ backgroundColor: "transparent" }} // Transparent background for radio
            />
            <label
              htmlFor={option}
              style={{
                backgroundColor: "transparent", // Transparent background for label
                marginLeft: "5px", // Small spacing between radio and label
              }}
            >
              {option}
            </label>
          </div>
        ))
      )}
    </div>
  );
}

export default SurveyQuestion;
