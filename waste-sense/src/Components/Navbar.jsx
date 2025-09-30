import React from "react";
import { supabase } from "../supabase_client.jsx";
import { useNavigate } from "react-router-dom";

function Navbar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth"); // redirect to login after signout
  };

  return (
    <nav className="bg-green-600 text-white flex items-center justify-between px-6 py-4 shadow-md">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        WasteSense
      </div>

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
          <a href="/garbbot" className="hover:underline">
            GarbBot
          </a>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white"
        >
          Sign Out
        </button>
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
