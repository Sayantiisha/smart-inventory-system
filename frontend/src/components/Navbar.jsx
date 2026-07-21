import {
  Search,
  Bell,
  Moon,
  UserCircle
} from "lucide-react";

import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <Moon size={20} />
        </button>

        <button className="icon-btn">
          <Bell size={20} />
        </button>

        <div className="profile">
          <UserCircle size={34} />
          <div>
            <h4>Sayanti</h4>
            <small>Admin</small>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;