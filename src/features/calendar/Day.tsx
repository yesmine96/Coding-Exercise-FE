import React from "react";
import type { Match } from "../../types/Event";
export type EventItem = Pick<
  Match,
  "sport" | "homeTeam" | "awayTeam" | "dateVenue"
>;

interface DayProps {
  day: number;
  events: EventItem[];
}

const Day: React.FC<DayProps> = ({ day, events }) => {
  return (
    <div className="border p-2 rounded-sm ">
      <span className="font-semibold">{day}</span>
      <div className=" py-1">
        {events.map((event, id) => (
          <div className="flex gap-2 items-start" key={id}>
            <span className="w-2 h-2 bg-primary rounded-full mt-1"></span>
            <span className="text-xs">
              {event.sport} {event.homeTeam.abbreviation} vs{" "}
              {event.awayTeam.abbreviation}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
