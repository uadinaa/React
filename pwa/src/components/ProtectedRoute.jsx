// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//     const { user } = useAuth();

//     if (!user) return <Navigate to="/login" replace />;

//     return children;
// }

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
    const user = useSelector((state) => state.auth.user);


    if (!user) return <Navigate to="/login" replace />;

    return children;
}
