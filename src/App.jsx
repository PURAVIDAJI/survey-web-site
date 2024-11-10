// App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Survey1Page from "./page/Survey1Page";
import Survey2Page from "./page/Survey2Page";
import Header from "../src/component/Header";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/survey1" element={<Survey1Page />} />
          <Route path="/survey2" element={<Survey2Page />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return <div>Welcome to the Home Page!</div>;
}

export default App;
