import React from "react";

const CATEGORIES = [
    'all species',
    'Droid',
    'Wookie',
    'Hut',
    'Rodian',
    'Yoda\'s species',
    'Trandoshan',
    'Mon Calamari',
    'Ewok',
    'Sullustan',
];

export default function FiltersBar (
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
                        <option key={c} value={c}> {c || 'all species'} </option>
                    ))}
                </select>
            </div>
        </div>
    )
}