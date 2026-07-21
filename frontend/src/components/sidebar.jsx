import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Brain,
  Settings
} from "lucide-react";

import "../styles/sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Products",
      path: "/products",
      icon: <Package size={20} />
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} />
    },
    {
      name: "Prediction",
      path: "/prediction",
      icon: <Brain size={20} />
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />
    }
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">
        Smart<span>AI</span>
      </h2>

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={
              location.pathname === item.path ? "active" : ""
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;