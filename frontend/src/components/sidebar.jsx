import { Link } from "react-router-dom";

import "../styles/sidebar.css";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2>Smart Inventory</h2>

            <ul>

                <li><Link to="/">🏠 Dashboard</Link></li>

                <li><Link to="/products">📦 Products</Link></li>

                <li><Link to="/analytics">📊 Analytics</Link></li>

                <li><Link to="/prediction">🤖 AI Prediction</Link></li>

            </ul>

        </div>

    );
}

export default Sidebar;