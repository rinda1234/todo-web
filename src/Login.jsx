import { loginWithGoogle, loginWithGithub } from "./auth";

export default function Login() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white w-[360px] rounded-2xl shadow-md p-8">
                <h1 className="text-2xl font-semibold text-center mb-2">
                    Calendar Todo
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    일정과 할 일을 한눈에
                </p>

                <button
                    onClick={loginWithGoogle}
                    className="w-full py-3 mb-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
                >
                    Google로 로그인
                </button>

                <button
                    onClick={loginWithGithub}
                    className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
                >
                    GitHub로 로그인
                </button>
            </div>
        </div>
    );
}
