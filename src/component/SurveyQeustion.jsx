import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function SurveyQuestion({
  q,
  questionNumber,
  questionId,
  onAnswerChange,
  showError,
  response,
}) {
  const [otherValue, setOtherValue] = useState(
    response.startsWith("Other: ") ? response.replace("Other: ", "") : ""
  );

  useEffect(() => {
    // Clear otherValue if the response is not "Other"
    if (!response.startsWith("Other: ")) {
      setOtherValue("");
    }
  }, [response]);

  const handleInputChange = (event) => {
    const answer = event.target.value;

    if (answer === "Other") {
      // setOtherValue(""); // Reset otherValue when "Other" is selected
      // onAnswerChange("Other"); // Only update response to "Other"
      onAnswerChange("Other: " + otherValue);
    } else {
      setOtherValue(""); // Clear otherValue when other options are selected
      onAnswerChange(answer);
    }
  };
  const handleOtherInputChange = (event) => {
    const answer = event.target.value;
    setOtherValue(answer);
    onAnswerChange("Other: " + answer);
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
              id={`${questionId}-${option}`}
              name={`question_${questionId}`}
              value={option}
              checked={
                response === option ||
                (option === "Other" && response.startsWith("Other: "))
              }
              onChange={handleInputChange}
              style={{ backgroundColor: "transparent" }}
            />
            <label
              htmlFor={`${questionId}-${option}`}
              style={{
                backgroundColor: "transparent",
                marginLeft: "5px",
              }}
            >
              {option}
            </label>
            {option === "Other" && response.startsWith("Other: ") && (
              <input
                type="text"
                placeholder="Please specify"
                value={otherValue}
                onChange={handleOtherInputChange}
                style={{ marginLeft: "10px" }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default SurveyQuestion;
