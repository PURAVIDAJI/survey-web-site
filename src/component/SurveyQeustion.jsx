import React from "react";

function SurveyQuestion({
  q,
  questionNumber,
  questionId,
  onAnswerChange,
  showError,
  response,
}) {
  const handleInputChange = (event) => {
    const answer = event.target.value;
    onAnswerChange(answer);
  };

  const questionStyle = {
    border: showError ? "2px solid red" : "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    margin: "40px 0",
  };

  const optionStyle = {
    backgroundColor: "transparent",
    padding: "5px 0",
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
          name={`question_${questionId}`}
          value={response}
          onChange={handleInputChange}
        />
      ) : (
        q.options.map((option, index) => (
          <div key={index} className="option" style={optionStyle}>
            <input
              type="radio"
              id={option}
              name={`question_${questionId}`}
              value={option}
              checked={response === option}
              onChange={handleInputChange}
              style={{ backgroundColor: "transparent" }}
            />
            <label
              htmlFor={option}
              style={{
                backgroundColor: "transparent",
                marginLeft: "5px",
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
