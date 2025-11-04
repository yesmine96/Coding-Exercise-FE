import { createContext, useContext, useMemo } from "react";
import type { EventsData, Event } from "../types/Event";
import { useFetch } from "../hooks/useFetch";

interface EventContextType {
  events: Event[] | null;
  loading: boolean;
  error: string | null;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, error } = useFetch<EventsData>("/data/events.json");
  const events = data?.data ?? null;
  const value = useMemo(
    () => ({ events, loading, error }),
    [events, loading, error]
  );
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used inside an EventProvider");
  }
  return context;
};
