import { useState, useEffect, useCallback } from "react";

import Header from "../components/Header";
import TodayCard from "../components/TodayCard";
import CalendarMonth from "../components/CalendarMonth";
import DayPanel from "../components/DayPanel";
import EventModal from "../components/EventModal";
import { formatDate } from "../utils/calendar";
import Auth from "../pages/Auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


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
    const [monthEvents, setMonthEvents] = useState({});
    const [todayEvents, setTodayEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    const selectedKey = formatDate(selectedDate);
    const todayKey = formatDate(new Date());

    const selectedEvents = events[selectedKey] || [];

    /* =========================
       Auth 상태 감지
    ========================= */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    /* =========================
       선택 날짜 일정
    ========================= */
    const loadEvents = useCallback(async () => {
        if (!user) return;

        const q = query(
            collection(db, "events"),
            where("userId", "==", user.uid),
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
                description: data.description || "",
                startTime: data.startTime,
            });
        });

        setEvents(loaded);
    }, [user, selectedKey]);

    /* =========================
       월간 요약 일정
    ========================= */
    const loadMonthEvents = useCallback(async () => {
        if (!user) return;

        const q = query(
            collection(db, "events"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const grouped = {};

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (!grouped[data.date]) grouped[data.date] = [];

            grouped[data.date].push({
                id: docSnap.id,
                startTime: data.startTime,
                title: data.title,
            });
        });

        setMonthEvents(grouped);
    }, [user]);

    /* =========================
       오늘 일정 (고정)
    ========================= */
    const loadTodayEvents = useCallback(async () => {
        if (!user) return;

        const q = query(
            collection(db, "events"),
            where("userId", "==", user.uid),
            where("date", "==", todayKey)
        );

        const snapshot = await getDocs(q);
        const list = [];

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
                id: docSnap.id,
                title: data.title,
                description: data.description || "",
                startTime: data.startTime,
            });
        });

        setTodayEvents(list);
    }, [user, todayKey]);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    useEffect(() => {
        loadMonthEvents();
    }, [loadMonthEvents]);

    useEffect(() => {
        loadTodayEvents();
    }, [loadTodayEvents]);

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
    const addEvent = async ({ title, description, startTime }) => {
        if (!user) return;

        await addDoc(collection(db, "events"), {
            userId: user.uid,
            date: selectedKey,
            title,
            description, // 🔥 핵심
            startTime,
            createdAt: new Date(),
        });

        await loadEvents();
        await loadMonthEvents();
        await loadTodayEvents();
        setIsModalOpen(false);
    };

    /* =========================
       일정 삭제
    ========================= */
    const deleteEvent = async (eventId) => {
        await deleteDoc(doc(db, "events", eventId));
        await loadEvents();
        await loadMonthEvents();
        await loadTodayEvents();
    };

    /* =========================
       로그인 UI
    ========================= */
    if (!user) {
        return <Auth />;
    }


    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <Header
                    year={year}
                    month={month}
                    onPrev={prevMonth}
                    onNext={nextMonth}
                />

                <TodayCard events={todayEvents} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <CalendarMonth
                            year={year}
                            month={month}
                            selectedDate={selectedDate}
                            onSelect={setSelectedDate}
                            monthEvents={monthEvents}
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
