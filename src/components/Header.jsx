import { logout } from "../auth";

export default function Header({ year, month, onPrev, onNext }) {
    return (
        <div className="mb-4">
            {/* 🔹 첫 번째 줄: 로그아웃 */}
            <div className="flex justify-end mb-2">
                <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-red-500"
                >
                    로그아웃
                </button>
            </div>

            {/* 🔹 두 번째 줄: 월 이동 */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={onPrev}
                    className="px-3 py-1 rounded hover:bg-gray-200"
                >
                    ◀
                </button>

                <h2 className="text-xl font-semibold">
                    {year}년 {month + 1}월
                </h2>

                <button
                    onClick={onNext}
                    className="px-3 py-1 rounded hover:bg-gray-200"
                >
                    ▶
                </button>
            </div>
        </div>
    );
}
