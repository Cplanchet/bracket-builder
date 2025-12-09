export class Matchup {
  public readonly teamOne: string;
  public readonly teamTwo: string;
  public winner: string | null = null;

  constructor(teamOne: string, teamTwo: string) {
    this.teamOne = teamOne;
    this.teamTwo = teamTwo;
  }

  public setWinner(winner: string | null) {
    if (!winner) {
      this.winner = null;
    } else if (winner === this.teamOne) {
      this.winner = this.teamOne;
    } else if (winner === this.teamTwo) {
      this.winner = this.teamTwo;
    } else {
      throw new Error(`winner must be one of the teams in the matchup, received ${winner}`);
    }
  }
}
