import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch(setUser(user ? { uid: user.uid, email: user.email } : null));
        });
        return () => unsub();
    }, [dispatch]);

    return (
        <div>
            <Header />
            <main style={{ padding: "20px" }}>
                <Outlet />
            </main>
        </div>
    );
}
