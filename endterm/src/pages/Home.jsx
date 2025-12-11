import React from "react";
import { useTranslation } from "react-i18next";
import '../styles/Home.css';

export default function Home() {
    const { t } = useTranslation();

    return (
        <div>
            <div>
                <strong>{t("homeIntro")}</strong>
                <br />
                {t("homePeopleFilms")}
                <br />
                {t("homeSevenFilms")}
            </div>
        </div>
    );
}
