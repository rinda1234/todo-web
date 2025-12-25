import { useState, useEffect, useCallback } from "react";

import Header from "../components/Header";
import TodayCard from "../components/TodayCard";
import CalendarMonth from "../components/CalendarMonth";
import DayPanel from "../components/DayPanel";
import EventModal from "../components/EventModal";
import { formatDate } from "../utils/calendar";

import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Main() {
    const now = new Date();

    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [selectedDate, setSelectedDate] = useState(now);
    const [events, setEvents] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectedKey = formatDate(selectedDate);
    const selectedEvents = events[selectedKey] || [];

    /* =========================
       Firestore: 일정 불러오기
    ========================= */
    const loadEvents = useCallback(async () => {
        const q = query(
            collection(db, "events"),
            where("date", "==", selectedKey)
        );

        const snapshot = await getDocs(q);
        const loaded = {};

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (!loaded[data.date]) loaded[data.date] = [];
            loaded[data.date].push({
                id: docSnap.id,
                title: data.title,
                startTime: data.startTime,
            });
        });

        setEvents(loaded);
    }, [selectedKey]);


    /* 날짜 변경 시 다시 불러오기 */

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);


    /* =========================
       월 이동
    ========================= */
    const prevMonth = () => {
        if (month === 0) {
            setYear((y) => y - 1);
            setMonth(11);
        } else {
            setMonth((m) => m - 1);
        }
    };

    const nextMonth = () => {
        if (month === 11) {
            setYear((y) => y + 1);
            setMonth(0);
        } else {
            setMonth((m) => m + 1);
        }
    };

    /* =========================
       일정 추가
    ========================= */
    const addEvent = async ({ title, startTime }) => {
        await addDoc(collection(db, "events"), {
            date: selectedKey,
            title,
            startTime,
            createdAt: new Date(),
        });

        await loadEvents();      // 🔥 추가 후 즉시 반영
        setIsModalOpen(false);
    };

    /* =========================
       일정 삭제
    ========================= */
    const deleteEvent = async (eventId) => {
        await deleteDoc(doc(db, "events", eventId));
        await loadEvents();      // 🔥 삭제 후 즉시 반영
    };

    return (
        <>
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
            </div>

            {/* 🔥 Portal 모달 */}
            {isModalOpen && (
                <EventModal
                    date={selectedDate}
                    onClose={() => setIsModalOpen(false)}
                    onSave={addEvent}
                />
            )}
        </>
    );
}
