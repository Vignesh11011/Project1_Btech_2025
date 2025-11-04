import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { RotateCw } from "lucide-react"; // for refresh icon
import Navbar from "../Components/Navbar";
import { supabase } from "../supabase_client";

// Color mapping for all waste types
const COLORS = {
  Plastic_items: "#0088FE",
  "Metal_items(iron)": "#00C49F",
  Battery: "#A52A2A",
  Glass: "#808080",
  Cotton_items: "#FFBB28",
  Paper_items: "#FF8042",
  Food_and_misc: "#ADFF2F",
  Cardboard: "#D2691E",
  Wood: "#8B4513",
};

function Analysis() {
  const { nodeId } = useParams();
  const navigate = useNavigate();

  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRegion = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Garbage_collection_DB")
      .select(
        `id, Region_name, Plastic_items, Cotton_items, Paper_items, Food_and_misc, 
         "Metal_items(iron)", Battery, Cardboard, Wood, Glass`
      )
      .eq("id", nodeId)
      .single();

    if (error) {
      console.error("Error fetching region:", error);
    } else {
      setRegion(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRegion();
  }, [nodeId]);

  // 🔁 Refresh data without reloading page
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRegion();
    setTimeout(() => setRefreshing(false), 800);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!region) return <div className="p-6">Invalid Node ID</div>;

  // ✅ Calculate BD & NBD values
  const bioValue =
    (region.Cotton_items || 0) +
    (region.Paper_items || 0) +
    (region.Food_and_misc || 0) +
    (region.Cardboard || 0) +
    (region.Wood || 0);

  const nbdValue =
    (region.Plastic_items || 0) +
    (region["Metal_items(iron)"] || 0) +
    (region.Battery || 0) +
    (region.Glass || 0);

  const barData = [
    { name: "Biodegradable", value: bioValue },
    { name: "Non-Biodegradable", value: nbdValue },
  ];

  // ✅ Pie data with all 10 categories
  const pieData = [
    { name: "Plastic (NBD)", key: "Plastic_items", value: region.Plastic_items || 0 },
    { name: "Metal (NBD)", key: "Metal_items(iron)", value: region["Metal_items(iron)"] || 0 },
    { name: "Battery (NBD)", key: "Battery", value: region.Battery || 0 },
    { name: "Glass (NBD)", key: "Glass", value: region.Glass || 0 },
    { name: "Cotton (BD)", key: "Cotton_items", value: region.Cotton_items || 0 },
    { name: "Paper (BD)", key: "Paper_items", value: region.Paper_items || 0 },
    { name: "Food & Misc (BD)", key: "Food_and_misc", value: region.Food_and_misc || 0 },
    { name: "Cardboard (BD)", key: "Cardboard", value: region.Cardboard || 0 },
    { name: "Wood (BD)", key: "Wood", value: region.Wood || 0 },
  ];

  const sorted = [...pieData].sort((a, b) => b.value - a.value);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  let suggestion2 = "";
  if (highest.key === "Food_and_misc") {
    suggestion2 =
      "As the wastage is organic, regular cleaning is required as it may lead to contamination or foul smell.";
  } else if (
    ["Plastic_items", "Metal_items(iron)", "Battery", "Glass"].includes(highest.key)
  ) {
    suggestion2 =
      "As the waste is reusable or recyclable, this region can be assessed for resource recovery or recycling.";
  } else {
    suggestion2 =
      "As waste is biodegradable, regular collection or composting can be beneficial.";
  }

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

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Analysis for {region.Region_name}</h1>

          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ${
              refreshing ? "animate-spin-slow" : ""
            }`}
          >
            <RotateCw size={18} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* Region-level Analysis */}
        <h2 className="text-xl font-semibold mb-4">Region Analysis</h2>
        <div className="flex flex-col md:flex-row gap-10 mb-10">
          {/* Bar Chart */}
          <BarChart
            width={500}
            height={300}
            data={barData}
            className="bg-white p-4 rounded shadow"
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>

          {/* Pie Chart */}
          <div className="flex flex-col items-center">
            <PieChart width={500} height={300}>
              <Pie
                data={pieData}
                cx={200}
                cy={150}
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.key] || "#8884d8"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Region Material Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2 text-left">Region Name</th>
                  {pieData.map((item) => (
                    <th key={item.key} className="px-4 py-2 text-left">
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2 align-middle">{region.Region_name}</td>
                  {pieData.map((item) => (
                    <td key={item.key} className="px-4 py-2 align-middle">
                      {item.value}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white p-6 rounded shadow mt-8">
          <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              This region has a high amount of <b>{highest.name}</b> deposits.
            </li>
            <li>{suggestion2}</li>
            <li>
              This region has the lowest <b>{lowest.name}</b> deposits.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
