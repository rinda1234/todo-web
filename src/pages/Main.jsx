import { useState } from "react";
import Header from "../components/Header";
import TodayCard from "../components/TodayCard";
import CalendarMonth from "../components/CalendarMonth";
import DayPanel from "../components/DayPanel";
import { formatDate } from "../utils/calendar";
import EventModal from "../components/EventModal";
const INITIAL_EVENTS = {
    "2025-12-25": [
        { title: "자료구조 과제", startTime: "14:00" },
        { title: "팀 회의", startTime: "18:00" },
    ],
    "2025-12-26": [
        { title: "Term Project 마감", startTime: "23:59" },
    ],
};
export default function Main() {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [selectedDate, setSelectedDate] = useState(now);
    const [events, setEvents] = useState(INITIAL_EVENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectedKey = formatDate(selectedDate);
    const selectedEvents = events[selectedKey] || [];



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

    const addEvent = ({ title, startTime }) => {
        setEvents((prev) => {
            const dayEvents = prev[selectedKey] || [];
            return {
                ...prev,
                [selectedKey]: [...dayEvents, { title, startTime }],
            };
        });
    };

    const deleteEvent = (index) => {
        setEvents((prev) => {
            const dayEvents = prev[selectedKey] || [];
            const newEvents = dayEvents.filter((_, i) => i !== index);

            return {
                ...prev,
                [selectedKey]: newEvents,
            };
        });
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
                    onAdd={() => setIsModalOpen(true)}
                    onDelete={deleteEvent}
                />



            </div>
            {isModalOpen && (
                <EventModal
                    date={selectedDate}
                    onClose={() => setIsModalOpen(false)}
                    onSave={addEvent}
                />
            )}

        </div>
    );
}

