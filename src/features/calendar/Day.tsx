import React from "react";
import type { Event } from "../../types/Event";
export type EventItem = Pick<
  Event,
  "sport" | "homeTeam" | "awayTeam" | "dateVenue"
>;

interface DayProps {
  day: number;
  events: EventItem[];
}

const Day: React.FC<DayProps> = ({ day, events }) => {
  return (
    <div className="lg:p-2 md:min-h-20 pt-2">
      <span className="font-semibold">{day}</span>
      <div className=" py-1">
        {events.slice(0, 3).map((event, id) => {
          const homeTeam =
            event.homeTeam?.abbreviation ?? event.homeTeam?.officialName ?? "—";
          const awayTeam =
            event.awayTeam?.abbreviation ?? event.awayTeam?.officialName ?? "—";

          return (
            <div className="flex gap-1 items-start" key={id}>
              <span className="w-1 h-1 lg:w-2 lg:h-2 bg-primary rounded-full mt-1"></span>
              <div className="text-xs lg:text-sm flex gap-1">
                <span className="font-semibold">{event.sport}</span>
                <span className="hidden lg:block">
                  {homeTeam} vs {awayTeam}
                </span>
              </div>
            </div>
          );
        })}

        {events.length > 3 && (
          <div className="text-xs lg:text-sm mt-1">more ...</div>
        )}
      </div>
    </div>
  );
};

export default Day;
