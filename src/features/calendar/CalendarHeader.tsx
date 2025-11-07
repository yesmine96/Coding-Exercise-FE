import React from "react";

interface CalendarHeaderProps {
  monthName: string;
  year: number;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ monthName, year }) => {
  return (
    <div className="text-center pt-4 pb-2 lg:pt-10">
      <h2 className="text-3xl lg:text-5xl font-bold">
        {monthName} {year}
      </h2>
    </div>
  );
};

export default CalendarHeader;
