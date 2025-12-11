import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const saveFavoritesToFirestore = async (uid, favourites) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { favourites }, { merge: true });
};


export const loadFavoritesFromFirestore = async (uid) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
        return snap.data().favourites || [];
    }
    return [];
};
