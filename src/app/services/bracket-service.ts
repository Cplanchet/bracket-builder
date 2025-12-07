import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bracket } from '../models/bracket';

@Injectable({
  providedIn: 'root',
})
export class BracketService {
  private _teams: string[] = [];
  private _bracket: Bracket | null = null;
  private _winner: string | null = null;
  public readonly teams$: BehaviorSubject<Bracket | null> = new BehaviorSubject(this._bracket);
  public readonly winner$: BehaviorSubject<string | null> = new BehaviorSubject(this._winner);

  public saveTeamsAsBracket(teams: string[]) {
    if (teams.length < 2) {
      throw new Error(`Must be a list of 2 or more teams got list: ${teams.toString()}`);
    }
    this.setTeamsAndBracket(teams);
  }

  public saveBracket(bracket: Bracket) {
    if (bracket) {
      this.setBracket(bracket);
      this.checkforWinner();
    }
  }

  private setTeamsAndBracket(teams: string[]) {
    if (teams === this._teams) {
      return;
    }
    this._teams = teams;
    this.setBracket(new Bracket(this._teams));
  }

  private setBracket(bracket: Bracket) {
    this._bracket = bracket;
    this.teams$.next(this._bracket);
  }

  private checkforWinner() {
    console.log('checking...');
    if (!this._bracket?.calculateNextTier() && this._bracket?.matchups[0].winner) {
      this.setWinner(this._bracket.matchups[0].winner);
    }
    console.log('None found');
  }

  private setWinner(winner: string) {
    if (this._winner === winner) {
      return;
    }
    this._winner = winner;
    this.winner$.next(this._winner);
  }
}
