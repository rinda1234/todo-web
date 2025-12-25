export default function TodayCard({ events }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
            <h3 className="font-semibold mb-2">오늘 할 일</h3>

            {events.length === 0 ? (
                <p className="text-gray-400 text-sm">
                    오늘 일정이 없습니다
                </p>
            ) : (
                <ul className="space-y-2">
                    {events.map((event) => (
                        <li
                            key={event.id}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50"
                        >
              <span className="text-sm font-medium text-blue-600">
                {event.startTime}
              </span>
                            <span className="text-sm text-gray-800">
                {event.title}
              </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
