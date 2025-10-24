import React from 'react';
import '../styles/App.css';
import FiltersSelect from "./FiltersSelect.jsx";
import Gallery from "./Gallery.jsx";
import {FaSearch} from "react-icons/fa";


export default function App() {
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('');

    return (
        <div className="App">
            <div className="main">
                <h1>Art Institute of Chicago</h1>

                <div className="controls">
                    <FiltersSelect
                        className="filters"
                        category={category}
                        onChangeCategory={setCategory}
                    />

                    <div className="control search">
                        <FaSearch aria-hidden="true" className="search-icon" />
                        <input
                            placeholder="search paintings"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button className="clear" onClick={() => setSearch("")} disabled={!search}>x</button>
                    </div>
                </div>

                <Gallery category={category} query={search}/>

            </div>
        </div>
    );
}