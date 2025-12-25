import { useState } from "react";
import { createPortal } from "react-dom";

export default function EventModal({ date, onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("09:00");

    const handleSave = () => {
        if (!title.trim()) return;

        onSave({
            title,
            description,
            startTime: time,
        });

        setTitle("");
        setDescription("");
        setTime("09:00");
        onClose();
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
                    width: 360,
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
            >
                <h3 style={{ fontWeight: 600, marginBottom: 16 }}>
                    {date.getMonth() + 1}/{date.getDate()} 일정 추가
                </h3>

                {/* 제목 */}
                <label style={{ fontSize: 13, fontWeight: 500 }}>
                    제목
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 자료구조 과제"
                    style={{
                        width: "100%",
                        padding: 8,
                        marginBottom: 12,
                        border: "1px solid #ccc",
                        borderRadius: 8,
                    }}
                />

                {/* 내용 */}
                <label style={{ fontSize: 13, fontWeight: 500 }}>
                    내용
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="- 트리 파트 정리\n- 예제 문제 풀기"
                    rows={3}
                    style={{
                        width: "100%",
                        padding: 8,
                        marginBottom: 12,
                        border: "1px solid #ccc",
                        borderRadius: 8,
                        resize: "none",
                    }}
                />

                {/* 시간 */}
                <label style={{ fontSize: 13, fontWeight: 500 }}>
                    시간
                </label>
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
                        style={{
                            flex: 1,
                            padding: 8,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            background: "white",
                        }}
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
                            border: "none",
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
