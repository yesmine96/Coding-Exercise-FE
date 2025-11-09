import { useEvents } from "../contexts/eventContext/EventContext";
import Calendar from "../features/calendar/Calendar";
import CalendarHeader from "../features/calendar/CalendarHeader";
import EventFilters from "../features/calendar/EventFilters";
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const monthName = today.toLocaleString("default", { month: "long" });

export default function CalendarOverviewPage() {
  const { filteredEvents } = useEvents();
  return (
    <div className="px-2 lg:px-16">
      <CalendarHeader monthName={monthName} year={year} />
      <EventFilters />
      <Calendar year={year} month={month} events={filteredEvents} />
    </div>
  );
}
