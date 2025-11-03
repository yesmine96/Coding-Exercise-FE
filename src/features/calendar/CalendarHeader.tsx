import React from "react";

interface CalendarHeaderProps {
  monthName: string;
  year: number;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ monthName, year }) => {
  return (
    <div className="text-center py-6 lg:py-14">
      <h2 className="text-3xl lg:text-5xl font-bold">
        {monthName} {year}
      </h2>
    </div>
  );
};

export default CalendarHeader;
