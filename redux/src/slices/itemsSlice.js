import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArtworks, getById } from "../api";

export const itemsService = {
    getAll: async (query) => {
        const json = await fetchArtworks({ page: 1, limit: 20, query });
        return json;
    },

    getById: async (id) => {
        return await getById(id);
    }
};

export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async (query) => {
        return await itemsService.getAll(query);
    }
);

export const fetchItemById = createAsyncThunk(
    "items/fetchItemById",
    async (id) => {
        return await itemsService.getById(id);
    }
);

export const loadItems = createAsyncThunk(
    "items/loadItems",
    async ({ page, category, query }) => {
        const q = [query?.trim(), category?.trim()].filter(Boolean).join(" ");
        const params = { page, limit: 20 };
        if (q) {
            params.query = q;
        }
        const json = await fetchArtworks(params);

        console.log("LOAD ITEMS PARAMS:", { page, category, query, q }); // когда all paintings он ничего не выводит, в этом и проблема

        const filtered = category
            ? json.data.filter(a =>
                (a.style_title ?? "").toLowerCase().includes(category.toLowerCase())
            )
            : json.data;

        return {
            items: filtered,
            iiifUrl: json.config?.iiif_url,
            totalPages: json.pagination?.total_pages || 1,
        };
    }
);

const itemsSlice = createSlice({
    name: "items",
    initialState: {
        list: [],
        status: "idle",
        error: "",
        items: [],
        iiifUrl: "",
        totalPages: 1,
        page: 1,

        selectedItem: null,

        loadingList: false,
        loadingItem: false,
        errorList: null,
        errorItem: null,

        query: ""
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadItems.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadItems.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload.items;
                state.iiifUrl = action.payload.iiifUrl;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(loadItems.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error?.message || "Unknown error";
            });

        builder
            .addCase(fetchItems.pending, (state) => {
                state.loadingList = true;
                state.errorList = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loadingList = false;
                state.list = action.payload.data || [];
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.error.message;
            });

        builder
            .addCase(fetchItemById.pending, (state) => {
                state.loadingItem = true;
                state.errorItem = null;
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.loadingItem = false;
                state.selectedItem = action.payload;
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                state.loadingItem = false;
                state.errorItem = action.error.message;
            });
    }
});

export const { setPage, setQuery } = itemsSlice.actions;
export default itemsSlice.reducer;
