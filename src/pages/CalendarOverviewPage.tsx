import Calendar from "../features/calendar/Calendar";
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

export default function CalendarOverviewPage() {
  return (
    <div className="px-16">
      <Calendar year={year} month={month} />
    </div>
  );
}
