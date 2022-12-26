export const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) return `${hours}h`;

    if (hours === 0) return `${minutes}m`;

    return `${hours}h ${minutes}m`;
};