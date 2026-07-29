
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

function PieSalesChart({ data = [] }) {

  // =========================
  // CLEAN DATA
  // =========================

  const chartData = data
    .map((item) => ({
      category: item.category,
      sales: Number(item.sales) || 0,
    }))
    .filter((item) => item.sales > 0);


  // =========================
  // EMPTY DATA
  // =========================

  if (chartData.length === 0) {
    return (
      <div className="chart-container">
        <h2>Sales by Category</h2>

        <div className="empty-chart">
          <p>No category sales data available.</p>
        </div>
      </div>
    );
  }


  // =========================
  // PIE CHART
  // =========================

  return (
    <div className="chart-container">

      <h2>Sales by Category</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={chartData}
            dataKey="sales"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={0}
            paddingAngle={2}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
            labelLine={true}
          >

            {chartData.map((entry, index) => (

              <Cell
                key={`cell-${entry.category}-${index}`}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>


          <Tooltip
            formatter={(value) => [
              `₹ ${Number(value).toLocaleString()}`,
              "Sales",
            ]}
          />


          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PieSalesChart;