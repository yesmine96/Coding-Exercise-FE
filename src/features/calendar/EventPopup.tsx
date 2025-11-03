import React from "react";
import type { Event } from "../../types/Event";
import Popup from "../../components/ui/Popup";
import { formatDate } from "../../utils/formatDate";

export type EventItem = Pick<
  Event,
  "sport" | "homeTeam" | "awayTeam" | "timeVenueUTC"
>;
interface EventPopupProps {
  events: EventItem[];
  open: boolean;
  onClose: () => void;
  selectedDate: string;
}
const EventPopup: React.FC<EventPopupProps> = ({
  events,
  open,
  onClose,
  selectedDate,
}) => {
  return (
    <Popup
      open={open}
      onClose={onClose}
      title={`Events on ${formatDate(selectedDate) ?? ""}`}
      classname="lg:w-82"
    >
      <div className="space-y-2">
        {events.length === 0 ? (
          <div className="text-sm text-gray-500">No events</div>
        ) : (
          <ul className="flex flex-col gap-2">
            {events.map((ev, i) => {
              const home =
                ev.homeTeam?.abbreviation ?? ev.homeTeam?.officialName ?? "—";
              const away =
                ev.awayTeam?.abbreviation ?? ev.awayTeam?.officialName ?? "—";

              return (
                <li
                  key={i}
                  className="flex gap-2 items-start bg-gray-50 p-2 rounded shadow-sm"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mt-1" />
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">
                      {ev.sport ?? "—"}
                    </div>
                    <div className="text-xs text-gray-600 hidden lg:block">
                      {home} vs {away}
                    </div>
                    <div className="text-xs text-gray-600">
                      {ev.timeVenueUTC.slice(0, 5)}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Popup>
  );
};

export default EventPopup;
