import { createContext, useContext, useMemo } from "react";
import type { EventsData, Event } from "../types/Event";
import { useFetch } from "../hooks/useFetch";
import { nanoid } from "nanoid";

interface EventContextType {
  events: Event[] | null;
  loading: boolean;
  error: string | null;
  getEventById: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, error } = useFetch<EventsData>("/data/events.json");

  const { events, getEventById } = useMemo(() => {
    if (!data?.data) {
      return {
        events: null,
        getEventById: (_id: string) => undefined,
      };
    }

    const eventsArray: Event[] = data.data.map((event) => ({
      ...event,
      id: nanoid(),
    }));

    const eventsMap = new Map(eventsArray.map((item) => [item.id, item]));

    const getEventById = (id: string) => eventsMap.get(id);

    return {
      events: eventsArray,
      getEventById,
    };
  }, [data]);

  const value = useMemo(
    () => ({
      events,
      loading,
      error,
      getEventById,
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
