import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../slices/authSlice.js";
import { useTranslation } from "react-i18next";
import '../styles/Signup.css';

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState("");
    const { t } = useTranslation();

    const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const validatePassword = (p) =>
        p.length >= 8 && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) return setValidationErrors(t("invalidEmail"));
        if (!validatePassword(password)) return setValidationErrors(t("invalidPassword"));
        if (password !== repeatPassword) return setValidationErrors(t("passwordsMustMatch"));
        setValidationErrors("");
        const res = await dispatch(signUpUser({ email, password }));
        if (res.meta.requestStatus === "fulfilled") navigate("/profile");
    };

    return (
        <div className="signup">
            <h2>{t("signup")}</h2>

            {validationErrors && <p style={{ color: "red" }}>{validationErrors}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>{t("loading")}</p>}

            <form onSubmit={handleSignup}>
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

                <input
                    type="password"
                    placeholder={t("repeatPassword")}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />

                <button type="submit">
                    {loading ? t("signingUp") : t("signup")}
                </button>
            </form>

            <p>
                {t("alreadyHaveAccount")}{" "}
                <Link to="/login">{t("login")}</Link>
            </p>
        </div>
    );
}
