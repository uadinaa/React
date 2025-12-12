import React, {useCallback} from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavouriteAsync, toggleFavourite, deleteCharacter } from "../slices/itemsSlice.js";
import { useTranslation } from "react-i18next";

export default function Card({ character, useAsync = false }) {
    const dispatch = useDispatch();
    const { favourites } = useSelector(state => state.items);
    const { t } = useTranslation();
    const isLiked = favourites.some(f => f.id === character.id);

    const handleToggle = (e) => {
        e.preventDefault();
        if (useAsync) {
            dispatch(toggleFavouriteAsync(character));
        } else {
            dispatch(toggleFavourite(character));
        }
    };

    // const handleDelete = (e) => {
    //     e.preventDefault();
    //     dispatch(deleteCharacter(character.id));
    // };
    const handleDelete = useCallback((e) => {
        e.preventDefault();
        dispatch(deleteCharacter(character.id));
    }, [dispatch, character.id]);

    return (
        <Link to={`/character/${character.id}`} className="character-card">
            <div className="character-list-item">
                <div className="icons">
                    <button
                        className={`like ${isLiked ? "liked" : ""}`}
                        onClick={handleToggle}
                    >
                        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>

                    <button className="delete" onClick={handleDelete}>
                        <AiOutlineDelete className="trash-outline" />
                        <AiFillDelete className="trash-fill" />
                    </button>
                </div>

                <h2>{character.name}</h2>
                <p className="character-gender">{t("gender")}: {character.gender}</p>
                <p className="character-birthYear">{t("birthYear")}: {character.birth_year}</p>
            </div>
        </Link>
    );
}
