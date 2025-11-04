import React, { useMemo } from "react";
import type { CalendarEvent } from "../../types/Event";
import { getTeams } from "../../utils/eventUtils";

interface DayProps {
  day: number;
  events: CalendarEvent[];
}

const Day: React.FC<DayProps> = ({ day, events }) => {
  const displayedEvents = useMemo(() => events.slice(0, 3), [events]);

  return (
    <div className="lg:p-2 md:min-h-20 pt-2">
      <span className="font-semibold">{day}</span>
      <div className="py-1 space-y-1">
        {displayedEvents.map((event, index) => {
          const { homeTeam, awayTeam, isTBD } = getTeams(event);
          return (
            <div key={index} className="flex gap-1 items-start">
              <span className="w-1 h-1 bg-primary rounded-full mt-1.5 lg:mt-2" />
              <div className="text-xs flex gap-1 flex-wrap">
                <span className="font-semibold">
                  {event.sport?.slice(0, 4)}
                </span>
                <span className="hidden lg:block">
                  {homeTeam} vs {awayTeam}
                </span>
                {isTBD && event.stage?.name && (
                  <span className="hidden lg:block ">({event.stage.name})</span>
                )}
              </div>
            </div>
          );
        })}

        {events.length > 3 && <div className="text-xs mt-1">more ...</div>}
      </div>
    </div>
  );
};

export default Day;
