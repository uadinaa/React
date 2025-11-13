import React from 'react';
import '../styles/App.css';
import FiltersSelect from "./FiltersSelect.jsx";
import Gallery from "../pages/Gallery.jsx";
import SearchBar from "./SearchBar.jsx";
import { useSearchParams } from "react-router-dom";


export default function AppGallery() {
    const [category, setCategory] = React.useState('');
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q') || '';


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
                    <SearchBar />
                </div>
                <Gallery category={category} query={search}/>

            </div>
        </div>
    );
}