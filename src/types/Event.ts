export interface EventsData {
  data: Event[];
}

export interface Event {
  season?: number;
  status?: string;
  timeVenueUTC: string;
  dateVenue: string;
  homeTeam: Team | null;
  awayTeam: Team | null;
  result?: Result | null;
  sport: string;
  stage?: Stage;
  id?: string;
  originCompetitionName: string;
}

export interface Team {
  officialName?: string;
  abbreviation?: string;
}

export interface Result {
  homeGoals?: number;
  awayGoals?: number;
}

export interface Stage {
  id?: string;
  name?: string;
  ordering?: number;
}

export type CalendarEvent = Pick<
  Event,
  "sport" | "homeTeam" | "awayTeam" | "dateVenue" | "timeVenueUTC" | "stage" | "id"
>;

export type EventFilters = {
  sport?: string;
  status?: string;
};
