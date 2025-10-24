import React from 'react';
import { iiifImageUrl } from '../api.js';
import '../styles/ArtworkCard.css';
import DOMPurify from "dompurify";

export default function ArtworkCard({ item, iiifUrl }) {
    const src = iiifImageUrl(iiifUrl, item.image_id, 400);

    return (
        <article className="artwork-card">

            <div className="image-container">
                {src ? <img src={src} alt={item.title} /> : <div className="placeholder">No Image</div>}
            </div>

            <div className="content">

                <div className="header">
                    <h3 className="title">{item.title}</h3>
                    <span className="year">{item.date_display ?? 'n.d.'}</span>
                </div>

                <p className="artist">{item.artist_title ?? 'Unknown artist'}</p>
                <p className="style">style: {item.style_title ?? 'no style available'}</p>

                <SafeDescription html={item.description} />
            </div>

        </article>
    );
}

function SafeDescription({ html }) {
    const clean = React.useMemo(() => DOMPurify.sanitize(html || ""), [html]);
    return <div className="description" dangerouslySetInnerHTML={{ __html: clean || 'Description is unavailable.',}} />;
}


