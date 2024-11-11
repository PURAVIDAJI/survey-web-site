// Survey1Page.jsx
import React, { useState, useEffect } from "react";
import SectionProgressBar from "../component/SectionProgressBar";
import SurveyQuestion from "../component/SurveyQeustion";
import NavigationButtons from "../component/NavigationButtons";
import questionSets from "../questions";

function Survey1Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [startTime] = useState(Date.now()); 
  const [timer, setTimer] = useState(0); 
  const [intervalId, setIntervalId] = useState(null); 
  const [responses, setResponses] = useState({});

  const handleNext = () => {
    if (currentPage < questionSets.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAnswerChange = (question, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question]: answer,
    }));
  };

  const downloadCSV = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    // Convert timer to minutes and seconds for a more user-friendly format
    const timeSpent = new Date(timer * 1000).toISOString().substr(14, 5); // format as mm:ss

    console.log("downaload",intervalId)
    const headers = [["Time Spent", timeSpent], ["Question", "Answer"]];
    const rows = Object.entries(responses);
    const csvContent = [...headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "survey_responses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime) / 1000)); // Update timer every second
    }, 1000);
    setIntervalId(interval);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [startTime]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="survey-page">
      <SectionProgressBar currentSection={currentPage + 1} totalSections={3} />
      <div className="survey-content">
        {questionSets[currentPage].map((q, index) => (
          <SurveyQuestion key={`${currentPage}-${index + 1}`}
            q={q} questionNumber={index + 1}
            onAnswerChange={handleAnswerChange}
            currentPage={currentPage} 
            response={responses[q.question] || ""}/>
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
