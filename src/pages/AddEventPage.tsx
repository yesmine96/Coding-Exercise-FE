import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEvents } from "../contexts/eventContext/EventContext";
import { EventForm } from "../features/eventForm/EventForm";
import type { Event } from "../types/Event";

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const handleAddEvent = (data: Event) => {
    try {
      addEvent(data);
      toast.success("Event added successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to add event. Please try again.");
    }
  };

  return (
    <div className="max-w-sm lg:max-w-3xl xl:max-w-lg mx-auto px-6 pb-6 lg:p-6 bg-white rounded-xl shadow-md space-y-6 my-12 lg:px-12">
      <h2 className="text-2xl font-bold text-center">Add New Event</h2>
      <EventForm onSubmit={handleAddEvent} submitLabel="Add Event" />
    </div>
  );
}
