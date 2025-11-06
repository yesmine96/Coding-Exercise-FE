import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { EventsData, Event } from "../types/Event";
import { useFetch } from "../hooks/useFetch";
import { nanoid } from "nanoid";

interface EventContextType {
  events: Event[] | null;
  loading: boolean;
  error: string | null;
  getEventById: (id: string) => Event | undefined;
  addEvent: (event: Event) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, error } = useFetch<EventsData>("/data/events.json");
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    if (!data?.data) return;
    const eventsArray: Event[] = data.data.map((event) => ({
      ...event,
      id: nanoid(),
    }));

    setEvents(eventsArray);
  }, [data]);

  const { getEventById } = useMemo(() => {
    if (!events) {
      return {
        eventsMap: new Map(),
        getEventById: (_id: string) => undefined,
      };
    }
    const eventsMap = new Map(events.map((item) => [item.id, item]));
    const getEventById = (id: string) => eventsMap.get(id);

    return {
      eventsMap,
      getEventById,
    };
  }, [events]);

  const addEvent = (newEvent: Event) => {
    const event: Event = { ...newEvent, id: nanoid() };
    setEvents((prev) => (prev ? [...prev, event] : [event]));
  };

  const value = useMemo(
    () => ({
      events,
      loading,
      error,
      getEventById,
      addEvent,
    }),
    [events, loading, error, getEventById]
  );
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used inside an EventProvider");
  }
  return context;
};
