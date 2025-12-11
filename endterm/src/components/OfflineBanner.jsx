import React from "react";

export default function OfflineBanner() {
    const [online, setOnline] = React.useState(navigator.onLine);

    React.useEffect(() => {
        const update = () => setOnline(navigator.onLine);
        window.addEventListener("online", update);
        window.addEventListener("offline", update);
        return () => {
            window.removeEventListener("online", update);
            window.removeEventListener("offline", update);
        };
    }, []);

    if (!online) return <div className="offline-banner">You are offline. Some features may be unavailable.</div>;
    return null;
}
