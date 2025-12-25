import { useState } from "react";
import { createPortal } from "react-dom";

export default function EventModal({ date, onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("09:00");

    const handleSave = () => {
        if (!title.trim()) return;
        onSave({ title, startTime: time });
        onClose();
        setTitle("");
    };

    return createPortal(
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
                zIndex: 99999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    width: 320,
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
            >
                <h3 style={{ fontWeight: 600, marginBottom: 16 }}>
                    {date.getMonth() + 1}월 {date.getDate()}일 일정 추가
                </h3>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="할 일을 입력하세요"
                    style={{
                        width: "100%",
                        padding: 8,
                        marginBottom: 12,
                        border: "1px solid #ccc",
                        borderRadius: 8,
                    }}
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 8,
                        marginBottom: 16,
                        border: "1px solid #ccc",
                        borderRadius: 8,
                    }}
                />

                <div style={{ display: "flex", gap: 8 }}>
                    <button
                        onClick={onClose}
                        style={{ flex: 1, padding: 8 }}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        style={{
                            flex: 1,
                            padding: 8,
                            background: "#3b82f6",
                            color: "white",
                            borderRadius: 8,
                        }}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
