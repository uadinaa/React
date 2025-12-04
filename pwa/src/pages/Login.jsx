import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../slices/authSlice.js";


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error} = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigate("/profile");
        } catch (err) {
            console.log(err.message || "Unknown error");
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Loading...</p>}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>Don’t have an account? <Link to="/signup">Signup</Link></p>
        </div>
    );
}
