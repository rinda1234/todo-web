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

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-1">
                {matrix.map((date, idx) => {
                    const isCurrentMonth = date.getMonth() === month;
                    const isToday = isSameDay(date, today);
                    const isSelected = isSameDay(date, selectedDate);

                    // 🔥 여기서 날짜별 dot 계산
                    const key = formatDate(date);
                    const count = monthEvents?.[key] || 0;

                    return (
                        <button
                            key={idx}
                            onClick={() => onSelect(date)}
                            className={`
                aspect-square rounded-xl text-sm
                ${isCurrentMonth ? "text-gray-900" : "text-gray-300"}
                ${isToday ? "border border-blue-500" : ""}
                ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"}
              `}
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                {/* 날짜 숫자 */}
                                <span>{date.getDate()}</span>

                                {/* 🔵 일정 dot */}
                                {count > 0 && (
                                    <div className="flex gap-1 mt-1">
                                        {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                                            <span
                                                key={i}
                                                className="w-1.5 h-1.5 rounded-full bg-blue-500"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
