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
    response?.startsWith?.("Other: ") ? response.replace("Other: ", "") : ""
  );

  useEffect(() => {
    if (!response?.startsWith?.("Other: ")) {
      setOtherValue("");
    }
  }, [response]);

  const handleInputChange = (event) => {
    const { value, checked } = event.target;

    if (q.isMultipleSelect) {
      const newResponse = Array.isArray(response) ? [...response] : [];
      if (checked) {
        newResponse.push(value); // Add selected value
      } else {
        const index = newResponse.indexOf(value);
        if (index > -1) newResponse.splice(index, 1); // Remove deselected value
      }
      onAnswerChange(newResponse);
    } else {
      onAnswerChange(value === "Other" ? "Other: " + otherValue : value);
    }
  };

  const handleOtherInputChange = (event) => {
    const value = event.target.value;
    setOtherValue(value);

    if (q.isMultipleSelect) {
      const newResponse = Array.isArray(response) ? [...response] : [];
      const filteredResponse = newResponse.filter(
        (item) => !item.startsWith("Other: ")
      );
      filteredResponse.push("Other: " + value);
      onAnswerChange(filteredResponse);
    } else {
      onAnswerChange("Other: " + value);
    }
  };

  const questionStyle = {
    border: showError ? "2px solid red" : "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    margin: "20px 0",
  };

  const optionStyle = {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
  };

  return (
    <div id={questionId} className="survey-question" style={questionStyle}>
      <p style={{ backgroundColor: "transparent" }}>
        {`${questionNumber}. `}
        {Array.isArray(q.question)
          ? q.question.map((line, index) => (
              <span key={index} style={{ backgroundColor: "transparent" }}>
                {line}
                <br />
              </span>
            ))
          : q.question}
      </p>

      {q.type === "short answer" ? (
        <input
          type="text"
          placeholder="Type your answer here"
          className="short-answer-input"
          name={questionId}
          value={response || ""}
          onChange={(e) => onAnswerChange(e.target.value)}
        />
      ) : (
        q.options.map((option, index) => (
          <div key={index} style={optionStyle}>
            <input
              type={q.isMultipleSelect ? "checkbox" : "radio"}
              id={`${questionId}-${index}`}
              name={q.isMultipleSelect ? `${questionId}-${index}` : questionId}
              value={option}
              checked={
                q.isMultipleSelect
                  ? Array.isArray(response) && response.includes(option)
                  : response === option ||
                    (option === "Other" && response?.startsWith("Other: "))
              }
              onChange={handleInputChange}
              style={{ backgroundColor: "transparent" }}
            />
            <label
              htmlFor={`${questionId}-${index}`}
              style={{ marginLeft: "10px", backgroundColor: "transparent" }}
            >
              {option}
            </label>
            {option === "Other" &&
              (q.isMultipleSelect
                ? response?.find?.((r) => r.startsWith("Other: "))
                : response?.startsWith("Other: ")) && (
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
