import React, { useState } from "react";
import "./App.css";
import Verification from "./components/Verification";

function App() {
  const [prompt, setPrompt] = useState("");
  const [userContext, setUserContext] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [riskLevel, setRiskLevel] = useState(null);

  const handleSubmit = () => {
    try {
      const context = JSON.parse(userContext);
      const score = context?.userContext?.ipReputationScore || 0;

      if (score > 80) setRiskLevel("Low");
      else if (score > 30) setRiskLevel("Medium");
      else setRiskLevel("High");

      setSubmitted(true);
    } catch {
      alert("Invalid JSON in user context");
    }
  };

  return (
    <div className="container">
      {!submitted ? (
        <>
          <h1>Adaptive KYC</h1>

          <label>Prompt</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter prompt"
          />

          <label>User Context (JSON)</label>
          <textarea
            value={userContext}
            onChange={(e) => setUserContext(e.target.value)}
            placeholder="Paste user context JSON here"
          />

          <button onClick={handleSubmit}>Next</button>
        </>
      ) : (
        <Verification riskLevel={riskLevel} />
      )}
    </div>
  );
}

export default App;
