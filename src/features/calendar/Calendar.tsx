import React, { useMemo } from "react";
import Day from "./Day";
import type { Event, EventsData } from "../../types/Event";
import { useFetch } from "../../hooks/useFetch";

export type EventItem = Pick<
  Event,
  "sport" | "homeTeam" | "awayTeam" | "dateVenue"
>;
interface CalendarProps {
  year: number;
  month: number;
}
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const {
    data: fetched,
    loading,
    error,
  } = useFetch<EventsData>("/data/events.json");
  const eventsList: EventItem[] = fetched?.data ?? [];

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
  if (loading) return <div className="p-6">Loading events…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2 pt-36 text-primary">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysArray.map((day, index) =>
          day ? (
            <Day
              key={index}
              day={day}
              events={eventsList.filter(
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
