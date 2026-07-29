import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

            const handleLogin = () => {

            if (!email || !password) {
                setError("Please enter Email and Password.");
                return;
            }

            if (
                email === "admin@inventory.com" &&
                password === "admin@123"
            ) {
                setError("");

                localStorage.setItem("isLoggedIn", "true");

                navigate("/");
            } else {
                setError("Invalid Email or Password");
            }
        };

        
    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Smart Inventory</h1>

                <p>Login to continue</p>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
{/* 
                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(!showPassword)
                    }
                >

                    {showPassword ? "Hide" : "Show"}

                </button> */}

                {error && (
                    <p className="login-error">
                        {error}
                    </p>
                )}

                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

            </div>

        </div>
    );
}

export default Login;