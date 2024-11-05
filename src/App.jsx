import React from 'react';
import './App.css';
import questionSets from "./questions";
import { useState } from 'react';

function SurveyQuestion({ question, options }) {
  return (
    <div className="survey-question">
      <div className="question-info">
        Answer the question
      </div>
      <p>{question}</p>
      {options.map((option, index) => (
        <div key={index} className="option">
          <input type="radio" id={option} name={question} value={option} />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [currentPage,setCurrentPage]= useState(0);
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
        {questionSets[currentPage].map((question, index) => (
          <SurveyQuestion key={index} question={question} options={options} />
        ))}
        {/* <button className="submit-button">Submit</button> */}
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
