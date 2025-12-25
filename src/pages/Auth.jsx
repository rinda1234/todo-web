import { useState } from "react";
import {
    signInWithGoogle,
    signInWithGithub,
} from "../auth";

export default function Auth() {
    const [mode, setMode] = useState("login"); // login | signup

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white w-[380px] max-w-[90%] rounded-2xl shadow-xl p-8">

                {/* 타이틀 */}
                <h1 className="text-2xl font-bold text-center mb-1">
                    My Planner
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    {mode === "login"
                        ? "로그인하여 일정을 관리하세요"
                        : "회원가입 후 바로 시작할 수 있어요"}
                </p>

                {/* 버튼 영역 */}
                <div className="space-y-3">
                    <button
                        onClick={signInWithGoogle}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border hover:bg-gray-50 transition"
                    >
                        <span className="font-medium">
                            Google로 {mode === "login" ? "로그인" : "회원가입"}
                        </span>
                    </button>

                    <button
                        onClick={signInWithGithub}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border hover:bg-gray-50 transition"
                    >
                        <span className="font-medium">
                            GitHub로 {mode === "login" ? "로그인" : "회원가입"}
                        </span>
                    </button>
                </div>

                {/* 모드 전환 */}
                <p className="mt-6 text-sm text-center text-gray-500">
                    {mode === "login" ? (
                        <>
                            계정이 없으신가요?{" "}
                            <button
                                onClick={() => setMode("signup")}
                                className="text-blue-500 hover:underline"
                            >
                                회원가입
                            </button>
                        </>
                    ) : (
                        <>
                            이미 계정이 있나요?{" "}
                            <button
                                onClick={() => setMode("login")}
                                className="text-blue-500 hover:underline"
                            >
                                로그인
                            </button>
                        </>
                    )}
                </p>

                {/* 안내 */}
                <p className="mt-4 text-xs text-gray-400 text-center">
                    Google/GitHub 계정은 Firebase에서 안전하게 관리됩니다
                </p>
            </div>
        </div>
    );
}
