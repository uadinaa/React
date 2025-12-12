import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, uploadUserPhoto } from "../slices/authSlice.js";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Profile.css"

export default function Profile() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const lastPreviewUrl = useRef(null);

    useEffect(() => {
        return () => {
            if (lastPreviewUrl.current) URL.revokeObjectURL(lastPreviewUrl.current);
        };
    }, []);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);

        if (lastPreviewUrl.current) URL.revokeObjectURL(lastPreviewUrl.current);
        const url = URL.createObjectURL(file);
        lastPreviewUrl.current = url;
        setPreview(url);
    };

    const compressToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const worker = new Worker(new URL("../services/imageService.js", import.meta.url));
            worker.onmessage = (e) => {
                const base64 = e.data;
                worker.terminate();
                if (!base64) return reject(new Error("Compression failed"));
                resolve(base64);
            };
            worker.onerror = (err) => {
                worker.terminate();
                reject(err);
            };
            worker.postMessage(file);
        });

    const handleUpload = async () => {
        if (!selectedFile || !user) return;
        setLoading(true);
        try {
            const base64Image = await compressToBase64(selectedFile);
            setPreview(base64Image);
            await dispatch(uploadUserPhoto({ uid: user.uid, base64Image }));
            alert(t("profileUpdated"));
        } catch (err) {
            console.error("Upload error:", err);
            alert(t("profileUploadFailed"));
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await dispatch(logoutUser());
        dispatch({
            type: "items/setFavorites",
            payload: JSON.parse(localStorage.getItem("favourites") || "[]")
        });
        navigate("/login");
    };

    const imgSrc =
        preview ??
        (user?.photoBase64
            ? user.photoBase64
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

    return (
        <div className="profile-container">
            <div className="profile-info">
                <h2>{t("profileTitle")}</h2>

                <img src={imgSrc} alt="profile" className="profile-img" />

                <input type="file" accept="image/*" onChange={handleFileSelect} />

                <button onClick={handleUpload} disabled={!user || !selectedFile || loading}>
                    {loading ? t("uploading") : t("uploadPhoto")}
                </button>

                <p>{t("email")}: {user?.email}</p>

                <button className="logout" onClick={logout}>{t("logout")}</button>
            </div>
        </div>
    );
}
