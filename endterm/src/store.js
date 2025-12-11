import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import itemsSlice from "./slices/itemsSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        items: itemsSlice,
    },
}
);