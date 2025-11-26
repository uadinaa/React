import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }) => {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        return { uid: userCred.user.uid, email: userCred.user.email };
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async () => {
        await signOut(auth);
});

export const signUpUser = createAsyncThunk(
    "auth/signupUser",
    async ({ email, password }) => {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        return userCred.user;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            const u = action.payload;
            state.user = u
                ? { uid: u.uid, email: u.email }
                : null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    uid: action.payload.uid,
                    email: action.payload.email
                };
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })

            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
