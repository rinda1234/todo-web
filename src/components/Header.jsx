import { logout } from "../auth";
export default function Header({ year, month, onPrev, onNext }) {
    return (

        <div className="flex items-center justify-between mb-4">

            <button onClick={onPrev} className="px-3 py-1 rounded hover:bg-gray-200">
                ◀
            </button>

            <h2 className="text-xl font-semibold">
                {year}년 {month + 1}월
            </h2>

            <button onClick={onNext} className="px-3 py-1 rounded hover:bg-gray-200">
                ▶
            </button>
            <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-red-500"
            >
                로그아웃
            </button>

        </div>
    );
}

