import { getMonthMatrix, isSameDay } from "../utils/calendar";

export default function CalendarMonth({
                                          year,
                                          month,
                                          selectedDate,
                                          onSelect,
                                      }) {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const matrix = getMonthMatrix(year, month);
    const today = new Date();

    return (
        <div className="bg-white rounded-2xl shadow p-4">
            <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
                {days.map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {matrix.map((date, idx) => {
                    const isCurrentMonth = date.getMonth() === month;
                    const isToday = isSameDay(date, today);
                    const isSelected = isSameDay(date, selectedDate);

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
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
