import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./slices/itemsSlice.js";
import authReducer from "./slices/authSlice.js";


export const store = configureStore({
    reducer: {
        items: itemsReducer,
        auth: authReducer,
    },
});
