import React from 'react';
import './App.css';
import questionSets from "./questions";
import { useState } from 'react';

function SurveyQuestion({ q, questionNumber }) {
  return (
    <div className="survey-question">

      <p>{questionNumber + "." + q.question}</p>

      {q.type == "short answer" ? (<div>
        {/* <label htmlFor="shortAnswer">Question 2: Please describe yourself briefly:</label> */}
        <input
          type="text"
          id="shortAnswer"
          placeholder="Type your answer here"
          className="short-answer-input"
          name={`question-${questionNumber}`} />
      </div>) : (q.options.map((option, index) => (
        <div key={index} className="option">
          <input
            type="radio"
            id={option}
            name={`question-${questionNumber}`} // Make name unique for each question
            value={option}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      )))
      }

    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const handleNext = () => {
    if (currentPage < questionSets.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle the Previous button click (if needed)
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };


  const options = ["Gojek", "Grabfood", "Uberfood", "Delivery app restoran"];
  console.log(questionSets[currentPage])
  return (
    <div className="app">
      <header className="header">
        <h1>SurvYAY</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#reward">Reward</a>
          <a href="#about">About</a>
          <a href="#help">Help</a>
        </nav>

      </header>
      <main>
        {questionSets[currentPage].map((q, index) => (
          <SurveyQuestion key={index} q={q} questionNumber={index + 1} />
        ))}

        <div className="button-container">
          {currentPage > 0 && (
            <button onClick={handlePrevious} className="nav-button">Previous</button>
          )}
          {currentPage < questionSets.length - 1 ? (
            <button onClick={handleNext} className="nav-button">Next</button>
          ) : (
            <button className="nav-button" style={{ backgroundColor: "#008CBA" }}>Submit</button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
