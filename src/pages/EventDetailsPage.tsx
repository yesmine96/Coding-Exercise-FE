import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../contexts/eventContext/EventContext";
import EventDetails from "../features/eventCard/EventDetails";
import { useEffect } from "react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const { getEventById } = useEvents();
  const event = getEventById(id!);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !event) {
      navigate("/", { replace: true });
    }
  }, [id, event]);

  if (!event) {
    return <div>Loading...</div>;
  }
  return <>{event && <EventDetails event={event} />}</>;
}
