import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";


export const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    const emailAddr = cred.user.email;
    const snap = await getDoc(doc(db, "users", uid));
    return { uid, email: emailAddr, photoBase64: snap.exists() ? snap.data().photoBase64 ?? null : null };
};

export const signup = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    const emailAddr = cred.user.email;
    await setDoc(doc(db, "users", uid), { email: emailAddr, photoBase64: null });
    return { uid, email: emailAddr, photoBase64: null };
};

export const logout = () => signOut(auth);

export const updateProfilePhoto = async (uid, base64Image) => {
    await setDoc(doc(db, "users", uid), { photoBase64: base64Image }, { merge: true });
    return base64Image; // return so Redux can use it
};