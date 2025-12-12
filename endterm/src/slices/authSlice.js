import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {login, signup, logout, updateProfilePhoto} from "../services/authService.js";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }) => {
    try {
        return await login(email, password);
    } catch (err) {
        console.error("Login error:", err);
        throw err;
    }
});

export const signUpUser = createAsyncThunk(
    "auth/signupUser",
    async ({ email, password }) => {
        return await signup(email, password);
    }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    await logout();
});

export const uploadUserPhoto = createAsyncThunk(
    "auth/uploadUserPhoto",
    async ({ uid, base64Image }) => {
        const photo = await updateProfilePhoto(uid, base64Image);
        return photo;
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, loading: false, error: null },
    reducers: {
        setUser: (state, action) => {
            const u = action.payload;
            state.user = u ? { uid: u.uid, email: u.email, photoBase64: u.photoBase64 ?? null } : null;
        },
        setUserPhoto: (state, action) => { if (state.user) state.user.photoBase64 = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
            // .addCase(loginUser.fulfilled, (s, a) => {
            //     s.loading = false;
            //     s.user = { uid: a.payload.uid, email: a.payload.email, photoBase64: a.payload.photoBase64 };
            // })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    uid: action.payload.uid,
                    email: action.payload.email,
                    photoBase64: action.payload.photoBase64
                };
            })

            .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

            .addCase(signUpUser.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(signUpUser.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
            .addCase(signUpUser.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

            .addCase(logoutUser.fulfilled, (s) => { s.user = null; })

            .addCase(uploadUserPhoto.fulfilled, (state, action) => {
                    if (state.user) state.user.photoBase64 = action.payload;
                });
    },
});

export const { setUser, setUserPhoto } = authSlice.actions;
export default authSlice.reducer;
