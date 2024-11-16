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

    setShowErrors(false);
    setCurrentPage(currentPage + 1);

    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  };

  const handlePrevious = () => {
    setShowErrors(false);
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 0);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  const onSubmit = () => {
    // Perform CSV download
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

    // Navigate to ThankYouPage
    navigate("/thank-you");
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
