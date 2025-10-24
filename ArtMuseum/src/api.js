export const FIELDS = [
    'id','title','artist_title','style_title','date_display','image_id','description'
].join(',');

export async function fetchArtworks({ page = 1, limit = 20, query = '' }) {
    const params = new URLSearchParams();
    params.set('fields', FIELDS);
    params.set('page', String(page));
    params.set('limit', String(limit));

    // choose path
    let path = '/api/api/v1/artworks';
    if (query && query.trim()) {
        path = '/api/api/v1/artworks/search';
        params.set('q', query.trim());
    }

    const url = `${path}?${params.toString()}`;
    // debug: console.log('[fetchArtworks]', url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json(); // { data, pagination, config }
}

export function iiifImageUrl(iiifUrl, imageId, width = 843) {
    if (!iiifUrl || !imageId) return null;
    return `${iiifUrl}/${imageId}/full/${width},/0/default.jpg`;
}
