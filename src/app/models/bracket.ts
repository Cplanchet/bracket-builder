import { Matchup } from "./matchup";

export class Bracket {
  private extra: string | null;
  public matchups: Matchup[];

  constructor(teams: string[]) {
    this.matchups = [];
    this.extra = teams.length % 2 == 0 ? null : teams[0]

    for (let i = this.extra ? 1 : 0; i < teams.length; i += 2) {
      this.matchups.push(new Matchup(teams[i], teams[i + 1]))
    }
  }
}
