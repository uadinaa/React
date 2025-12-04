import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css"
import {useDispatch, useSelector} from "react-redux";
import { setUser } from "../slices/authSlice.js";

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error} = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            dispatch(setUser(userCred.user));
            navigate("/profile");
        } catch (err) {
            console.log(err.message || "Unknown error");
        }
    };

    return (
        <div className="signup">
            <h2>Signup</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Loading...</p>}

            <form onSubmit={handleSignup}>
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

                <button type="submit">
                    {loading ? "Signing up" : "Signup"}
                </button>
            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

