
import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import api from "../services/api";
import {
  Package,
  IndianRupee,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

import "../styles/dashboard.css";

function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalSales: 0,
    lowStock: 0,
  });

  useEffect(() => {
    setLoading(true);

    api.get("/dashboard")
      .then((res) => {
         setStats(res.data);
         setError("");
      })
      .catch(() => {
        setError("Failed to load dashboard data.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, []);

  useEffect(() => {
    api.get("/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
        return (
        <div className="loading-container">
            <h2>Loading Dashboard...</h2>
        </div>
    );
  }


  if (error) {
        return (
        <div className="error-container">
            <h2>{error}</h2>
        </div>
    );
  }

  return (
    <>
    
      <h1 className="dashboard-title">Dashboard</h1>

        <div className="dashboard-cards">

          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Package size={42} />}
          />

          <StatCard
            title="Total Revenue"
            value={`₹ ${stats.totalRevenue}`}
            icon={<IndianRupee size={42} />}
          />

          <StatCard
            title="Total Sales"
            value={stats.totalSales}
            icon={<TrendingUp size={42} />}
          />

          <StatCard
            title="Low Stock"
            value={stats.lowStock}
            icon={<AlertTriangle size={42} />}
          />

        </div>


    </>
  );
}

export default Dashboard;



      /* <div className="dashboard-cards">

        <div className="dashboard-card">
          <div>
            <h4>Total Products</h4>
            <h2>{stats.totalProducts}</h2>
          </div>
          <Package size={42} />
        </div>

        <div className="dashboard-card">
          <div>
            <h4>Total Revenue</h4>
            <h2>₹ {stats.totalRevenue}</h2>
          </div>
          <IndianRupee size={42} />
        </div>

        <div className="dashboard-card">
          <div>
            <h4>Total Sales</h4>
            <h2>{stats.totalSales}</h2>
          </div>
          <TrendingUp size={42} />
        </div>

        <div className="dashboard-card">
          <div>
            <h4>Low Stock</h4>
            <h2>{stats.lowStock}</h2>
          </div>
          <AlertTriangle size={42} />
        </div> */

      /* </div> */