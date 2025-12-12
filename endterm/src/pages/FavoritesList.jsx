import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Card from "../components/Card.jsx";

export default function FavoritesList() {
    const { favourites } = useSelector(state => state.items);
    const { t } = useTranslation();

    if (favourites.length === 0) {
        return <p>{t("noFavorites")}</p>;
    }

    return (
        <div>
            <h2>{t("favoritesTitle")}</h2>
            <div className="character-list">
                {favourites.map((c) => (
                    <Card key={c.id} character={c} />
                ))}
            </div>
        </div>
    );
}
