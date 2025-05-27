import React, { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState("");

  const handleVerify = async () => {
    const response = await fetch(
      `http://localhost:5000/api/verify?userId=${userId}`
    );
    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Identity Verification Agent</h1>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleVerify}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start Verification
        </button>
        <pre className="mt-6 bg-gray-200 p-4 rounded overflow-x-auto text-sm">
          {result}
        </pre>
      </div>
    </div>
  );
}

export default App;
