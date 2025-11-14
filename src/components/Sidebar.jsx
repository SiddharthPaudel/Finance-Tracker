import React from "react";
import revenue from "../Icons/revenue.png"

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "transactions", label: "Transactions" },
    { id: "categories", label: "Categories" },
  ];

  return (
    <aside className="w-64 bg-blue-600 text-white flex flex-col p-5">
       <div className="flex items-center gap-2 p-4 text-2xl font-semibold text-blue-800 border-b border-blue-200">
      <img
        src={revenue}
        alt="FinTrack Logo"
        className="w-8 h-8 object-contain"
      />
      <span>FinTrack</span>

    </div>
    <br/>
      <nav className="space-y-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left py-2 px-3 rounded-lg transition ${
              activeTab === tab.id ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
