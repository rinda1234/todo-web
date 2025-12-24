import { useEffect, useState } from "react";
import { logout } from "./auth";
import { subscribeTodos, addTodo, toggleTodo, removeTodo } from "./todoApi";

export default function Todos({ user }) {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const unsub = subscribeTodos(user.uid, setTodos);
        return () => unsub();
    }, [user.uid]);

    const onAdd = async () => {
        if (!text.trim()) return;
        await addTodo(user.uid, text.trim());
        setText("");
    };

    return (
        <div style={{ padding: 24, maxWidth: 520 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{user.email}</div>
                <button onClick={logout}>로그아웃</button>
            </div>

            <h2 style={{ marginTop: 20 }}>My Todos</h2>

            <div style={{ display: "flex", gap: 8 }}>
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일을 입력" />
                <button onClick={onAdd}>추가</button>
            </div>

            <ul style={{ marginTop: 16, paddingLeft: 16 }}>
                {todos.map((t) => (
                    <li key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <input
                            type="checkbox"
                            checked={!!t.completed}
                            onChange={(e) => toggleTodo(t.id, e.target.checked)}
                        />
                        <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
              {t.text}
            </span>
                        <button onClick={() => removeTodo(t.id)} style={{ marginLeft: "auto" }}>
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
