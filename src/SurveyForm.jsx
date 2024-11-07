import React, { useState } from "react";
import questionSets from "./questions";

const SurveyForm = () => {
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


  return (
    <div style={{ padding: "20px", width: "100%", margin: "auto" , backgroundColor: "#f9f9f9" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>HCI</h1>
        <div>0 Point</div>
      </header>

      <nav style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        <a href="#home">Home</a>
        <a href="#reward">Reward</a>
        <a href="#about">About</a>
        <a href="#help">Help</a>
      </nav>

      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", fontSize: "24px" }}>❗</span>
            <p style={{ margin: 0 }}>Jawab beberapa pertanyaan berikut untuk menemukan survei baru:</p>
          </div>
          <p>{question}</p>
          <form>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <input type="radio" name={`question-${index}`} /> Gofood
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <input type="radio" name={`question-${index}`} /> Grabfood
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <input type="radio" name={`question-${index}`} /> Uberfood
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <input type="radio" name={`question-${index}`} /> Delivery app restoran
            </label>
          </form>
        </div>
      ))}

      <button style={{ display: "block", margin: "20px auto", padding: "10px 20px", backgroundColor: "#004d40", color: "#fff", borderRadius: "5px", border: "none", fontSize: "16px", cursor: "pointer" }}>
        Submit
      </button>
    </div>
  );
};

export default SurveyForm;
