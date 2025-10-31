export interface Team {
  officialName?: string;
  abbreviation?: string;
}

export interface Result {
  homeGoals: number;
  awayGoals: number;
}

export interface Match {
  season: number;
  status: string;
  timeVenueUTC: string;
  dateVenue: string;
  homeTeam: Team;
  awayTeam: Team;
  result: Result;
  sport: string;
}

export interface MatchesData {
  data: Match[];
}
