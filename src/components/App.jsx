import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function App() {
    return (
        <div>
            <Header />
            <main style={{ padding: "20px" }}>
                <Outlet /> {}
            </main>
        </div>
    );
}
