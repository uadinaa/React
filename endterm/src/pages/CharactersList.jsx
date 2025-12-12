import React, {useEffect, useMemo, useState} from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/CharactersList.css";
import { useDispatch, useSelector } from "react-redux";
import {
    loadCharacters,
    loadNextPage,
} from "../slices/itemsSlice.js";
import { useTranslation } from "react-i18next";
import SearchBar from "../components/SearchBar.jsx";
import FiltersBar from "../components/FiltersBar";
import Card from "../components/Card.jsx";

const CharactersList = () => {
    const [filterMode, setFilterMode] = useState("all");
    const [category, setCategory] = React.useState('');
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q') || '';
    const dispatch = useDispatch();
    const { characters, favourites, loading, hasMore } = useSelector(state => state.items);
    const { t } = useTranslation();


    useEffect(() => {
        dispatch(loadCharacters(search));
    }, [dispatch, search]);

    const handleMore = () => {
        dispatch(loadNextPage());
    };

    // let filtered = filterMode === "all" ? characters : favourites;
    // if (category && category !== "all species") {
    //     filtered = filtered.filter(c =>
    //         (c.species_name || "Unknown") === category
    //     );
    // }

    const visibleCharacters = useMemo(() => {
        let filtered = filterMode === "all" ? characters : favourites;
        if (category && category !== "all species") {
            filtered = filtered.filter(c =>
                (c.species_name || "Unknown") === category
            );
        }
        return filtered;
    }, [filterMode, category, characters, favourites]);

    // const visibleCharacters = filtered;
    if (loading && characters.length === 0) return <p>{t("loading")}</p>;
    return (
        <div>
            <div className="filters">

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
                {visibleCharacters.map((c) => (
                    <Card key={c.id} character={c} useAsync />
                ))}
            </div>

            <button className="moreButton" onClick={handleMore}>
                {t("more")}
            </button>
        </div>
    );
};

export default CharactersList;
