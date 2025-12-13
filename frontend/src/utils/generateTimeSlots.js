// utils/generateTimeSlots.js
export function generateTimeSlots(start = "10:00", end = "17:00", interval = 15) {
  const slots = [];
  let [hour, minute] = start.split(":").map(Number);

  const [endHour, endMinute] = end.split(":").map(Number);

  while (hour < endHour || (hour === endHour && minute <= endMinute)) {
    const t = new Date();
    t.setHours(hour, minute, 0);

    slots.push({
      label: t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
    });

    minute += interval;
    if (minute >= 60) {
      minute -= 60;
      hour++;
    }
  }
  return slots;
}
