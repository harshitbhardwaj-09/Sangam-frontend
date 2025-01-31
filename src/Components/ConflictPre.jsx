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

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ConflictPredPage = () => {
  const initialFields = {
    task_priority: "",
    task_complexity: "",
    resources_allocated: "",
    communication_frequency: "",
    resource_utilization: "",
    complexity_to_priority_ratio: "",
    adjusted_frequency: "",
    delay_factor: "",
    site_location: "",
    department: "",
  };

  const [formData, setFormData] = useState(initialFields);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_BACKEND_ML}/predict_conflict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setResult(data);

      // Update chart data dynamically based on response
      if (data && data.chart_values) {
        setChartData({
          labels: data.chart_labels || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Task Complexity vs Conflict Likelihood",
              data: data.chart_values,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.3,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch prediction. Please try again.");
    }
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Months" } },
      y: { title: { display: true, text: "Conflict Likelihood" }, beginAtZero: true },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      {/* Header Section */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Conflict Prediction</h1>
        <p className="text-gray-400 mt-2">Provide details to predict conflict likelihood and resolution</p>
      </header>

      {/* Form Section */}
      <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key, index) => (
            <div key={key} className="flex flex-col col-span-1">
              <label htmlFor={key} className="text-gray-400 capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <input
                type={key === "site_location" || key === "department" ? "text" : "number"}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="mt-1 p-2 bg-gray-700 text-white rounded-md"
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
                required
              />
            </div>
          ))}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md w-full mt-4"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Result Display */}
        {result && (
          <div className="mt-6 bg-gray-700 p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold">Prediction Result:</h2>
            <pre className="text-gray-300 mt-2">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Line Chart Section */}
      {chartData && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-center mb-4">Task Complexity vs Conflict Likelihood</h2>
          <div className="bg-gray-700 p-4 rounded-lg shadow max-w-6xl mx-auto">
            <Line data={chartData} options={chartOptions} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ConflictPredPage;
