import {
  Search,
  Bell,
  Moon,
  UserCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
          navigate("/login", {replace:true});
    };

    const user = localStorage.getItem("user");

  return (
    <header className="navbar">
      <span
    style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#374151",
        marginLeft: "20px"
    }}
>
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
          <div>
            {/* <h4>Sayanti</h4>
            <small>Admin</small> */}
                  <button onClick={handleLogout} className="log-btn">
                 Logout 
               
            </button>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;