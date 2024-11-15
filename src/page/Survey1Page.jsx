import React, { useState, useEffect, useRef } from "react";
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

  const handleNext = () => {
    const currentQuestions = questionSets[currentPage];
    let allAnswered = true;

    // Section 1만 필수 응답 체크
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
        return; // Early return if not all questions are answered
      }
    }

    // Reset error state and move to the next page
    setShowErrors(false);
    setCurrentPage(currentPage + 1);

    // Scroll to the top
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0); // Ensure this runs after page update
  };

  const handlePrevious = () => {
    setShowErrors(false);
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);

      // Scroll to the top
      setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 0); // Ensure this runs after page update
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  const downloadCSV = () => {
    const timeSpent = new Date(timer * 1000).toISOString().substr(14, 5);
    const headers = [
      ["Time Spent", timeSpent],
      ["Question", "Answer"],
    ];
    const rows = Object.entries(responses);
    const participant_code = responses["question-0-0"] || "participant";
    const csvContent = [...headers, ...rows]
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${participant_code}_survey_responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    // Ensure the screen scrolls to top whenever the page changes
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
        onSubmit={downloadCSV}
      />
    </div>
  );
}

export default Survey1Page;
