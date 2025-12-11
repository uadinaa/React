import {FaSearch} from "react-icons/fa";
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('q') || '';

    const handleSearchChange = (e) => {
        const qe = e.target.value;
        if (qe) {
            setSearchParams({q: qe});
        }else{
            setSearchParams({});
        }
    };
    const handleClear = () => setSearchParams({});

    return (
        <div className="control search">
            <FaSearch aria-hidden="true" className="search-icon" />
            <input
                placeholder="search paintings"
                value={search}
                onChange={handleSearchChange}
            />
            <button
                className="clear"
                onClick={handleClear} disabled={!search}>x</button>
        </div>
    );
}