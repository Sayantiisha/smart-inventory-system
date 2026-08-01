import {
  Search,
  UserCircle,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header className="navbar desktop-navbar">

        <span className="welcome-text">
          Welcome Smart Inventory System
        </span>

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="navbar-right">

          <div className="profile">
            <UserCircle size={34} />

            <button
              onClick={handleLogout}
              className="log-btn"
            >
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* Mobile Navbar */}
      <header className="mobile-navbar">

        <div className="mobile-title">
          Welcome Smart Inventory System
        </div>

        <div className="mobile-bottom">

          <button
            className="menu-btn"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>

          <button
            className="log-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>
    </>
  );
}

export default Navbar;