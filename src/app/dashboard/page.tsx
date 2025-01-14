"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Chart from "@/components/Chart";

const Dashboard = () => {
  const [config, setConfig] = useState<{
    header: boolean;
    footer: boolean;
    navbar: boolean;
    charts: boolean;
    menuItems: string[];
  } | null>(null);

  useEffect(() => {
    const storedConfig = sessionStorage.getItem("dashboardConfig");
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }
  }, []);

  if (!config) {
    return <p className="text-center mt-6">Loading configuration...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {config.header && <Header />}

      <div className="flex flex-grow">
        {config.navbar && (
          <aside className="w-64 bg-white shadow-md border-r border-gray-200">
            <Navbar menuItems={config.menuItems} />
          </aside>
        )}

        <main className="flex-grow p-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          {config.charts && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Chart />
              <Chart />
              <Chart />
            </section>
          )}
        </main>
      </div>

      {config.footer && <Footer />}
    </div>
  );
};

export default Dashboard;
