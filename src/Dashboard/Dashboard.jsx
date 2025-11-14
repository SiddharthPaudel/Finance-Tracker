import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import TransactionPage from "../components/TransactionPage";
import CategoryPage from "../components/CategoryPage";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Section */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "dashboard" && <Overview />}
        {activeTab === "transactions" && <TransactionPage />}
        {activeTab === "categories" && <CategoryPage />}
      </main>
    </div>
  );
};

export default Dashboard;
