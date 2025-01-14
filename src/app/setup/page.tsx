"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SetupPage = () => {
  const router = useRouter();

  const [config, setConfig] = useState({
    header: true,
    footer: true,
    navbar: true,
    charts: true,
    menuItems: ["Home", "Profile", "Settings"],
  });

  const handleToggle = (key: keyof typeof config) => {
    if (key === "menuItems") return;
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMenuItemChange = (index: number, value: string) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[index] = value;
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
  };

  const handleAddMenuItem = () => {
    setConfig((prev) => ({
      ...prev,
      menuItems: [...prev.menuItems, ""],
    }));
  };

  const handleSave = () => {
    sessionStorage.setItem("dashboardConfig", JSON.stringify(config));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-800 mb-2">
            Setup Your Dashboard
          </h1>
          <p className="text-gray-700 text-lg">
            Choose features and modules for your personalized dashboard
          </p>
        </div>

        {/* Feature Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {["header", "footer", "navbar", "charts"].map((key) => (
            <div
              key={key}
              className={`p-6 rounded-lg shadow-md border transition ${
                config[key as keyof typeof config]
                  ? "bg-indigo-50 border-indigo-400 hover:shadow-lg"
                  : "bg-gray-100 border-gray-300 hover:shadow-md"
              } cursor-pointer`}
              onClick={() => handleToggle(key as keyof typeof config)}
            >
              <h2 className="text-xl font-bold text-gray-800 capitalize text-center">
                {key}
              </h2>
              <p
                className={`mt-2 text-center ${
                  config[key as keyof typeof config]
                    ? "text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                {config[key as keyof typeof config] ? "Enabled" : "Disabled"}
              </p>
            </div>
          ))}
        </div>

        {/* Menu Items Configuration */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            Configure Menu Items
          </h2>
          <div className="space-y-4">
            {config.menuItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleMenuItemChange(index, e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 text-gray-900 placeholder-gray-500"
                  placeholder={`Menu Item ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleAddMenuItem}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Add Menu Item
          </button>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            Save & Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
