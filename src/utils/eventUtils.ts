import type { CalendarEvent } from "../types/Event";

export function getTeams(event?: CalendarEvent) {
  const homeTeam = event?.awayTeam?.abbreviation ?? event?.awayTeam?.officialName ?? "TBD Team";

  const awayTeam = event?.homeTeam?.abbreviation ?? event?.homeTeam?.officialName ?? "TBD Team";

  const isTBD = homeTeam === "TBD Team" || awayTeam === "TBD Team";

  return { homeTeam, awayTeam, isTBD };
}
