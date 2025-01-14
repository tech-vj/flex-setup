/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const device_id = "device_unique_id"; // Replace or generate dynamically
      const app_secret = "38475203487kwsdjfvb1023897yfwbhekrfj";

      // API call updated to use the proxy route
      const response = await fetch("/api/proxy-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          credential,
          password,
          device_id,
          app_secret,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Navigate to dashboard on successful login
        router.push("/setup");
      } else {
        // Display error message on failed login
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (_err) {
      setError("Error: Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h2>

        {error && <p className="text-sm text-red-600 mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="credential" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="credential"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
