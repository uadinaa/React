// import React, {useEffect} from 'react';
// import ArtworkCard from '../components/ArtworkCard.jsx';
// import { fetchArtworks } from '../api.js';
// import "../styles/Gallery.css"

// export default function Gallery({ category, query }) {
//     const [page, setPage] = React.useState(1);
//     const [status, setStatus] = React.useState('idle');
//     const [items, setItems] = React.useState([]);
//     const [error, setError] = React.useState('');
//     const [iiifUrl, setIiifUrl] = React.useState('');
//     const [totalPages, setTotalPages] = React.useState(1);

//     useEffect(() => { setPage(1); }, [category, query]);

//     useEffect(() => {
//         const q = [query?.trim(), category?.trim()].filter(Boolean).join(' ');
//         let cancelled = false;

//         (async () => {
//             try {
//                 setStatus('loading'); setError('');
//                 const json = await fetchArtworks({ page, limit: 20, query: q });
//                 if (cancelled) return;

//                 setIiifUrl(json.config?.iiif_url ?? '');

//                 const filtered = category
//                     ? json.data.filter(a => (a.style_title ?? '').toLowerCase().includes(category.toLowerCase()))
//                     : json.data;

//                 setItems(filtered);
//                 setTotalPages(json.pagination?.total_pages ?? 1);
//                 setStatus('success');
//             } catch (e) {
//                 if (!cancelled) { setError(e.message || 'Unknown error'); setStatus('error'); }
//             }
//         })();

//         return () => { cancelled = true; };
//     }, [category, query, page]);

//     return (
//         <section className="gallery">
//             {status === 'idle' && <p>Adjust filters to begin.</p>}
//             {status === 'loading' && <p>loading…</p>}
//             {status === 'error' && (
//                 <div className="error">
//                     <p>Couldn’t load artworks: {error}</p>
//                     <button onClick={() => window.location.reload()}>Retry</button>
//                 </div>
//             )}

//             {status === 'success' && (
//                 <>
//                     {!items.length ? (
//                         <p>sorry, no results. Try another style or searching content.</p>
//                     ) : (
//                         <div className="grid">
//                             {items.map(item => (
//                                 <ArtworkCard key={item.id} item={item} iiifUrl={iiifUrl} />
//                             ))}
//                         </div>
//                     )}
//                     <div className="pager">
//                         <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>◀ Prev</button>
//                         <span>Page {page} of {totalPages}</span>
//                         <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>Next ▶</button>
//                     </div>
//                 </>
//             )}
//         </section>
//     );
// }





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
    }, [category, query]);

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
