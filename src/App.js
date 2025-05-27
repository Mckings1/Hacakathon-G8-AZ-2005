// App.jsx
import React, { useState } from "react";

export default function App() {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startVerification = async () => {
    if (!userId.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        `/api/verify?userId=${encodeURIComponent(userId)}`
      );
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        Self-Adaptive Identity Verification AI Agent
      </h1>

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={startVerification}
          disabled={loading || !userId.trim()}
          className={`w-full py-2 rounded-md text-white font-semibold ${
            loading || !userId.trim()
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Verifying..." : "Start Verification"}
        </button>

        {error && (
          <div className="text-red-600 font-medium bg-red-100 p-3 rounded-md">
            Error: {error}
          </div>
        )}

        {data && (
          <pre className="bg-white p-4 rounded-md border overflow-x-auto max-h-64">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
