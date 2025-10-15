import React, { useState } from "react";
import MemeCard from "./MemesCard.jsx";
import "./MemesList.css";
import { FaSearch } from "react-icons/fa";

export default function MemeList() {
    const [memes, setMemes] = useState([]);
    const [randomMeme, setRandomMeme] = useState([]);
    const [mode, setMode] = useState("none");
    const [search, setSearch] = useState("");

    const fetchMemes = async () => {
        try {
            const response = await fetch("/api");
            const data = await response.json();
            setMemes(data.data.memes);
            setRandomMeme([]);
            setSearch("");
            setMode("all");
        } catch (err) {
            console.error("Failed to fetch memes:", err);
        }
    };

    const fetchRandomMeme = () => {
        if (memes.length === 0) return;
        const random = memes[Math.floor(Math.random() * memes.length)];
        setRandomMeme(prev => [...prev, random]);
        setMode("random");
    };

    const resetMemes = () => {
        setRandomMeme([]);
        setSearch("");
        setMode("none");
    };

    const filteredMemes = memes.filter(m =>
        m.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="memeList">
            <button onClick={fetchMemes}>Load all Memes</button>
            <button onClick={fetchRandomMeme} disabled={!memes.length}>Load random Meme</button>

            {mode === "all" && (
                <div className="searchRow">
                    <FaSearch aria-hidden="true" />
                    <input
                        placeholder="Search for memes"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={() => setSearch("")} disabled={!search}>Clear</button>
                </div>
            )}

            <button onClick={resetMemes}>Start Over</button>

            {mode === "random" && (
                <ul>
                    {randomMeme.map((meme, index) => (
                        <MemeCard key={`${meme.id}-${index}`} name={meme.name} imageUrl={meme.url} />
                    ))}
                </ul>
            )}

            {mode === "all" && (
                <ul>
                    {filteredMemes.map((meme) => (
                        <MemeCard key={meme.id} name={meme.name} imageUrl={meme.url} />
                    ))}
                </ul>
            )}
        </div>
    );
}
