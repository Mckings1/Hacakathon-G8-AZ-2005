import React from "react";

const Verification = ({ riskLevel }) => {
  const requirements = {
    Low: ["Document Verification"],
    Medium: ["Document Verification", "Liveness Check"],
    High: ["Document Verification", "Liveness Check", "Human Review"],
  };

  return (
    <div>
      <h2>Risk Level: {riskLevel}</h2>
      <ul>
        {requirements[riskLevel].map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default Verification;
