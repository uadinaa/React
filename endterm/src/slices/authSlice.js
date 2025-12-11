// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import {login, signup, logout, updateProfilePhoto} from "../services/authService.js";
import {loadFavoritesFromFirestore, saveFavoritesToFirestore} from "../services/favoritesService.js";

// export const loginUser = createAsyncThunk(
//     "auth/loginUser",
//     async ({ email, password }) => {
//         const userCred = await signInWithEmailAndPassword(auth, email, password);
//         const uid = userCred.user.uid;
//         const emailAddr = userCred.user.email;
//
//         const snap = await getDoc(doc(db, "users", uid));
//         let photoBase64 = null;
//
//         // if (snap.exists()) {
//         //     const data = snap.data();
//         //     photoBase64 = data.photoBase64 ?? null;
//         //     if (!data.email) {
//         //         await setDoc(doc(db, "users", uid), { email: emailAddr }, { merge: true });
//         //     }
//         // } else {
//         //     await setDoc(doc(db, "users", uid), { email: emailAddr });
//         // }
//
//         if (snap.exists()) photoBase64 = snap.data().photoBase64 || null;
//         else await setDoc(doc(db, "users", uid), { email: emailAddr });
//
//         console.log("Firestore user doc:", snap.exists() ? snap.data() : "no doc");
//
//         return { uid, email: emailAddr, photoBase64 };
//     }
// );
//
// export const signUpUser = createAsyncThunk(
//     "auth/signupUser",
//     async ({ email, password }) => {
//         const userCred = await createUserWithEmailAndPassword(auth, email, password);
//         const uid = userCred.user.uid;
//         const emailAddr = userCred.user.email;
//         await setDoc(doc(db, "users", uid), { email: emailAddr });
//         return { uid, email: emailAddr, photoBase64: null };
//     }
// );
//
// export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
//     await signOut(auth);
// });

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
        return await signup(email, password); // calls authService.signup
    }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    await logout(); // calls authService.logout
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
