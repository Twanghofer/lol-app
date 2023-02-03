import { Summoner } from "@/helpers/api";

export default function SummonerDetail({ summoner }: { summoner: Summoner }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl text-slate-200">{summoner.name}</h1>
      <ul className="text-lg">
        <li>
          You are most likely to win on a <strong>Sunday</strong>
        </li>
      </ul>
    </div>
  );
}
