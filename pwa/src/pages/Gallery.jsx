import React, {useEffect} from 'react';
import ArtworkCard from '../components/ArtworkCard.jsx';
import "../styles/Gallery.css"
import { useDispatch, useSelector } from "react-redux";
import { loadItems, setPage } from "../slices/itemsSlice";

export default function Gallery({ category, query }) {
    const dispatch = useDispatch();
    const {
        page,
        items,
        status,
        error,
        iiifUrl,
        totalPages,
        loadingList,
        errorList
    } = useSelector(state => state.items);

    useEffect(() => {
        dispatch(setPage(1));
        dispatch(loadItems({ page: 1, category, query }));
    }, [category, query, dispatch]);

    if (loadingList) return <p>Loading…</p>;
    if (errorList) return <p>Error: {errorList}</p>;

    return (
        <section className="gallery">
            {status === 'idle' && <p>Adjust filters to begin.</p>}
            {status === 'loading' && <p>loading…</p>}
            {status === 'error' && (
                <div className="error">
                    <p>Couldn’t load artworks: {error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}

            {status === 'success' && (
                <>
                    {!items.length ? (
                        <p>sorry, no results. Try another style or searching content.</p>
                    ) : (
                        <div className="grid">
                            {items.map(item => (
                                <ArtworkCard key={item.id} item={item} iiifUrl={iiifUrl} />
                            ))}
                        </div>
                    )}
                    <div className="pager">
                        <button onClick={() => dispatch(setPage(page - 1))} disabled={page <= 1}>◀ Prev</button>
                        <span>Page {page} of {totalPages}</span>
                        <button onClick={() => dispatch(setPage(page + 1))} disabled={page >= totalPages}>Next ▶</button>
                    </div>
                </>
            )}
        </section>
    );
}
