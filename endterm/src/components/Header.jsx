import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "../styles/Header.css";
import { useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { Gi3dMeeple } from "react-icons/gi";

export default function Header() {
    const user = useSelector((state) => state.auth.user);
    const { t, i18n } = useTranslation();

    const imgSrc =
        user?.photoBase64 ??
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="home-link">
                    <h1 className="header-title">{t("Star War characters")}</h1>
                </Link>
            </div>

            <Link to="/characters" className="character-link">
                <Gi3dMeeple /> {t("Characters")}
            </Link>
            <Link to="/favorites" className="favorite-link">
                <AiFillHeart /> {t("Favorite characters")}
            </Link>

            {!user ? (
                <>
                    <Link to="/login" className="login-link">
                        <FaSignInAlt className="icon" /> {t("Login")}
                    </Link>
                    <Link to="/signup" className="signup-link">
                        <FaUserPlus className="icon" /> {t("Signup")}
                    </Link>
                </>
            ) : (
                <Link to="/profile" className="profile-link">
                    <img src={imgSrc} alt="profile" className="header-profile-img" />
                    {t("Profile")}
                </Link>
            )}

            <button onClick={() => i18n.changeLanguage("ru")}>RU</button>
            <button onClick={() => i18n.changeLanguage("en")}>EN</button>
        </header>
    );
}
