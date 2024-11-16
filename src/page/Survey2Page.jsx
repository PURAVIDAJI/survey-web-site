import React, { useState, useEffect, useRef } from "react";
import SectionProgressBar from "../component/SectionProgressBar";
import SurveyQuestion from "../component/SurveyQeustion";
import NavigationButtons from "../component/NavigationButtons";
import questionSets from "../questions";
import { useNavigate } from "react-router-dom";

function Survey2Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentGif, setCurrentGif] = useState("");
  const [currentMessage, setCurrentMessage] = useState(""); // For random message
  const [showErrors, setShowErrors] = useState(false);
  const firstUnansweredRef = useRef(null); // Reference to scroll to first unanswered question
  const [startTime] = useState(Date.now());
  const [timer, setTimer] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Array of Giphy iframe URLs
  const gifs = [
    {
      iframe:
        '<iframe src="https://giphy.com/embed/wD3zyGzDFjKL6bEMDb" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
      source: "https://giphy.com/gifs/wD3zyGzDFjKL6bEMDb",
    },
    {
      iframe:
        '<iframe src="https://giphy.com/embed/iiEKbVQJOysUjMEU0K" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
      source: "https://giphy.com/gifs/iiEKbVQJOysUjMEU0K",
    },
    {
      iframe:
        '<iframe src="https://giphy.com/embed/ur5T6Wuw4xK2afXVmd" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
      source: "https://giphy.com/gifs/ur5T6Wuw4xK2afXVmd",
    },
  ];

  // Array of random messages
  const messages = [
    "Great job! Keep it up!",
    "You're doing awesome!",
    "Almost there, stay strong!",
  ];

  const handleNext = () => {
    const currentQuestions = questionSets[currentPage];
    let allAnswered = true;

    // Only enforce mandatory answers for the first section (currentPage === 0)
    if (currentPage === 0) {
      currentQuestions.forEach((q, index) => {
        if (!responses[`question-${currentPage}-${index}`]) {
          allAnswered = false;
          if (!firstUnansweredRef.current) {
            firstUnansweredRef.current = `question-${currentPage}-${index}`;
          }
        }
      });

      if (!allAnswered) {
        setShowErrors(true); // Show errors for unanswered questions
        alert("Please answer all questions before proceeding.");
        document
          .getElementById(firstUnansweredRef.current)
          .scrollIntoView({ behavior: "smooth" });
        firstUnansweredRef.current = null; // Reset for next validation check
        return; // Stop here if not all questions are answered
      }
    }

    setIsLoading(true); // Start loading with GIF
    setShowErrors(false); // Hide any previous errors

    // // Randomly select a GIF iframe from the array
    // const randomGifIndex = Math.floor(Math.random() * gifs.length);
    // setCurrentGif(gifs[randomGifIndex]);

    // // Randomly select a message from the array
    // const randomMessageIndex = Math.floor(Math.random() * messages.length);
    // setCurrentMessage(messages[randomMessageIndex]);

    setTimeout(() => {
      setIsLoading(false); // Hide GIF and message
      setCurrentPage(currentPage + 1); // Move to the next page
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 5000); // 5 seconds delay
  };

  const handlePrevious = () => {
    window.scrollTo({ top: 0 });
    setShowErrors(false); // Reset errors when going back
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? gifs.length - 1 : prevIndex - 1
      );
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  const downloadCSV = () => {
    // Check if there are any responses
    if (!responses || Object.keys(responses).length === 0) {
      alert("No responses recorded. Please complete the survey.");
      return;
    }

    try {
      // Calculate the total time spent on the survey
      const timeSpent = new Date(timer * 1000).toISOString().substr(14, 5);

      // Define CSV headers
      const headers = [
        ["Time Spent", timeSpent],
        ["Question", "Answer"],
      ];

      // Convert responses object into rows
      const rows = Object.entries(responses).map(([key, value]) => [
        key,
        value,
      ]);

      // Participant code for file naming
      const participant_code = responses["question-0-0"] || "participant";

      // Create CSV content
      const csvContent = [...headers, ...rows]
        .map((row) =>
          row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
        )
        .join("\n");

      // Create Blob for CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      // Trigger file download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${participant_code}_survey_responses.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Navigate to thank-you page after download
      navigate("/thank-you2");
    } catch (error) {
      console.error("Error during CSV download:", error);
      alert("An error occurred while downloading the CSV. Please try again.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="survey-page">
      <SectionProgressBar currentSection={currentPage + 1} totalSections={4} />

      {/* Display GIF loader if isLoading is true */}
      {isLoading ? (
        <div
          className="gif-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            className="gif-message"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
              marginBottom: "20px", // Make sure the message appears above the GIF
            }}
          >
            {messages[currentIndex]}
          </div>
          <div
            className="gif-frame"
            dangerouslySetInnerHTML={{ __html: gifs[currentIndex].iframe }}
            style={{ display: "block" }}
          />
          <p>
            <a
              href={gifs[currentIndex].source}
              target="_blank"
              rel="noopener noreferrer"
            >
              via GIPHY
            </a>
          </p>
        </div>
      ) : (
        <div className="survey-content">
          {questionSets[currentPage].map((q, index) => (
            <SurveyQuestion
              key={`${currentPage}-${index}`}
              q={q}
              questionNumber={index + 1}
              questionId={`question-${currentPage}-${index}`}
              onAnswerChange={(answer) =>
                handleAnswerChange(`question-${currentPage}-${index}`, answer)
              }
              showError={
                showErrors && !responses[`question-${currentPage}-${index}`]
              }
              response={responses[`question-${currentPage}-${index}`] || ""}
            />
          ))}
        </div>
      )}

      {/* Render navigation buttons only when not loading */}
      {!isLoading && (
        <NavigationButtons
          currentPage={currentPage}
          questionSetsLength={questionSets.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={downloadCSV}
        />
      )}
    </div>
  );
}

export default Survey2Page;
