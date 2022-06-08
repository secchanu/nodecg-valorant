import type { MatchDto } from "../../../../@types/valorant";


export function sortPlayers(result: MatchDto) {
  const teams = result.teams;
  teams.sort((a, b) => {
    return (a.won > b.won) ? -1 : 1;
  });
  const teamIds = teams.map(t => t.teamId);
  const players = result.players.filter(player => teamIds.includes(player.teamId));
  players.sort((a, b) => {
    return (a.stats.score > b.stats.score) ? -1 : 1;
  });
  const sorted = teamIds.map(teamId => {
    return players.filter(p => p.teamId === teamId);
  });
  return sorted;
}
