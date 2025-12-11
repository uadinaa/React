import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNextPage, getById } from "../services/itemsService.js";
import {loadFavoritesFromFirestore, saveFavoritesToFirestore} from "../services/favoritesService";

export const getIdFromUrl = (url) => {
    if (typeof url !== "string") return null;
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
};

export const mergeFavoritesOnLogin = createAsyncThunk(
    "items/mergeFavoritesOnLogin",
    async (uid) => {
        // Load server favourites
        const serverFavs = await loadFavoritesFromFirestore(uid);

        // Merge with local favourites
        const localFavs = JSON.parse(localStorage.getItem("favourites") || "[]");
        const merged = [...serverFavs];
        localFavs.forEach(f => {
            if (!merged.find(m => m.id === f.id)) merged.push(f);
        });

        // Save merged back to Firestore
        await saveFavoritesToFirestore(uid, merged);

        // Clear localStorage
        localStorage.removeItem("favourites");

        return merged;
    }
);

export const loadCharacters = createAsyncThunk(
    "items/loadCharacters",
    async (search = "") => {
        // Fetch from API with search term
        const url = `https://swapi.dev/api/people/?search=${search}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to load characters");

        const data = await res.json();
        const api = data.results;

        // Enrich characters with species names
        const enriched = await Promise.all(
            api.map(async (c) => {
                let species_name = "Human";

                if (c.species.length > 0) {
                    try {
                        const res = await fetch(c.species[0]);
                        const speciesData = await res.json();
                        species_name = speciesData.name;
                    } catch (e) {
                        species_name = "Unknown";
                    }
                }

                return {
                    ...c,
                    id: getIdFromUrl(c.url),
                    species_name
                };
            })
        );

        // Add local characters
        const local = JSON.parse(localStorage.getItem("newCharacter") || "[]");

        return [...enriched, ...local];
    }
);


export const loadNextPage = createAsyncThunk(
    "items/loadNextPage",
    async () => {
        const api = await fetchNextPage();
        return api.map(c => ({
            ...c,
            id: getIdFromUrl(c.url),
        }));
    }
);

export const loadCharacterById = createAsyncThunk(
    "items/loadCharacterById",
    async (id) => {
        if (id.startsWith("local-")) {
            const local = JSON.parse(localStorage.getItem("newCharacter") || "[]");
            const found = local.find(c => c.id === id);
            if (!found) throw new Error("Local character not found");
            return found;
        }
        const api = await getById(id);
        return { ...api, id };
    }
);

export const toggleFavouriteAsync = createAsyncThunk(
    "items/toggleFavouriteAsync",
    async (character, { getState }) => {
        const state = getState();
        const exists = state.items.favourites.find(f => f.id === character.id);
        let updated;

        if (exists) {
            updated = state.items.favourites.filter(f => f.id !== character.id);
        } else {
            updated = [...state.items.favourites, character];
        }

        const user = state.auth.user;
        if (user) {
            // logged in ---- save to Firestore
            await saveFavoritesToFirestore(user.uid, updated);
        } else {
            // visitor ---- save to localStorage
            localStorage.setItem("favourites", JSON.stringify(updated));
        }

        return updated;
    }
);

const itemsSlice = createSlice({
    name: "items",
    initialState: {
        characters: [],
        characterDetails: null,
        favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
        deleted: JSON.parse(localStorage.getItem("deleted") || "[]"),
        loading: false,
        error: null,
    },

    reducers: {
        deleteCharacter: (state, action) => {
            const id = action.payload;

            state.characters = state.characters.filter(c => c.id !== id);
            state.favourites = state.favourites.filter(f => f.id !== id);
            state.deleted.push(id);

            localStorage.setItem("deleted", JSON.stringify(state.deleted));
        },

        // setFavorites: (state, action) => {
        //     state.favourites = action.payload;
        // },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadCharacters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadCharacters.fulfilled, (state, action) => {
                state.loading = false;
                state.characters = action.payload.filter(
                    c => !state.deleted.includes(c.id)
                );
            })
            .addCase(loadCharacters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(loadNextPage.fulfilled, (state, action) => {
                const newOnes = action.payload.filter(
                    c => !state.deleted.includes(c.id)
                );
                state.characters.push(...newOnes);
            })

            .addCase(loadCharacterById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadCharacterById.fulfilled, (state, action) => {
                state.loading = false;
                state.characterDetails = action.payload;
            })
            .addCase(loadCharacterById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(mergeFavoritesOnLogin.fulfilled, (state, action) => {
                state.favourites = action.payload;
            })
            .addCase(toggleFavouriteAsync.fulfilled, (state, action) => {
                state.favourites = action.payload;
            });
    }
});

export const { toggleFavourite, deleteCharacter } = itemsSlice.actions;
export default itemsSlice.reducer;
