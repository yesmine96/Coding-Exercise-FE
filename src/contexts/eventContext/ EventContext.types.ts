import type { Event, EventFilters } from "../../types/Event";

export interface EventContextType {
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
