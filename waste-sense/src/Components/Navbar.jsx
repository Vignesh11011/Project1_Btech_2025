import React from "react";

function Navbar({ activeTab, setActiveTab }) {
  return (
    
    <nav className="bg-green-600 text-white flex items-center justify-between px-6 py-4 shadow-md">
      <div className="text-xl font-bold">WasteSense</div>
      <div className="flex space-x-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "analysis" ? "bg-green-800" : "hover:bg-green-700"
          }`}
          onClick={() => setActiveTab("analysis")}
        >
          Waste Analysis
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "holdings" ? "bg-green-800" : "hover:bg-green-700"
          }`}
          onClick={() => setActiveTab("holdings")}
        >
          Waste Holdings
        </button>
      </div>
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
    </nav>
  );
}

export default Navbar;
