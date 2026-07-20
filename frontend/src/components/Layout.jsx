// import "./../styles/layout.css";
// import Sidebar from "./sidebar";
// import Navbar from "./Navbar";
// import Dashboard from "../pages/Dashboard";
// import Prediction from "../pages/Prediction";


// function Layout() {
//     return (
//         <div className="layout">
//             <Sidebar/>

//         <div className="main-content">
//             <Navbar/>

//         <div className="dashboard">
//             <Prediction/>

//         <div className="dashboard">
//             <Dashboard/>

//         <div className="dashboard">
//             <h1>Dashboard</h1>

//             <div className="cards">
//                 <div className="card">
//                     <h3>Total Products</h3>
//                     <h2>0</h2>
//                 </div>

//                 <div className="card">
//                     <h3>Total Sales</h3>
//                     <h2>0</h2>
//                 </div>

//                 <div className="card">
//                     <h3>Inventory Value</h3>
//                     <h2>₹0</h2>
//                 </div>

//                 </div>
//             </div>
//         </div>
//     </div>
//     </div>
//     </div>
    
//     )
// }

// export default Layout;

import { Outlet } from "react-router-dom";

import Sidebar from "./sidebar";
import Navbar from "./Navbar";

import "../styles/layout.css";
import "../styles/dashboard.css";

function Layout() {
    return (
        <div className="layout">
            <Sidebar />

            <div className="main-content">
                <Navbar />

                <div className="dashboard">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;