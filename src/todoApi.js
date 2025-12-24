import { collection, addDoc, query, where, orderBy, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const subscribeTodos = (uid, callback) => {
    const q = query(
        collection(db, "todos"),
        where("ownerUid", "==", uid),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(list);
    });
};

export const addTodo = (uid, text) =>
    addDoc(collection(db, "todos"), {
        text,
        completed: false,
        ownerUid: uid,
        createdAt: serverTimestamp(),
    });

export const toggleTodo = (id, completed) =>
    updateDoc(doc(db, "todos", id), { completed });

export const removeTodo = (id) =>
    deleteDoc(doc(db, "todos", id));
