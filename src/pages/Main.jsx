import { useState } from "react";
import Header from "../components/Header";
import TodayCard from "../components/TodayCard";
import CalendarMonth from "../components/CalendarMonth";
import DayPanel from "../components/DayPanel";

export default function Main() {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [selectedDate, setSelectedDate] = useState(now);

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

                <DayPanel date={selectedDate} />
            </div>
        </div>
    );
}
