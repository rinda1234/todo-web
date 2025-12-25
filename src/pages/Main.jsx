import { useState } from "react";
import Header from "../components/Header";
import TodayCard from "../components/TodayCard";
import CalendarMonth from "../components/CalendarMonth";
import DayPanel from "../components/DayPanel";
import { formatDate } from "../utils/calendar";
export default function Main() {
    const dummyEvents = {
        "2025-12-25": [
            { title: "자료구조 과제", startTime: "14:00" },
            { title: "팀 회의", startTime: "18:00" },
        ],
        "2025-12-26": [
            { title: "Term Project 마감", startTime: "23:59" },
        ],
    };
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [selectedDate, setSelectedDate] = useState(now);
    const selectedKey = formatDate(selectedDate);
    const selectedEvents = dummyEvents[selectedKey] || [];


    const prevMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };

    const nextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Header
                year={year}
                month={month}
                onPrev={prevMonth}
                onNext={nextMonth}
            />

            <TodayCard />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <CalendarMonth
                        year={year}
                        month={month}
                        selectedDate={selectedDate}
                        onSelect={setSelectedDate}
                    />
                </div>

                <DayPanel
                    date={selectedDate}
                    events={selectedEvents}
                />

            </div>
        </div>
    );
}
