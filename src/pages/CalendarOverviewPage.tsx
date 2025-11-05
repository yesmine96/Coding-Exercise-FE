import Calendar from "../features/calendar/Calendar";
import CalendarHeader from "../features/calendar/CalendarHeader";
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const monthName = today.toLocaleString("default", { month: "long" });

export default function CalendarOverviewPage() {
  return (
    <div className="px-2 lg:px-16">
      <CalendarHeader monthName={monthName} year={year} />
      <Calendar year={year} month={month} />
    </div>
  );
}
