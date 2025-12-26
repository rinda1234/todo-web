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
                <ul className="space-y-3">
                    {events.map((event) => (
                        <li
                            key={event.id}
                            className="px-3 py-3 rounded-lg bg-gray-50"
                        >
                            {/* 상단: 시간 + 제목 + 삭제 */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-blue-600 font-semibold text-sm">
                                        {event.startTime}
                                    </div>
                                    <div className="text-gray-900 font-medium">
                                        {event.title}
                                    </div>
                                </div>

                                <button
                                    onClick={() => onDelete(event.id)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* 내용 */}
                            {event.description && (
                                <div className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                                    {event.description
                                        .split("\n")
                                        .map((line, idx) => (
                                            <div key={idx}>- {line}</div>
                                        ))}
                                </div>
                            )}
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
