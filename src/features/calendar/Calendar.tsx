import React, { useMemo, useState } from "react";
import Day from "./Day";
import EventPopup from "./EventPopup";
import { usePopup } from "../../hooks/usePopup";
import { useEvents } from "../../contexts/EventContext";
import type { CalendarEvent } from "../../types/Event";

interface CalendarProps {
  year: number;
  month: number;
}
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const popup = usePopup();
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const { events, loading, error } = useEvents();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  // Create an array of days for the month
  const daysArray = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) arr.push(null);
    for (let day = 1; day <= daysInMonth; day++) arr.push(day);
    return arr;
  }, [startDay, daysInMonth]);

  // Return date in "YYYY-MM-DD" format
  const getDateString = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  if (loading) return <div className="p-6">Loading events…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div>
      <div className="grid grid-cols-7 lg:gap-2 text-center font-semibold mb-2 text-primary ">
        {weekdays.map((d) => (
          <div className="border-b-1 border-secondary" key={d}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7  lg:gap-2 ">
        {daysArray.map((day, index) =>
          day ? (
            <div
              key={index}
              className="min-h-26 border-b-1"
              onClick={() => {
                const dayEvents =
                  events?.filter(
                    (event) => event.dateVenue === getDateString(day)
                  ) ?? [];
                setSelectedEvents(dayEvents);
                setSelectedDate(getDateString(day));
                popup.openPopup();
              }}
            >
              <Day
                key={index}
                day={day}
                events={
                  events?.filter(
                    (event) => event.dateVenue === getDateString(day)
                  ) ?? []
                }
              />
            </div>
          ) : (
            <div key={index} className=" border-b-1" />
          )
        )}
      </div>

      {popup.open && (
        <EventPopup
          events={selectedEvents}
          open={popup.open}
          onClose={popup.closePopup}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default Calendar;
