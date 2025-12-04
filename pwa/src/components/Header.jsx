import { Link } from "react-router-dom";
import { FaInfoCircle, FaImages, FaUserCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import '../styles/Header.css';
import { useSelector } from "react-redux";

export default function Header() {
    const user = useSelector((state) => state.auth.user);

    return (
        <header className="header">
            <div className="header-left">
                <img
                    src="https://api.artic.edu/docs/assets/logo.svg"
                    alt="Museum"
                    className="header-logo"
                />
                <h1 className="header-title">Art Institute Explorer</h1>
            </div>

            <nav className="header-nav">

                <Link to="/about" className="header-link">
                    <FaInfoCircle className="icon" /> About
                </Link>

                {!user ? (
                    <>
                        <Link to="/login" className="header-link login-link">
                            <FaSignInAlt className="icon" /> Login
                        </Link>
                        <Link to="/signup" className="header-link signup-link">
                            <FaUserPlus className="icon" /> Signup
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/gallery" className="header-link">
                            <FaImages className="icon" /> Gallery
                        </Link>

                        <Link to="/profile" className="header-link profile-link">
                            <FaUserCircle className="icon" /> Profile
                        </Link>
                    </>
                    )
                }
            </nav>
        </header>
    );
}
