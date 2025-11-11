import type { Event, EventFilters } from "../../types/Event";

export interface EventContextType {
  events: Event[];
  filters: EventFilters;
  filteredEvents: Event[];
  loading: boolean;
  error: string | null;
  getEventById: (_id: string) => Event | undefined;
  addEvent: (_event: Event) => void;
  updateFilter: (_newFilters: Partial<EventFilters>) => void;
  resetFilters: () => void;
}
