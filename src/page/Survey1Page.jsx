import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SectionProgressBar from "../component/SectionProgressBar";
import SurveyQuestion from "../component/SurveyQeustion";
import NavigationButtons from "../component/NavigationButtons";
import questionSets from "../questions";

function Survey1Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const firstUnansweredRef = useRef(null);
  const [startTime] = useState(Date.now());
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNext = () => {
    const currentQuestions = questionSets[currentPage];
    let allAnswered = true;

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
        setShowErrors(true);
        alert("Please answer all questions before proceeding.");
        document
          .getElementById(firstUnansweredRef.current)
          .scrollIntoView({ behavior: "smooth" });
        firstUnansweredRef.current = null;
        return;
      }
    }

    window.scrollTo({ top: 0 });
    setShowErrors(false);
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    window.scrollTo({ top: 0 });
    setShowErrors(false);
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  const onSubmit = () => {
    if (!responses || Object.keys(responses).length === 0) {
      alert("No responses recorded. Please answer at least one question.");
      return;
    }

    try {
      // Calculate time spent on the survey
      const timeSpent = new Date(timer * 1000).toISOString().substr(14, 5);

      // Create CSV headers
      const headers = [
        ["Time Spent", timeSpent],
        ["Question", "Answer"],
      ];

      // Prepare CSV rows from responses
      const rows = Object.entries(responses).map(([key, value]) => [
        key,
        value,
      ]);

      const participant_code = responses["question-0-0"] || "participant";
      const csvContent = [...headers, ...rows]
        .map((row) =>
          row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
        )
        .join("\n");

      // Create Blob and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${participant_code}_survey_responses.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Navigate to ThankYouPage
      navigate("/thank-you");
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred during submission. Please try again.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="survey-page">
      <SectionProgressBar currentSection={currentPage + 1} totalSections={4} />

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

      <NavigationButtons
        currentPage={currentPage}
        questionSetsLength={questionSets.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={onSubmit} // Use the new onSubmit function
      />
    </div>
  );
}

export default Survey1Page;
