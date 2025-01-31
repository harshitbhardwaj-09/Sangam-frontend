import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnomalyDetectionPage = () => {
  const [taskPriority, setTaskPriority] = useState(4);
  const [taskComplexity, setTaskComplexity] = useState(7);
  const [communicationFrequency, setCommunicationFrequency] = useState(3);
  const [historicalDelay, setHistoricalDelay] = useState(10);
  const [timeDifference, setTimeDifference] = useState(5);
  const [resourceAllocationRatio, setResourceAllocationRatio] = useState(0.75);
  const [siteLocationEncoded, setSiteLocationEncoded] = useState(1);
  const [departmentEncoded, setDepartmentEncoded] = useState(2);
  const [predictionResult, setPredictionResult] = useState(null);

  const postAnomalyPrediction = async () => {
    const apiUrl = `https://${import.meta.env.VITE_BACKEND_ML}/predict_anomaly`;
    const data = {
      task_priority: taskPriority,
      task_complexity: taskComplexity,
      communication_frequency: communicationFrequency,
      historical_delay: historicalDelay,
      time_difference: timeDifference,
      resource_allocation_ratio: resourceAllocationRatio,
      site_location_encoded: siteLocationEncoded,
      department_encoded: departmentEncoded,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const result = await response.json();
      console.log("Prediction Result:", result); // Debugging API response
      setPredictionResult(result);
    } catch (error) {
      console.error("Failed to fetch anomaly prediction:", error);
    }
  };

  const chartData = {
    labels: predictionResult?.details ? Object.keys(predictionResult.details) : [],
    datasets: [
      {
        label: "Prediction Details",
        data: predictionResult?.details
          ? Object.values(predictionResult.details)
          : [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curve
        pointRadius: 5,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center mb-8">Anomaly Detection</h1>

        {/* Form Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block mb-1">Task Priority:</label>
            <input
              type="number"
              value={taskPriority}
              onChange={(e) => setTaskPriority(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Task Complexity:</label>
            <input
              type="number"
              value={taskComplexity}
              onChange={(e) => setTaskComplexity(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Communication Frequency:</label>
            <input
              type="number"
              value={communicationFrequency}
              onChange={(e) =>
                setCommunicationFrequency(Number(e.target.value))
              }
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Historical Delay:</label>
            <input
              type="number"
              value={historicalDelay}
              onChange={(e) => setHistoricalDelay(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Time Difference:</label>
            <input
              type="number"
              value={timeDifference}
              onChange={(e) => setTimeDifference(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Resource Allocation Ratio:</label>
            <input
              type="number"
              value={resourceAllocationRatio}
              onChange={(e) =>
                setResourceAllocationRatio(Number(e.target.value))
              }
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Site Location Encoded:</label>
            <input
              type="number"
              value={siteLocationEncoded}
              onChange={(e) => setSiteLocationEncoded(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Department Encoded:</label>
            <input
              type="number"
              value={departmentEncoded}
              onChange={(e) => setDepartmentEncoded(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={postAnomalyPrediction}
            className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Prediction Result UI */}
      {predictionResult && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-md mt-8 w-full max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Prediction Result:</h2>
            <span
              className={`text-lg font-bold px-4 py-2 rounded-lg ${
                predictionResult?.prediction === "Normal"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {predictionResult?.prediction || "Unknown"}
            </span>
          </div>

          {/* Display Causes */}
          {predictionResult?.causes ? (
            <div className="mb-6">
              <h3 className="text-lg font-medium">Anomaly Causes:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {Object.entries(predictionResult.causes).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between bg-gray-700 p-3 rounded-lg"
                  >
                    <span className="capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No anomaly causes available.</p>
          )}

          {/* Graph Section */}
<div>
  <h3 className="text-lg font-medium">Graph Representation:</h3>
  <div className="bg-gray-700 p-4 rounded-lg mt-4">
    {predictionResult?.details ? (
      <Line data={chartData} />
    ) : (
      <p className="text-gray-400">No data available for the graph.</p>
    )}
  </div>
</div>
        </div>
      )}
    </div>
  );
};

export default AnomalyDetectionPage;
