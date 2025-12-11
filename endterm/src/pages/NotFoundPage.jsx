import React from 'react';
import {useNavigate} from "react-router-dom";
import  "../styles/NotFoundPage.css";
import {useTranslation} from "react-i18next";

export default function NotFoundPage () {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="not-found-page">
            <button className="not-found-page-back-button" onClick={() =>navigate(-1)}>{t("Go back")}</button>
            <br />
            <img className="not-found-page-image" src="https://http.cat/images/404.jpg" alt="404 http cat"/>
        </div>
    )
}
