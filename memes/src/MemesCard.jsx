import "./MemesCard.css";

export default function MemeCard({ imageUrl, name }) {
    return (
        <li className="memeCard">
            <img src={imageUrl} alt={name} />
            <p>{name}</p>
        </li>
    );
}
