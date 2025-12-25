export default function DayPanel({ date, events, onAdd, onDelete }) {


    return (
        <div className="bg-white rounded-2xl shadow p-4 h-full">
            <h3 className="font-semibold mb-3">
                {date.getMonth() + 1}월 {date.getDate()}일 일정
            </h3>

            {events.length === 0 ? (
                <p className="text-gray-400 text-sm">
                    아직 일정이 없습니다
                </p>
            ) : (
                <ul className="space-y-2">
                    {events.map((event, idx) => (
                        <li
                            key={idx}
                            className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-blue-600">
                                    {event.startTime}
                                </span>
                                <span className="text-sm text-gray-800">
                                    {event.title}
                                </span>
                            </div>

                            <button
                                onClick={() => onDelete(event.id)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                ✕
                            </button>

                        </li>

                    ))}
                </ul>
            )}

            <button
                onClick={onAdd}
                className="mt-4 w-full py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
            >
                + 일정 추가
            </button>

        </div>
    );
}
