import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import api from "../services/api";

import {
Package,
IndianRupee,
TrendingUp,
AlertTriangle,
} from "lucide-react";

import "../styles/dashboard.css";
import LineSalesChart from "../components/charts/LineSalesChart";
import PieSalesChart from "../components/charts/PieSalesChart";

import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";



function Dashboard() {

// =========================
// State
// =========================

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");

const [stats, setStats] = useState(null);

const [monthlySales, setMonthlySales] = useState([]);

const [categorySales, setCategorySales] = useState([]);

const [lowStockCount, setLowStockCount] = useState(0) ;

// const navigate = useNavigate();



// =========================
// Fetch Dashboard Data
// =========================

useEffect(() => {

const fetchDashboardData = async () => {

  try {

    setLoading(true);

    // Fetch all dashboard APIs together
    const [
      statsRes,
      monthlyRes,
      categoryRes
    ] = await Promise.all([

      api.get("/dashboard/stats"),

      api.get("/dashboard/monthly-sales"),

      api.get("/dashboard/category-sales"),

    ]);



    // Low Stock Count

    const LowStockResponse = await api.get("/low-stock")

    setLowStockCount(LowStockResponse.data.length);

    // Store API responses

    setStats(statsRes.data);

    setMonthlySales(monthlyRes.data);

    setCategorySales(categoryRes.data);

    setError("");


  } catch (err) {

    console.error(
      "Dashboard Error:",
      err
    );

    setError(
      "Failed to load dashboard data."
    );


  } finally {

    setLoading(false);

  }

};


fetchDashboardData();


}, []);

// =========================
// Loading State
// =========================

if (loading) {


return (

  <div className="loading-container">

    <h2>
      Loading Dashboard...
    </h2>

  </div>

);


}

// =========================
// Error State
// =========================

if (error) {


return (

  <div className="error-container">

    <h2>
      {error}
    </h2>

  </div>

);


}


// =========================
// Export Category Sales CSV
// =========================

const exportCSV = () => {


// CSV Header
const rows = [
  ["Category", "Sales"],

  ...categorySales.map(
    (item) => [
      item.category,
      item.sales,
    ]
  ),
];


// Convert data to CSV format
const csvContent = rows
  .map((row) =>
    row
      .map((value) =>
        `"${String(value ?? "").replace(/"/g, '""')}"`
      )
      .join(",")
  )
  .join("\n");


// Create CSV Blob
const blob = new Blob(
  [csvContent],
  {
    type: "text/csv;charset=utf-8;",
  }
);


// Create Download URL
const url = URL.createObjectURL(blob);


// Create Download Link
const link = document.createElement("a");

link.href = url;

link.download = "category_sales.csv";


// Trigger Download
document.body.appendChild(link);

link.click();


// Cleanup
document.body.removeChild(link);

URL.revokeObjectURL(url);


};

// =========================
// Dashboard UI
// =========================

return (


<div className="dashboard-container">


  {/* =========================
      Dashboard Title
  ========================= */}

  <h1 className="dashboard-title">
    Dashboard
  </h1>


  {/* =========================
      Statistics Cards
  ========================= */}

  <div className="dashboard-cards">

    

    <StatCard
      title="Total Products"

      value={
        stats?.total_products ?? 0
      }

      icon={
        <Package size={42} />
      }
    />


    <StatCard
      title="Average Price"

      value={
        `₹ ${stats?.average_price ?? 0}`
      }

      icon={
        <IndianRupee size={42} />
      }
    />


    <StatCard
      title="Inventory Value"

      value={
        `₹ ${stats?.total_inventory_value ?? 0}`
      }

      icon={
        <TrendingUp size={42} />
      }
    />


    <StatCard
      title="Categories"

      value={
        stats?.total_categories ?? 0
      }

      icon={
        <AlertTriangle size={42} />
      }
    />


  </div>


  {/* =========================
      Export Button
  ========================= */}

  <div className="dashboard-actions"   style={{display: "flex", justifyContent:"space-between"}}>

    <button
      className="export-btn"
      onClick={exportCSV}
    >
      Export Category Sales CSV
    </button>


 <Link to="/sales-report">
      <button
    style={{
      padding: "10px 20px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    📋 View Sales Report
  </button>
  </Link>

  </div>


  {/* =========================
      Charts
  ========================= */}

  <div className="chart-row">


    {/* Monthly Sales Chart */}

      <LineSalesChart
        data={monthlySales}
      />


    {/* Category Sales Chart */}

      <PieSalesChart
        data={categorySales}
      />


  </div>

<div>
 
  {/* <div className="dashboard-card"
      onClick={() => navigate("/sales-report")}
      style={{ cursor: "pointer" }}>
      <h3>Sales Report</h3>
      <p>View all sales records</p>
    </div> */}


</div>

</div>

);

<div
    className="dashboard-card"
    onClick={() => navigate("/inventory-report")}
>

    <h3>Inventory Report</h3>

    <p>View Inventory Status</p>
    <div
    className="dashboard-card"
    onClick={() => navigate("/prediction")}
>

    <h3>Sales Prediction</h3>

    <p>Predict Future Sales using AI</p>

    <div
    className="dashboard-card"
    onClick={() => navigate("/low-stock")}
>

    <h3>Low Stock Alerts</h3>

    <h1>{lowStockCount}</h1>

    <p>Products Need Attention</p>

</div>

</div>

</div>

}

export default Dashboard;
