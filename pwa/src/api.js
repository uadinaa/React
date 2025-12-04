export const FIELDS = [
    'id','title','artist_title','style_title','date_display','image_id','description',
    'place_of_origin','medium_display','classification_title','gallery_title',
    'department_title','credit_line',
].join(',');

export async function fetchArtworks({ page = 1, limit = 20, query = '' }) {
    const params = new URLSearchParams();
    params.set('fields', FIELDS);
    params.set('page', String(page));
    params.set('limit', String(limit));

    let path = 'https://api.artic.edu/api/v1/artworks';
    if (query && query.trim()) {
        path = 'https://api.artic.edu/api/v1/artworks/search';
        params.set('q', query.trim());
    }

    const url = `${path}?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();

}

export async function getById(id) {
    const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
    const json = await res.json();
    return json.data;
}

export function iiifImageUrl(iiifUrl, imageId, width = 843) {
    if (!iiifUrl || !imageId) return null;
    return `${iiifUrl}/${imageId}/full/${width},/0/default.jpg`;
}
