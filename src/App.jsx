import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    if (loading) {
        return <div className="p-10">Loading...</div>;
    }

    if (!user) {
        return <Login />;
    }

    return (
        <div className="p-10">
            <h2 className="text-xl font-semibold">
                로그인 성공 🎉
            </h2>
            <p className="text-gray-600 mt-2">{user.email}</p>
        </div>
    );
}
