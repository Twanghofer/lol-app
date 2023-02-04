import { Match, Summoner } from "@/types";
import axios from "axios";

axios.defaults.baseURL = "https://euw1.api.riotgames.com";
axios.defaults.headers.common["X-Riot-Token"] = process.env.RIOT_API_KEY;

export async function getSummonerByName(
  name: string
): Promise<[Summoner | null, string]> {
  try {
    const { data } = await axios.get(
      `/lol/summoner/v4/summoners/by-name/${name}`
    );

    if (!data || data?.status?.status_code === 404) {
      return [null, "Summoner not found"];
    }

    return [data as Summoner, ""];
  } catch (e) {
    return [null, "Failed getting summoner: " + e];
  }
}

export async function getSummonerMatchIds(
  summoner: Summoner,
  count: number = 20
): Promise<[string[], string]> {
  if (!summoner) {
    return [[], "No summoner provived"];
  }

  axios.defaults.baseURL = "https://europe.api.riotgames.com";

  try {
    const { data } = await axios.get(
      `/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids`,
      {
        params: {
          count,
        },
      }
    );

    if (!data || data?.status?.status_code === 404) {
      return [[], "Summoner not found"];
    }

    return [data, ""];
  } catch (e) {
    return [[], "Failed getting stats" + e];
  }
}

export async function getMatchById(
  id: string
): Promise<[Match | null, string]> {
  axios.defaults.baseURL = "https://europe.api.riotgames.com";

  try {
    const { data } = await axios.get(`/lol/match/v5/matches/${id}`);

    if (!data || data?.status?.status_code === 404) {
      return [null, "Match not found"];
    }

    return [data, ""];
  } catch (e) {
    return [null, "Failed getting Match: " + e];
  }
}

export async function getMatchesByIds(
  matchIds: string[]
): Promise<[Match[], string]> {
  axios.defaults.baseURL = "https://europe.api.riotgames.com";

  try {
    const responses = await Promise.all(
      matchIds.map((id) => axios.get(`/lol/match/v5/matches/${id}`))
    );
    const data = responses.map((response) => response.data);
    const matches = data.filter((match) => match?.status?.status_code !== 404);

    const failedMatches = data.filter((match) => match?.status?.message);

    return [
      matches,
      `${failedMatches.length} failed match fetches: ${failedMatches?.[0]?.status?.message})}`,
    ];
  } catch (e) {
    return [[], "Failed getting matches: " + e];
  }
}
