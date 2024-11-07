// NavigationButtons.jsx
import React from "react";

function NavigationButtons({
  currentPage,
  questionSetsLength,
  onPrevious,
  onNext,
}) {
  return (
    <div className="button-container">
      {currentPage > 0 && (
        <button onClick={onPrevious} className="nav-button">
          Previous
        </button>
      )}
      {currentPage < questionSetsLength - 1 ? (
        <button onClick={onNext} className="nav-button">
          Next
        </button>
      ) : (
        <button className="nav-button" style={{ backgroundColor: "#008CBA" }}>
          Submit
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
