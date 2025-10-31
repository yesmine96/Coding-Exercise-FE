export interface Team {
  officialName?: string;
  abbreviation?: string;
}

export interface Result {
  homeGoals: number;
  awayGoals: number;
}

export interface Event {
  season: number;
  status?: string;
  timeVenueUTC: string;
  dateVenue: string;
  homeTeam?: Team;
  awayTeam?: Team;
  result?: Result;
  sport?: string;
}

export interface EventsData {
  data: Event[];
}
