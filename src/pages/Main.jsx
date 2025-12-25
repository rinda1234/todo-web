import { useState, useEffect, useCallback } from "react";

import Header from "../components/Header";
import TodayCard from "../components/TodayCard";
import CalendarMonth from "../components/CalendarMonth";
import DayPanel from "../components/DayPanel";
import EventModal from "../components/EventModal";
import { formatDate } from "../utils/calendar";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loginWithGoogle, loginWithGithub } from "../auth";

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
    const [user, setUser] = useState(null);
    const [monthEvents, setMonthEvents] = useState({});
    const todayKey = formatDate(new Date());
    const [todayEvents, setTodayEvents] = useState([]);

    const selectedKey = formatDate(selectedDate);
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
       Firestore: 일정 불러오기
    ========================= */
    const loadEvents = useCallback(async () => {
        if (!user) return; // 🔥 중요: 로그인 전에는 실행 X

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
                startTime: data.startTime,
            });
        });

        setEvents(loaded);
    }, [user, selectedKey]);
    const loadMonthEvents = useCallback(async () => {
        if (!user) return;

        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);

        const q = query(
            collection(db, "events"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const counts = {};

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (!data.date) return;

            const d = new Date(data.date);
            if (d >= start && d <= end) {
                counts[data.date] = (counts[data.date] || 0) + 1;
            }
        });

        setMonthEvents(counts);
    }, [user, year, month]);


    /* 날짜 / 유저 변경 시 다시 로드 */
    useEffect(() => {
        loadEvents();
    }, [loadEvents]);
    useEffect(() => {
        loadMonthEvents();
    }, [loadMonthEvents]);

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
        if (!user) return;

        await addDoc(collection(db, "events"), {
            userId: user.uid,
            date: selectedKey,
            title,
            startTime,
            createdAt: new Date(),
        });

        await loadEvents();
        setIsModalOpen(false);
    };

    /* =========================
       일정 삭제
    ========================= */
    const deleteEvent = async (eventId) => {
        await deleteDoc(doc(db, "events", eventId));
        await loadEvents();
    };

    // 오늘 일정 불러오기
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
                startTime: data.startTime,
            });
        });

        setTodayEvents(list);
    }, [user, todayKey]);

    useEffect(() => {
        loadTodayEvents();
    }, [loadTodayEvents]);



    /* =========================
       로그인 UI
    ========================= */
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow w-80">
                    <h2 className="text-xl font-semibold mb-6 text-center">
                        로그인
                    </h2>

                    <button
                        onClick={loginWithGoogle}
                        className="w-full mb-3 py-2 rounded-lg border"
                    >
                        Google로 로그인
                    </button>

                    <button
                        onClick={loginWithGithub}
                        className="w-full py-2 rounded-lg border"
                    >
                        GitHub로 로그인
                    </button>
                </div>
            </div>
        );
    }

    /* =========================
       메인 화면
    ========================= */
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
