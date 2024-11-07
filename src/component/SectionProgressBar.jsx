// SectionProgressBar.jsx
import React from "react";

function SectionProgressBar({ currentSection, totalSections }) {
  const sectionWidth = (currentSection / totalSections) * 100;

  return (
    <div className="section-progress-bar">
      <p>Your progress</p>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${sectionWidth}%`, backgroundColor: "#4CAF50" }}
        ></div>
      </div>
      <div className="section-steps">
        {[...Array(totalSections)].map((_, i) => (
          <span
            key={i}
            className={`step ${i < currentSection ? "completed" : ""}`}
          >
            Section {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SectionProgressBar;
