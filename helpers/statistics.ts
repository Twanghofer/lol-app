import { SummonerMatch } from "@/types";

export class MatchStatistics {
  matches: SummonerMatch[] = [];
  wins = 0;
  losses = 0;
  winrate = 0;

  constructor(matches: SummonerMatch[]) {
    this.matches = matches;
    this.wins = matches.filter((match) => match.win).length;
    this.losses = matches.filter((match) => !match.win).length;
    this.winrate = this.wins / (this.wins + this.losses);
  }

  getWinrateByProperty(property: keyof SummonerMatch) {
    return this.matches.reduce(
      (acc, match) => {
        const key = match[property].toString();

        if (!acc[key]) {
          acc[key] = {
            wins: 0,
            losses: 0,
          };
        }
        if (match.win) {
          acc[key].wins += 1;
        } else {
          acc[key].losses += 1;
        }
        return acc;
      },
      {} as {
        [key: string]: {
          wins: number;
          losses: number;
        };
      }
    );
  }

  getLowestWinrateByProperty(property: keyof SummonerMatch) {
    const winrates = this.getWinrateByProperty(property);
    return Object.keys(winrates).reduce(
      (acc, name) => {
        const winrate =
          winrates[name].wins / (winrates[name].wins + winrates[name].losses);
        if (winrate < acc.winrate) {
          acc = {
            name,
            winrate,
          };
        }
        return acc;
      },
      {
        name: "",
        winrate: 1,
      }
    );
  }

  getHighestWinrateByProperty(property: keyof SummonerMatch) {
    const winrates = this.getWinrateByProperty(property);
    return Object.keys(winrates).reduce(
      (acc, name) => {
        const winrate =
          winrates[name].wins / (winrates[name].wins + winrates[name].losses);
        if (winrate > acc.winrate) {
          acc = {
            name,
            winrate,
          };
        }
        return acc;
      },
      {
        name: "",
        winrate: 1,
      }
    );
  }
}
