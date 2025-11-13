import React from 'react';
import { iiifImageUrl } from '../api.js';
import '../styles/ArtworkCard.css';
import {Link} from "react-router-dom";

export default function ArtworkCard({ item, iiifUrl }) {
    const src = iiifImageUrl(iiifUrl, item.image_id, 400);

    return (
        <Link to={`/artwork/${item.id}`} className="artwork-card">
                <div className="image-container">
                    {src ? <img src={src} alt={item.title} /> : <div className="placeholder">No Image</div>}
                </div>

                <div className="content">

                    <div className="header">
                        <h3 className="title">{item.title}</h3>
                        <span className="year">{item.date_display ?? 'n.d.'}</span>
                    </div>

                    <p className="artist">{item.artist_title ?? 'Unknown artist'}</p>
                    {/*<SafeDescription html={item.description} />*/}
                </div>
        </Link>
    );
}




