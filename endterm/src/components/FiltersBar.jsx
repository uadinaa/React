import React from "react";
import {useTranslation} from "react-i18next";

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

    const { t } = useTranslation();


    return(
        <div className="filters">

            <div className="control filter-select">
                <select
                    id="style"
                    value={category}
                    onChange={e => onChangeCategory(e.target.value)}>

                    {CATEGORIES.map(c => (
                        <option key={c} value={c}>
                            {c === "all species" ? t("all species") : c}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}