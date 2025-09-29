import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import dummyRegions from "../data/dummyRegions"; // ✅ Import dummy data

function Home() {
  const [activeTab, setActiveTab] = useState("analysis");
  const [selectedRegion, setSelectedRegion] = useState(dummyRegions[0].id);
  const navigate = useNavigate();

  const region = dummyRegions.find((r) => r.id === parseInt(selectedRegion));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-6">
        {/* Region Selector */}
        <div className="mb-6 flex items-center space-x-4">
          <label className="font-medium text-gray-700">Select Region:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {dummyRegions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Region Summary */}
        <h2 className="text-xl font-semibold mb-4">Region Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 text-left">Node ID</th>
                <th className="px-4 py-2 text-left">Node Name</th>
                <th className="px-4 py-2 text-left">Total Accumulation (NBD)</th>
                <th className="px-4 py-2 text-left">Total Accumulation (BD)</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 align-middle">{region.id}</td>
                <td className="px-4 py-2 align-middle">{region.name}</td>
                <td className="px-4 py-2 align-middle">{region.nbd}</td>
                <td className="px-4 py-2 align-middle">{region.bd}</td>
                <td className="px-4 py-2 align-middle">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    onClick={() => navigate(`/analysis/${region.id}`)}
                  >
                    Analyze
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sub Regions */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Sub Regions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 text-left">Node ID</th>
                <th className="px-4 py-2 text-left">Node Name</th>
                <th className="px-4 py-2 text-left">Total Accumulation (NBD)</th>
                <th className="px-4 py-2 text-left">Total Accumulation (BD)</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {region.subRegions.map((sub) => (
                <tr className="border-t" key={sub.id}>
                  <td className="px-4 py-2 align-middle">{sub.id}</td>
                  <td className="px-4 py-2 align-middle">{sub.name}</td>
                  <td className="px-4 py-2 align-middle">{sub.nbd}</td>
                  <td className="px-4 py-2 align-middle">{sub.bd}</td>
                  <td className="px-4 py-2 align-middle">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      onClick={() => navigate(`/analysis/${sub.id}`)}
                    >
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
