import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getById} from "../services/itemsService.js";
import { GoArrowLeft } from "react-icons/go";
import '../styles/CardDetails.css'
import { useTranslation } from "react-i18next";

export default function CharacterDetails() {
    const { id } = useParams();
    const [character, setCharacter] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [species, setSpecies] = useState([]);
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();


    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                if (!id) throw new Error("No id provided");

                let char;
                if (id.startsWith("local-")) {
                    const saved = JSON.parse(localStorage.getItem("newCharacter") || "[]");
                    const found = saved.find((c) => c.id === id);
                    if (!found) throw new Error("Local character not found");
                    char = found;
                } else {
                    const json = await getById(id);
                    char = json.data || json;
                }

                if (mounted) setCharacter(char);

                if (char.films && char.films.length > 0) {
                    const filmTitles = await Promise.all(
                        char.films.map(async (url) => {
                            const res = await fetch(url);
                            const data = await res.json();
                            return data.title;
                        })
                    );
                    if (mounted) setFilms(filmTitles);
                }

                if (char.species && char.species.length > 0) {
                    const speciesNames = await Promise.all(
                        char.species.map(async (url) => {
                            const res = await fetch(url);
                            const data = await res.json();
                            return data.name;
                        })
                    );
                    if (mounted) setSpecies(speciesNames);
                }

            } catch (err) {
                if (mounted) setError(err.message || "Failed to load character");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => { mounted = false; };
    }, [id]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{t("error")} {error.message}</p>;
    if (!character) return <p>{t("characterNotFound")}</p>;

    return (
        <section className="character-details">
            <button className="back-button" onClick={() => navigate(-1)}>
                <GoArrowLeft className="icon" /> {t("back")}
            </button>

            <h2 className="character-name"><strong>{character.name}</strong></h2>
            <h3 className="birth_year"><strong>{t("birthYear")}:</strong>: {character.birth_year}</h3>
            <h3 className="gender"><strong>{t("gender")}:</strong>: {character.gender}</h3>

            <div className="characterictic">
                <p>{t("height")}: {character.height}</p>
                <p>{t("mass")}: {character.mass}</p>
                <p>{t("hairColor")}: {character.hair_color}</p>
                <p>{t("skinColor")}: {character.skin_color}</p>
                <p>{t("eyeColor")}: {character.eye_color}</p>
            </div>

            <div className="species">
                <strong>{t("species")}:</strong>
                <ul>
                    {species.length > 0 ? species.map((s) => <li key={s}>{s}</li>) : <li>{t("unknown")}</li>}
                </ul>
            </div>

            <div className="films">
                <strong>{t("films")}:</strong>
                <ul>
                    {films.map((title) => (
                        <li key={title}>{title}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
