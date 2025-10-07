import "./DogCard.css";

export default function DogCard({ imageUrl }) {
    return (
        <li className="dogCard">
            <img src={imageUrl} alt="A cute dog" />
        </li>
    );
}
