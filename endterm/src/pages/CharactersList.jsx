import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/CharactersList.css";
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    loadCharacters,
    loadNextPage,
    deleteCharacter, toggleFavouriteAsync
} from "../slices/itemsSlice.js";
import { useTranslation } from "react-i18next";
import SearchBar from "../components/SearchBar.jsx";
import FiltersBar from "../components/FiltersBar";

const CharactersList = () => {
    const [filterMode, setFilterMode] = useState("all");
    const [category, setCategory] = React.useState('');
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q') || '';
    const dispatch = useDispatch();
    const { characters, favourites, loading } = useSelector(state => state.items);
    const { t } = useTranslation();


    useEffect(() => {
        dispatch(loadCharacters(search));
    }, [dispatch, search]);

    const handleMore = () => {
        dispatch(loadNextPage());
    };

    let filtered = filterMode === "all" ? characters : favourites;

    // if (search) {
    //     filtered = filtered.filter(c =>
    //         c.name.toLowerCase().includes(search.toLowerCase())
    //     );
    // }

    if (category && category !== "all species") {
        filtered = filtered.filter(c =>
            (c.species_name || "Unknown") === category
        );
    }

    const visibleCharacters = filtered;

    if (loading && characters.length === 0) return <p>{t("loading")}</p>;

    return (
        <div>
            <div className="filters">
                {/*<button onClick={() => setFilterMode( prev => prev === 'favorite' ? 'all' : 'favorite' )}>*/}
                {/*    {filterMode === 'favorites' ? 'show all characters' : 'show favorites'}*/}
                {/*</button>*/}

                <div className="controls">
                    <FiltersBar
                        className="filters"
                        category={category}
                        onChangeCategory={setCategory}
                    />
                </div>
                <SearchBar />
            </div>

            <div className="character-list">
                {visibleCharacters.map((c) => {
                    const isLiked = favourites.some(f => f.id === c.id);

                    return (
                    <Link key={c.id} to={`/character/${c.id}`} className="character-card">
                        <div className="character-list-item">

                            <div className="icons">
                                <button
                                    className={`like ${isLiked ? "liked" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(toggleFavouriteAsync(c));
                                    }}
                                >
                                    {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
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

                            <h2 className="characterName">{c.name}</h2>
                            <p className="character-gender">{t("gender")}: {c.gender}</p>
                            <p className="character-birthYear">{t("birthYear")}: {c.birth_year}</p>
                        </div>
                    </Link>

                );
                })}
            </div>

            <button className="moreButton" onClick={handleMore}>
                {t("more")}
            </button>
        </div>
    );
};

export default CharactersList;
