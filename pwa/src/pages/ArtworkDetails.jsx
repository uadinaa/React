import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import DOMPurify from "dompurify";
import { GoArrowLeft } from "react-icons/go";
import "../styles/ArtworkDetails.css"
import {useSelector, useDispatch} from "react-redux";
import { fetchItemById } from "../slices/itemsSlice";

const ArtworkDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedItem, loadingItem, errorItem } = useSelector(state => state.items);

    useEffect(() => {
        dispatch(fetchItemById(id));
    }, [dispatch, id]);

    if (loadingItem) return <p>Loading…</p>;
    if (errorItem) return <p>Error: {errorItem}</p>;
    if (!selectedItem) return <p>Artwork not found</p>;

    const imageUrl = selectedItem?.image_id
        ? `https://www.artic.edu/iiif/2/${selectedItem.image_id}/full/843,/0/default.jpg`
        : null;


    return (
        <section className="artwork-details">
            <button className="back-button" onClick={() => navigate(-1) || navigate("/gallery")}>
                <GoArrowLeft className="icon" /> Back
            </button>

            <h2>{selectedItem.title}</h2>
            <h3 className="artist"> {selectedItem.artist_display}</h3>
            {imageUrl && <img className="painting" src={imageUrl} alt={selectedItem.title}/>}

            <SafeDescription html={selectedItem.description} />
            <p><strong>Date:</strong> {selectedItem.date_display}</p>
            <p><strong>Medium:</strong> {selectedItem.medium_display}</p>
            <p><strong>Dimensions:</strong> {selectedItem.dimensions}</p>
            <p><strong>Credit Line:</strong> {selectedItem.credit_line}</p>

            <p><strong>Style:</strong> {selectedItem.style_title || "Unknown"}</p>
            <p><strong>Classification:</strong> {selectedItem.classification_title}</p>
            <p><strong>Department:</strong> {selectedItem.department_title}</p>
            <p><strong>Origin:</strong> {selectedItem.place_of_origin}</p>
            <p><strong>On View:</strong> {selectedItem.is_on_view ? "Currently displayed" : "Not on display"}</p>
            <p><strong>Provenance:</strong> {selectedItem.provenance_text || "No provenance info available"}</p>

        </section>
    );

}

function SafeDescription({ html }) {
    const clean = React.useMemo(() => DOMPurify.sanitize(html || ""), [html]);
    return <div className="description" dangerouslySetInnerHTML={{ __html: clean || 'Description is unavailable.',}} />;
}

export default ArtworkDetails;
