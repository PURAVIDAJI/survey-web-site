function ThankYouPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        // backgroundColor: "#f9f9f9", // 배경색 추가 (선택 사항)
      }}
    >
      <h1>Thank You for Completing the Survey!</h1>
      <p>Your responses have been recorded.</p>
      <iframe
        src="https://giphy.com/embed/SYFbUCGlD9henYdMSs"
        width="480"
        height="480"
        style={{ border: "none", marginTop: "20px" }}
        frameBorder="0"
        allowFullScreen
        title="Thank You Gif"
      ></iframe>
      <p>
        <a
          href="https://giphy.com/gifs/Kudaberi-gbc-gmx-kudaberi-SYFbUCGlD9henYdMSs"
          target="_blank"
          rel="noopener noreferrer"
        >
          via GIPHY
        </a>
      </p>
    </div>
  );
}

export default ThankYouPage;
