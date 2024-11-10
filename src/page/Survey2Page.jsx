// Survey1Page.jsx
import React, { useState, useEffect } from "react";
import SectionProgressBar from "../component/SectionProgressBar";
import SurveyQuestion from "../component/SurveyQeustion";
import NavigationButtons from "../component/NavigationButtons";
import questionSets from "../questions";

function Survey1Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGif, setCurrentGif] = useState(""); // Add state for the current GIF iframe

  // Array of Giphy iframe URLs
  const gifs = [
    '<iframe src="https://giphy.com/embed/wD3zyGzDFjKL6bEMDb" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/iiEKbVQJOysUjMEU0K" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/xT0xeAIDaF8WaeHF6w" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/xT9DPIBYf0pAviBLzO" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/26xBSxisb1xYv1dja" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/ur5T6Wuw4xK2afXVmd" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/75ElSnlwUEoM355hK0" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/xT5LMwY2fETTyvXKOk" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    '<iframe src="https://giphy.com/embed/Xq3vAx5aX0gaifRAsk" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
    // Add more Giphy iframe URLs here
  ];

  const handleNext = () => {
    if (currentPage < questionSets.length - 1) {
      setCurrentPage(currentPage + 1);

      // Randomly select a GIF iframe from the array
      const randomIndex = Math.floor(Math.random() * gifs.length);
      setCurrentGif(gifs[randomIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="survey-page">
      <SectionProgressBar currentSection={currentPage + 1} totalSections={3} />

      {/* Render the selected random GIF iframe */}
      {currentGif && (
        <div
          className="gif-container"
          dangerouslySetInnerHTML={{ __html: currentGif }}
        />
      )}

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
