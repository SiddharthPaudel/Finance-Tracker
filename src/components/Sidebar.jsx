import React from "react";
import revenue from "../Icons/revenue.png";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "transactions", label: "Transactions" },
    { id: "categories", label: "Categories" },
  ];

  return (
    <aside className="w-60 bg-white border-r border-gray-200 h-screen p-5 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <img src={revenue} alt="FinTrack Logo" className="w-7 h-7" />
        <span className="text-xl font-semibold text-gray-800">FinTrack</span>
      </div>

      {/* Tabs */}
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left py-2 px-3 rounded-md text-sm font-medium transition
              ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
