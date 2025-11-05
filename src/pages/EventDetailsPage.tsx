import { useParams } from "react-router-dom";
import { useEvents } from "../contexts/EventContext";

export default function EventDetailsPage() {
  const { id } = useParams();
  const { getEventById } = useEvents();
  const event = getEventById(id!);
  console.log(event);
  return (
    <div className="py-16 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg shadow p-4 lg:p-8 w-sm lg:w-xl bg-white min-h-72">
        <h2 className="text-xl font-bold mb-2 text-center">
          {event?.originCompetitionName}
        </h2>
        <div className="text-gray-600 mb-4">
          <span className="font-semibold">Sport:</span> {event?.sport}
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{event?.dateVenue}</span>
          <span> {event?.timeVenueUTC.slice(0, 5)}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col flex-1">
            <span className="text-lg font-bold ">
              {event?.homeTeam?.abbreviation || "TBD"}
            </span>
            <span className="text-xs">
              {event?.homeTeam === null && "Depends on previous match"}
            </span>
          </div>
          <span className="flex-1 flex justify-between">
            <span> {event?.result?.homeGoals}</span>
            <span> -</span>
            <span> {event?.result?.awayGoals}</span>
          </span>
          <div className="flex flex-col flex-1 items-end">
            <span className="text-lg font-bold ">
              {event?.awayTeam?.abbreviation || "TBD"}
            </span>

            <span className="text-xs">
              {event?.awayTeam === null && "Depends on previous match"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center text-gray-600 text-sm">
          <span>{event?.status}</span>
          <span>{event?.stage?.name}</span>
        </div>
      </div>
    </div>
  );
}
