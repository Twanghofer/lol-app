import { MatchStatistics } from "@/helpers/statistics";
import { Summoner, SummonerMatch } from "@/types";

export default function SummonerDetail({
  summoner,
  matches,
}: {
  summoner: Summoner;
  matches: SummonerMatch[];
}) {
  const matchStats = new MatchStatistics(matches);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl text-slate-200">{summoner.name}</h1>
      <ul className="text-lg">
        <li>
          You suck on{" "}
          <strong>
            {matchStats.getLowestWinrateByProperty("weekday").name}
          </strong>
        </li>
        <li>
          Stop playing{" "}
          <strong>
            {matchStats.getLowestWinrateByProperty("championName").name}
          </strong>
          . Just stop.
        </li>
      </ul>
    </div>
  );
}
