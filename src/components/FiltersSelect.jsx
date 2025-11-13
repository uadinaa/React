import React from "react";

const CATEGORIES = [
    '',
    'Impressionism',
    'Post-Impressionism',
    'Abstract',
    'Cubism',
    'Surrealism',
    'Baroque',
    'Renaissance'
];

export default function FiltersSelect (
    {
        category,
        onChangeCategory,
    }) {

    return(
        <div className="filters">

        <div className="control filter-select">
            <select
                id="style"
                value={category}
                onChange={e => onChangeCategory(e.target.value)}>

                {CATEGORIES.map(c => (
                <option key={c} value={c}> {c || 'all paintings'} </option>
                ))}
            </select>
        </div>
        </div>
    )
}