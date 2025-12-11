import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/authSlice.js";
import { mergeFavoritesOnLogin } from "../slices/itemsSlice.js";
import { useTranslation } from "react-i18next";
import '../styles/Login.css';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginUser({ email, password }));
        if (res.meta.requestStatus === "fulfilled") {
            const uid = res.payload.uid;
            await dispatch(mergeFavoritesOnLogin(uid));
            alert(t("favoritesMerged")); // add this key if you want to translate the alert
            navigate("/profile");
        }
    };

    return (
        <div className="login">
            <h2>{t("login")}</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>{t("loggingIn")}</p>}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? t("loggingIn") : t("login")}
                </button>
            </form>

            <p className="text-center text-sm">
                {t("noAccount")}
                <Link to={"/signup"} className="hover:underline font-bold">
                    {t("signup")}
                </Link>
            </p>

            {/*<p>{t("or")}</p>*/}

            {/*<button>{t("emailSignIn")}</button>*/}
        </div>
    );
}
