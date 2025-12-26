import { getMonthMatrix, isSameDay, formatDate } from "../utils/calendar";

export default function CalendarMonth({
                                          year,
                                          month,
                                          selectedDate,
                                          onSelect,
                                          monthEvents,
                                      }) {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const matrix = getMonthMatrix(year, month);
    const today = new Date();

    return (
        <div className="bg-white rounded-2xl shadow p-4">
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
                {days.map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            {/* 날짜 카드 */}
            <div className="grid grid-cols-7 gap-2">
                {matrix.map((date, idx) => {
                    const isCurrentMonth = date.getMonth() === month;
                    const isToday = isSameDay(date, today);
                    const isSelected = isSameDay(date, selectedDate);

                    const key = formatDate(date);
                    const dayEvents = monthEvents?.[key] || [];

                    return (
                        <button
                            key={idx}
                            onClick={() => onSelect(date)}
                            className={`
                relative aspect-square rounded-xl p-2 text-left
                ${isSelected ? "bg-blue-100" : "bg-gray-50 hover:bg-gray-100"}
                ${!isCurrentMonth ? "opacity-40" : ""}
                ${isToday ? "ring-2 ring-blue-500" : ""}
              `}
                        >
                            {/* 날짜 (좌상단) */}
                            <div className="absolute top-1 left-1 text-[10px] text-gray-500">
                                {date.getMonth() + 1}/{date.getDate()}
                            </div>

                            {/* 일정 요약 (중앙) */}
                            <div className="flex flex-col justify-center h-full gap-1 mt-2">
                                {dayEvents.slice(0, 3).map((event) => (
                                    <div
                                        key={event.id}
                                        className="text-[11px] text-gray-700 truncate"
                                    >
                                        {event.startTime} {event.title}
                                    </div>
                                ))}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
