import { useState } from "react";
import { signInWithEmail } from "../auth";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmail(email, password);
        } catch (e) {
            setError("이메일 또는 비밀번호가 올바르지 않습니다");
        }
    };

    return (
        <>
            <h2 className="text-xl font-semibold mb-4 text-center">
                로그인
            </h2>

            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {error && (
                <p className="text-xs text-red-500 mb-2">
                    {error}
                </p>
            )}

            <button
                onClick={handleLogin}
                className="w-full py-2 rounded-xl bg-blue-500 text-white"
            >
                로그인
            </button>
        </>
    );
}
