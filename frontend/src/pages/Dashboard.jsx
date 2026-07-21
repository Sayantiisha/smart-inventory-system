// import { Package, IndianRupee, TrendingUp, AlertTriangle } from "lucide-react";
// import "../styles/dashboard.css";

// function Dashboard() {
//   return (
//     <>
//       <h1 className="dashboard-title">Dashboard</h1>

//       <div className="dashboard-cards">

//         <div className="dashboard-card">
//           <div>
//             <h4>Total Products</h4>
//             <h2>250</h2>
//           </div>

//           <Package size={42} />
//         </div>

//         <div className="dashboard-card">
//           <div>
//             <h4>Total Revenue</h4>
//             <h2>₹4,80,000</h2>
//           </div>

//           <IndianRupee size={42} />
//         </div>

//         <div className="dashboard-card">
//           <div>
//             <h4>Total Sales</h4>
//             <h2>820</h2>
//           </div>

//           <TrendingUp size={42} />
//         </div>

//         <div className="dashboard-card">
//           <div>
//             <h4>Low Stock</h4>
//             <h2>18</h2>
//           </div>

//           <AlertTriangle size={42} />
//         </div>

//       </div>

//     </>
//   );
// }

// export default Dashboard;



import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Package,
  IndianRupee,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

import "../styles/dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalSales: 0,
    lowStock: 0,
  });

  useEffect(() => {
    api.get("/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-cards">

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
        </div>

      </div>
    </>
  );
}

export default Dashboard;