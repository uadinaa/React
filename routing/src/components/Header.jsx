import { Link } from "react-router-dom";
import { FaInfoCircle, FaImages, FaSignInAlt } from "react-icons/fa";
import '../styles/Header.css';

export default function Header() {
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
                <Link to="/gallery" className="header-link">
                    <FaImages className="icon" /> Gallery
                </Link>
                <Link to="/login" className="header-link">
                    <FaSignInAlt className="icon" /> Login
                </Link>
            </nav>
        </header>
    );
}
