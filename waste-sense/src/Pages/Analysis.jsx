import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Navbar from "../Components/Navbar";
import dummyRegions from "../data/dummyRegions";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF69B4", "#7CFC00"];

function Analysis() {
  const { nodeId } = useParams();
  const navigate = useNavigate();

  let region = null;
  let subRegion = null;

  // Find node
  for (let r of dummyRegions) {
    if (String(r.id) === nodeId) {
      region = r;
      break;
    }
    const foundSub = r.subRegions.find((sub) => sub.id === nodeId);
    if (foundSub) {
      region = r;
      subRegion = foundSub;
      break;
    }
  }

  const node = subRegion || region;
  if (!node) return <div className="p-6">Invalid Node ID</div>;

  // Region-level data (NBD vs BD)
  const regionPieData = [
    { name: "Non-Biodegradable", value: region.nbd },
    { name: "Biodegradable", value: region.bd },
  ];

  // Subregion-level category data
  const categories = subRegion ? { ...subRegion.categories.nbd, ...subRegion.categories.bd } : {};
  const subPieData = Object.entries(categories).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeTab="analysis" setActiveTab={() => {}} />

      <div className="p-6">
        <button
          className="mb-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>

        <h1 className="text-2xl font-bold mb-2">Analysis for {node.name}</h1>

        {subRegion && (
          <p className="text-gray-600 mb-6">
            Region: {region.name} → Subregion: {subRegion.name}
          </p>
        )}

        {/* Region-level Analysis */}
        <h2 className="text-xl font-semibold mb-4">Region Analysis</h2>
        <div className="flex flex-col md:flex-row gap-10 mb-10">
          <BarChart width={500} height={300} data={[{ name: region.name, NBD: region.nbd, BD: region.bd }]} className="bg-white p-4 rounded shadow">
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="NBD" fill="#0088FE" />
            <Bar dataKey="BD" fill="#00C49F" />
          </BarChart>

          <PieChart width={400} height={300}>
            <Pie data={regionPieData} cx={200} cy={150} innerRadius={50} outerRadius={100} fill="#8884d8" dataKey="value" label>
              {regionPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Subregion-level Analysis */}
        {subRegion && (
          <>
            <h2 className="text-xl font-semibold mb-4">Subregion Analysis</h2>
            <div className="flex flex-col md:flex-row gap-10">
              <PieChart width={400} height={300}>
                <Pie data={subPieData} cx={200} cy={150} outerRadius={100} fill="#8884d8" dataKey="value" label>
                  {subPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Analysis;
