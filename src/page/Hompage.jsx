import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",

        padding: "20px",
        paddingTop: "30vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        Welcome to the Survey Preparation Page!
      </h1>
      <p style={{ marginBottom: "10px" }}>
        Please select a survey to participate in. <br />
        Your responses will help us improve our services and understanding.
        Thank you for your valuable time!
      </p>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/survey1")}
        >
          Survey 1
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/survey2")}
        >
          Survey 2
        </button>
      </div>
    </div>
  );
}

export default HomePage;
