import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite, deleteCharacter } from "../slices/itemsSlice.js";
import { useTranslation } from "react-i18next";

export default function FavoritesList() {
    const dispatch = useDispatch();
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
                    <Link key={c.id} to={`/character/${c.id}`} className="character-card">
                        <div className="character-list-item">
                            <div className="icons">
                                <button
                                    className="like liked"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(toggleFavourite(c));
                                    }}
                                >
                                    <AiFillHeart />
                                </button>

                                <button
                                    className="delete"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(deleteCharacter(c.id));
                                    }}
                                >
                                    <AiOutlineDelete className="trash-outline" />
                                    <AiFillDelete className="trash-fill" />
                                </button>
                            </div>

                            <h2>{c.name}</h2>
                            <p><strong>{t("gender")}:</strong> {c.gender}</p>
                            <p><strong>{t("birthYear")}:</strong> {c.birth_year}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
