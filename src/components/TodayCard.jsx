export default function TodayCard({ events }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
            <h3 className="font-semibold mb-3">오늘 할 일</h3>

            {events.length === 0 ? (
                <p className="text-gray-400 text-sm">
                    오늘 일정이 없습니다
                </p>
            ) : (
                <ul className="space-y-3">
                    {events.map((event) => (
                        <li
                            key={event.id}
                            className="px-3 py-3 rounded-lg bg-gray-50"
                        >
                            {/* 시간 */}
                            <div className="text-sm font-medium text-blue-600">
                                {event.startTime}
                            </div>

                            {/* 제목 */}
                            <div className="text-gray-900 font-medium">
                                {event.title}
                            </div>

                            {/* 내용 (DayPanel과 동일) */}
                            {event.description && (
                                <div className="mt-1 text-sm text-gray-600 whitespace-pre-line">
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
        </div>
    );
}
