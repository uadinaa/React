// import { useAuth } from "../context/AuthContext";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import "../styles/Profile.css"


// export default function Profile() {
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const logout = async () => {
//         await signOut(auth);
//         navigate("/login");
//     };

//     return (
//         <div className="profile-container">
//             <div className="profile-info">
//                 <h2>Your Profile</h2>

//                 <p><strong>Email:</strong> {user?.email}</p>

//                 <button className="logout" onClick={logout}>Logout</button>
//             </div>
//         </div>
//     );
// }



import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../slices/authSlice.js";
import "../styles/Profile.css"


export default function Profile() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <div className="profile-container">
            <div className="profile-info">
                <h2>Your Profile</h2>

                <p><strong>Email:</strong> {user?.email}</p>

                <button className="logout" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}
