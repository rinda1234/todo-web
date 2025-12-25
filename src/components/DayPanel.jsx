export default function DayPanel({ date }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 h-full">
            <h3 className="font-semibold mb-2">
                {date.getMonth() + 1}월 {date.getDate()}일 일정
            </h3>

            <p className="text-gray-400 text-sm">
                아직 일정이 없습니다
            </p>

            <button className="mt-4 w-full py-2 rounded-xl bg-blue-500 text-white">
                + 일정 추가
            </button>
        </div>
    );
}
