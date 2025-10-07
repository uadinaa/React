import React from 'react';
import './DogList.css';
import {useState} from "react";
import DogCard from './DogCard.jsx';

export default function DogList() {
    const [dogs, setDogs] = useState([]);

    const fetchDogs = async () => {
        try {
            const response = await fetch('/api');
            const data = await response.json();
            setDogs([...dogs, data.message]);
        } catch (err) {
            console.error('Failed to fetch dog:', err);
        }
    };

    const resetDogs = () => {
        setDogs([]);
    };

    return (
        <div className="dogList">
            <button onClick={fetchDogs}>random doggy</button>
            <button onClick={resetDogs}>start over</button>
            <ul>
                {dogs.map((dog, index) => (
                    <DogCard key={index} imageUrl={dog} />
                ))}
            </ul>
        </div>
    );
}
