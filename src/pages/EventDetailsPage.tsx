import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../contexts/eventContext/EventContext";
import EventDetails from "../features/eventCard/EventDetails";
import { useEffect } from "react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const { getEventById, loading } = useEvents();
  const event = getEventById(id!);
  const navigate = useNavigate();

  useEffect(() => {
    if ((!id || !event) && loading) {
      void navigate("/", { replace: true });
      return;
    }
  }, [id, event, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>{event && <EventDetails event={event} />}</div>;
}
