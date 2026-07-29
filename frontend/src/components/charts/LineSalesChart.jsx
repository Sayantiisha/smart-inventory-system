
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineSalesChart({ data }) {

  const chartData = {
    labels: data.map((item) => item.month),

    datasets: [
      {
        label: "Monthly Sales",
        data: data.map((item) => item.sales),

        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",

        // Filler plugin এর জন্য fill কাজ করবে
        fill: true,

        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 1500,
    },

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Monthly Sales Trend",
        font: {
          size: 18,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h3>Monthly Sales Trend</h3>
        <p>No sales data available.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default LineSalesChart;