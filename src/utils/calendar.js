export function getMonthMatrix(year, month) {
    const firstDay = new Date(year, month, 1);
    const startDay = new Date(firstDay);
    startDay.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7));

    const matrix = [];
    for (let i = 0; i < 42; i++) {
        const d = new Date(startDay);
        d.setDate(startDay.getDate() + i);
        matrix.push(d);
    }
    return matrix;
}

export function formatDate(date) {
    return date.toISOString().split("T")[0];
}

export function isSameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}
