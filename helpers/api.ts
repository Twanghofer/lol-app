import axios from "axios";

axios.defaults.baseURL = "https://euw1.api.riotgames.com";
axios.defaults.headers.common["X-Riot-Token"] = process.env.RIOT_API_KEY;

export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

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
  } catch {
    return [null, "Summoner not found"];
  }
}

export async function getSummonerMatches(
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
  } catch {
    return [[], "Failed gettings stats"];
  }
}
