import React from "react";
import type { CalendarEvent } from "../../types/Event";
import Popup from "../../components/ui/Popup";
import { formatDate } from "../../utils/formatDate";
import { getTeams } from "../../utils/eventUtils";
import { useNavigate } from "react-router-dom";

interface EventPopupProps {
  events: CalendarEvent[];
  open: boolean;
  onClose: () => void;
  selectedDate: string;
}
const EventPopup: React.FC<EventPopupProps> = ({ events, open, onClose, selectedDate }) => {
  const navigate = useNavigate();

  return (
    <Popup
      open={open}
      onClose={onClose}
      title={`Events on ${formatDate(selectedDate) ?? ""}`}
      classname="lg:w-82 overflow-auto"
    >
      <div className="space-y-2">
        {events.length === 0 ? (
          <div className="text-sm text-gray-500">No events</div>
        ) : (
          <ul className="flex flex-col gap-2">
            {events.map((event, i) => {
              const { homeTeam, awayTeam, isTBD } = getTeams(event);

              return (
                <li
                  key={i}
                  className="flex gap-2 items-start bg-gray-50 p-2 rounded shadow-sm cursor-pointer"
                  onClick={() => void navigate(`/event/${event.id}`)}
                >
                  <span className="w-2 h-2 bg-primary rounded-full mt-1" />
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">{event.sport}</div>
                    <div className="text-xs text-gray-600 hidden lg:flex lg:gap-1">
                      <span>
                        {homeTeam} vs {awayTeam}
                      </span>
                      {isTBD && event.stage?.name && (
                        <span className="text-muted-foreground">({event.stage.name})</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">{event.timeVenueUTC.slice(0, 5)}</div>
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
