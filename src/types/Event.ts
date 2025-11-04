export interface Team {
  officialName?: string;
  abbreviation?: string;
}

export interface Result {
  homeGoals: number;
  awayGoals: number;
}
export interface Stage {
  id: number;
  name: number;
  ordering: number;
}

export interface Event {
  season: number;
  status?: string;
  timeVenueUTC: string;
  dateVenue: string;
  homeTeam?: Team;
  awayTeam?: Team;
  result?: Result;
  sport: string;
  stage?: Stage;
}

export interface EventsData {
  data: Event[];
}
export type CalendarEvent = Pick<
  Event,
  "sport" | "homeTeam" | "awayTeam" | "dateVenue" | "timeVenueUTC" | "stage"
>;
