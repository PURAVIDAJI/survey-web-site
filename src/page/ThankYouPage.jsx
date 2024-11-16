function ThankYouPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        paddingTop: "30vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        Thank You for Completing the Survey!
      </h1>
      <p>Your responses have been recorded.</p>
    </div>
  );
}

export default ThankYouPage;
