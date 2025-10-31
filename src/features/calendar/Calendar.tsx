import React, { useMemo } from "react";
import Day from "./Day";

interface CalendarProps {
  year: number;
  month: number;
}
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const events = [
  {
    sport: "football",
    homeTeam: { abbreviation: "SHA" },
    awayTeam: { abbreviation: "NAS" },
    dateVenue: "2025-10-03",
  },
];
const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const daysArray = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) arr.push(null);
    for (let day = 1; day <= daysInMonth; day++) arr.push(day);
    return arr;
  }, [startDay, daysInMonth]);
  const getDateString = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return (
    <div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2 pt-36 text-primary">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2  ">
        {daysArray.map((day, index) =>
          day ? (
            <Day
              key={index}
              day={day}
              events={events.filter(
                (event) => event.dateVenue === getDateString(day)
              )}
            />
          ) : (
            <div key={index} className="invisible" />
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
