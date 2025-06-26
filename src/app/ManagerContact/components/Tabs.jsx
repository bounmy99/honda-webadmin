import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab, tabCounts = [] }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={`min-w-[150px] p-3 rounded-md font-semibold transition-colors ${
            activeTab === index
              ? "bg-[#1E3050] text-gray-50"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          {tab}{" "}
          {typeof tabCounts[index] !== "undefined" && (
            <span className="ml-1">({tabCounts[index]})</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;