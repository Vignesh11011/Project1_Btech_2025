import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Navbar from "../Components/Navbar";
import { supabase } from "../supabase_client";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"]; 
// Plastic, Cotton, Paper, Food, Metal

function Analysis() {
  const { nodeId } = useParams();
  const navigate = useNavigate();

  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegion = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("Garbage_collection_DB")
        .select(
          'id, Region_name, Plastic_items, Cotton_items, Paper_items, Food_and_misc, "Metal_items(iron)"'
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

    fetchRegion();
  }, [nodeId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!region) return <div className="p-6">Invalid Node ID</div>;

  // ✅ Grouped values
  const bioValue =
    (region.Cotton_items || 0) +
    (region.Paper_items || 0) +
    (region.Food_and_misc || 0);

  const nbdValue =
    (region.Plastic_items || 0) + (region["Metal_items(iron)"] || 0);

  // ✅ Bar chart data (2 bars: BD, NBD)
  const barData = [
    { name: "Biodegradable", value: bioValue },
    { name: "Non-Biodegradable", value: nbdValue },
  ];

  // ✅ Pie chart data (all categories separately)
  const pieData = [
    { name: "Plastic (NBD)", key: "Plastic_items", value: region.Plastic_items || 0 },
    { name: "Cotton (BD)", key: "Cotton_items", value: region.Cotton_items || 0 },
    { name: "Paper (BD)", key: "Paper_items", value: region.Paper_items || 0 },
    { name: "Food & Misc (BD)", key: "Food_and_misc", value: region.Food_and_misc || 0 },
    { name: "Metal (NBD)", key: "Metal_items(iron)", value: region["Metal_items(iron)"] || 0 },
  ];

  // ✅ Find highest and lowest
  const sorted = [...pieData].sort((a, b) => b.value - a.value);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  // ✅ Suggestion 2 logic
  let suggestion2 = "";
  if (highest.key === "Food_and_misc") {
    suggestion2 =
      "As the wastage is organic there is a need of regular cleaning of deposits as it may lead to contamination and foul smell if left for long.";
  } else if (highest.key === "Plastic_items" || highest.key === "Metal_items(iron)") {
    suggestion2 =
      "As the wastage is of reusable class further assessment is required so this region can give more reusable materials.";
  } else {
    suggestion2 =
      "As waste is biodegradable disposal or cross-check for reusability can be beneficial.";
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

        <h1 className="text-2xl font-bold mb-6">Analysis for {region.Region_name}</h1>

        {/* Region-level Analysis */}
        <h2 className="text-xl font-semibold mb-4">Region Analysis</h2>
        <div className="flex flex-col md:flex-row gap-10 mb-10">
          {/* Bar Chart (BD vs NBD) */}
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

          {/* Pie Chart (all categories, legend outside) */}
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
              />
            </PieChart>
          </div>
        </div>

        {/* ✅ Suggestions Section */}
        <div className="bg-white p-6 rounded shadow mt-8">
          <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              This region has high amount of <b>{highest.name}</b> deposits.
            </li>
            <li>{suggestion2}</li>
            <li>
              This region has low <b>{lowest.name}</b> deposits.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
