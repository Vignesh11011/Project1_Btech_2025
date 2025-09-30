import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { supabase } from "../supabase_client.jsx";

// ... same imports and code as before

function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Garbage_collection_DB").select("*");
    if (error) {
      console.error("Error reading values:", error);
      setLoading(false);
      return;
    }
    setList(data || []);

    const firstParent = (data || []).find((d) => Number(d.Parent_region_id) === -1);
    if (firstParent) setSelectedRegion(String(firstParent.id));
    else if ((data || []).length > 0) setSelectedRegion(String(data[0].id));

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTotals = (node) => {
    const plastic = Number(node?.Plastic_items || 0);
    const metal = Number(node?.["Metal_items(iron)"] || 0);
    const food = Number(node?.Food_and_misc || 0);
    const cotton = Number(node?.Cotton_items || 0);
    const paper = Number(node?.Paper_items || 0);

    const nbd = plastic + metal;
    const bd = cotton + paper;
    const organic = food;
    return { bd, nbd, organic };
  };

  const parentRegions = list.filter((r) => Number(r.Parent_region_id) === -1);
  const selectedRegionId = selectedRegion !== "" ? Number(selectedRegion) : null;
  const selectedRegionData = list.find((r) => Number(r.id) === selectedRegionId);
  const subRegions = list.filter((r) => Number(r.Parent_region_id) === selectedRegionId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar activeTab="analysis" setActiveTab={() => {}} />
        <div className="p-6">Loading regions…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeTab="analysis" setActiveTab={() => {}} />

      <div className="p-6">
        {/* Region Selector */}
        <div className="mb-6 flex items-center space-x-4">
          <label className="font-medium text-gray-700">Select Region:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {parentRegions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.Region_name}
              </option>
            ))}
            {parentRegions.length === 0 && <option value="">No parent regions found</option>}
          </select>
        </div>

        {/* Region Summary */}
        {selectedRegionData && (
          <>
            <h2 className="text-xl font-semibold mb-4">Region Summary</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded-lg">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Node ID</th>
                    <th className="px-4 py-2 text-left">Node Name</th>
                    <th className="px-4 py-2 text-left">NBD</th>
                    <th className="px-4 py-2 text-left">BD</th>
                    <th className="px-4 py-2 text-left">Organic</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const { bd, nbd, organic } = getTotals(selectedRegionData);
                    return (
                      <tr className="border-t">
                        <td className="px-4 py-2 align-middle">{selectedRegionData.id}</td>
                        <td className="px-4 py-2 align-middle">{selectedRegionData.Region_name}</td>
                        <td className="px-4 py-2 align-middle">{nbd}</td>
                        <td className="px-4 py-2 align-middle">{bd}</td>
                        <td className="px-4 py-2 align-middle">{organic}</td>
                        <td className="px-4 py-2 align-middle">
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                            onClick={() => navigate(`/analysis/${selectedRegionData.id}`)}
                          >
                            Analyze
                          </button>
                        </td>
                      </tr>
                    );
                  })()}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Sub Regions */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Sub Regions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 text-left">Node ID</th>
                <th className="px-4 py-2 text-left">Node Name</th>
                <th className="px-4 py-2 text-left">NBD</th>
                <th className="px-4 py-2 text-left">BD</th>
                <th className="px-4 py-2 text-left">Organic</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {subRegions.map((sub) => {
                const { bd, nbd, organic } = getTotals(sub);
                return (
                  <tr className="border-t" key={sub.id}>
                    <td className="px-4 py-2 align-middle">{sub.id}</td>
                    <td className="px-4 py-2 align-middle">{sub.Region_name}</td>
                    <td className="px-4 py-2 align-middle">{nbd}</td>
                    <td className="px-4 py-2 align-middle">{bd}</td>
                    <td className="px-4 py-2 align-middle">{organic}</td>
                    <td className="px-4 py-2 align-middle">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                        onClick={() => navigate(`/analysis/${sub.id}`)}
                      >
                        Analyze
                      </button>
                    </td>
                  </tr>
                );
              })}
              {subRegions.length === 0 && (
                <tr>
                  <td className="px-4 py-2 text-center text-gray-500" colSpan={6}>
                    No sub-regions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Note Section */}
        <div className="mt-6 p-4 bg-yellow-100 rounded shadow">
          <h3 className="font-semibold mb-2">Note:</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li><b>NBD</b> - Non-Biodegradable</li>
            <li><b>BD</b> - Biodegradable</li>
            <li><b>Organic</b> - Food/Organic Waste</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
