import {useState} from "react";
import "./index.css"
import "./Flipping.css"

function FlippingCard({ name, frontImg, backImg, description }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <li
            className={`card ${flipped ? "flip" : ""}`}
            onClick={() => setFlipped(!flipped)}
        >
            <div className="card-inner">
            {/* Front side */}
            <div
                className="front"
                style={{ backgroundImage: `url(${frontImg})`, width: "100%" }}>
                {/*<p className="record-value">{name}</p>*/}
                <div className="front-meta">
                    <p className="front-name">{name}</p>
                </div>
            </div>

            {/* Back side */}
            <div className="back">
                {/*<img src={backImg} alt={name} />*/}
                <img src={backImg} alt={name} />
                {/*style={{ width: "100%", height: "240px", objectFit: "cover" }}*/}
                <p className="back-name">{name}</p>
                <p className="back-description">{description}</p>
            </div>
            </div>
        </li>
    );
}

export default FlippingCard;