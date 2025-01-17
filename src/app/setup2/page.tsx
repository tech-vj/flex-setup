"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Setup2Page = () => {
  const router = useRouter();

  const [config, setConfig] = useState({
    header: true,
    footer: true,
    enableCards: false,
    cards: [""],
    navBarType: "side", // "side" or "horizontal"
    menuItems: [{ name: "", enableSubMenu: false, subMenuItems: [""] }],
  });

  const handleToggle = (key: keyof typeof config) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddCard = () => {
    setConfig((prev) => ({
      ...prev,
      cards: [...prev.cards, ""],
    }));
  };

  const handleCardChange = (index: number, value: string) => {
    const updatedCards = [...config.cards];
    updatedCards[index] = value;
    setConfig((prev) => ({ ...prev, cards: updatedCards }));
  };

  const handleAddMenuItem = () => {
    setConfig((prev) => ({
      ...prev,
      menuItems: [
        ...prev.menuItems,
        { name: "", enableSubMenu: false, subMenuItems: [""] },
      ],
    }));
  };

  const handleMenuItemChange = (index: number, value: string) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[index].name = value;
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
  };

  const handleSubMenuToggle = (menuIndex: number) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[menuIndex].enableSubMenu =
      !updatedMenuItems[menuIndex].enableSubMenu;
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
  };

  const handleAddSubMenuItem = (menuIndex: number) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[menuIndex].subMenuItems.push("");
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
  };

  const handleSubMenuItemChange = (
    menuIndex: number,
    subMenuIndex: number,
    value: string
  ) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[menuIndex].subMenuItems[subMenuIndex] = value;
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
  };

  const handleSave = () => {
    localStorage.setItem("dashboardConfig2", JSON.stringify(config));
    router.push("/dashboard2");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-800 mb-2">
            Setup Your Advanced Dashboard
          </h1>
          <p className="text-gray-700 text-lg">
            Configure your dashboard with advanced options
          </p>
        </div>

        {/* Header and Footer Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {["header", "footer"].map((key) => (
            <div
              key={key}
              className={`p-6 rounded-lg shadow-md border transition ${
                config[key as keyof typeof config]
                  ? "bg-purple-50 border-purple-400 hover:shadow-lg"
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
                    ? "text-purple-600"
                    : "text-gray-500"
                }`}
              >
                {config[key as keyof typeof config] ? "Enabled" : "Disabled"}
              </p>
            </div>
          ))}
        </div>

        {/* Cards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Cards</h2>
          <label className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={config.enableCards}
              onChange={() => handleToggle("enableCards")}
              className="w-5 h-5 text-purple-600 rounded focus:ring focus:ring-purple-300"
            />
            <span className="text-gray-800">Enable Cards</span>
          </label>
          {config.enableCards && (
            <div className="mt-4 space-y-4">
              {config.cards.map((card, index) => (
                <input
                  key={index}
                  type="text"
                  value={card}
                  onChange={(e) => handleCardChange(index, e.target.value)}
                  placeholder={`Card ${index + 1}`}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300 text-gray-900 placeholder-gray-500"
                />
              ))}
              <button
                onClick={handleAddCard}
                className="mt-4 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
              >
                Add More
              </button>
            </div>
          )}
        </div>

        {/* Nav Bar Configuration */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Nav Bar</h2>
          <div className="flex space-x-8">
            {["side", "horizontal"].map((type) => (
              <label key={type} className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="navBarType"
                  value={type}
                  checked={config.navBarType === type}
                  onChange={() => setConfig((prev) => ({ ...prev, navBarType: type }))}
                  className="w-5 h-5 text-purple-600 focus:ring focus:ring-purple-300"
                />
                <span className="text-gray-800 capitalize">{type} Nav Bar</span>
              </label>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-purple-700 mb-2">
              Configure Menu Items
            </h3>
            {config.menuItems.map((menuItem, menuIndex) => (
              <div key={menuIndex} className="mb-6">
                <input
                  type="text"
                  value={menuItem.name}
                  onChange={(e) =>
                    handleMenuItemChange(menuIndex, e.target.value)
                  }
                  placeholder={`Menu Item ${menuIndex + 1}`}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300 text-gray-900 placeholder-gray-500"
                />
                <label className="flex items-center space-x-4 mt-2">
                  <input
                    type="checkbox"
                    checked={menuItem.enableSubMenu}
                    onChange={() => handleSubMenuToggle(menuIndex)}
                    className="w-5 h-5 text-purple-600 focus:ring focus:ring-purple-300"
                  />
                  <span className="text-gray-800">Enable Sub Menu</span>
                </label>
                {menuItem.enableSubMenu && (
                  <div className="mt-4 space-y-4">
                    {menuItem.subMenuItems.map((subMenuItem, subMenuIndex) => (
                      <input
                        key={subMenuIndex}
                        type="text"
                        value={subMenuItem}
                        onChange={(e) =>
                          handleSubMenuItemChange(
                            menuIndex,
                            subMenuIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Sub Menu Item ${subMenuIndex + 1}`}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300 text-gray-900 placeholder-gray-500"
                      />
                    ))}
                    <button
                      onClick={() => handleAddSubMenuItem(menuIndex)}
                      className="mt-2 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
                    >
                      Add More Sub Menu Items
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleAddMenuItem}
              className="mt-4 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
            >
              Add More Menu Items
            </button>
          </div>
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

export default Setup2Page;
