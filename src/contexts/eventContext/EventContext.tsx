import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { nanoid } from "nanoid";
import type { Event, EventFilters, EventsData } from "../../types/Event";
import { useCachedFetch } from "../../hooks/useCachedFetch";
import { nullIfEmpty } from "../../utils/nullifyEmptyObjects";

interface EventContextType {
  events: Event[];
  filters: EventFilters;
  filteredEvents: Event[];
  loading: boolean;
  error: string | null;
  getEventById: (id: string) => Event | undefined;
  addEvent: (event: Event) => void;
  updateFilter: (newFilters: Partial<EventFilters>) => void;
  resetFilters: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mapWithIds = useCallback(
    (json: EventsData): Event[] =>
      json.data.map((item) => ({ ...item, id: nanoid() })),
    []
  );
  const { data, loading, error } = useCachedFetch<EventsData, Event[]>(
    "/data/events.json",
    "events_data",
    mapWithIds
  );
  const [events, setEvents] = useState<Event[]>(data || []);

  const [filters, setFilters] = useState<EventFilters>({
    sport: "",
    status: "",
  });

  useEffect(() => {
    if (!data) return;
    setEvents(data);
  }, [data]);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events_data", JSON.stringify(events));
    }
  }, [events]);

  const eventsMap = useMemo(
    () => new Map(events.map((event) => [event.id, event])),
    [events]
  );

  const getEventById = useCallback(
    (id: string) => eventsMap.get(id),
    [eventsMap]
  );

  const addEvent = (newEvent: Event) => {
    const event: Event = { ...newEvent, id: nanoid() };
    const cleanedData = nullIfEmpty(event) as Event;
    localStorage.setItem("events_data", JSON.stringify(events));
    setEvents((prev) => (prev ? [...prev, cleanedData] : [event]));
  };

  const filteredEvents = useMemo(() => {
    if (!events) return [];

    return events?.filter((event) => {
      if (filters.sport && event.sport !== filters.sport) return false;
      if (filters.status && event.status !== filters.status) return false;
      return true;
    });
  }, [events, filters]);

  const updateFilter = (newFilters: Partial<EventFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };
  const resetFilters = () => setFilters({});

  const value = useMemo(
    () => ({
      events,
      filters,
      filteredEvents,
      loading,
      error,
      getEventById,
      addEvent,
      updateFilter,
      resetFilters,
    }),
    [events, filteredEvents, loading, error, getEventById]
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
