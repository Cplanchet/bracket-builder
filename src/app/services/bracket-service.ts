import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bracket } from '../models/bracket';

@Injectable({
  providedIn: 'root',
})
export class BracketService {
  private _teams: string[] = [];
  private _bracket: Bracket | null = null;
  private _winner: string | null = null;
  private _teams$: BehaviorSubject<Bracket | null> = new BehaviorSubject(this._bracket);
  private _winner$: BehaviorSubject<string | null> = new BehaviorSubject(this._winner);

  public readonly teams$: Observable<Bracket | null> = this._teams$.asObservable();
  public readonly winner$: Observable<string | null> = this._winner$.asObservable();

  public saveTeamsAsBracket(teams: string[]) {
    if (teams.length < 2) {
      throw new Error(`Must be a list of 2 or more teams got list: ${teams.toString()}`);
    }
    this.setTeamsAndBracket(teams);
  }

  public saveBracket(bracket: Bracket) {
    this.setBracket(bracket);
    this.checkForWinner();
  }

  private setTeamsAndBracket(teams: string[]) {
    this._teams = teams;
    this.setBracket(new Bracket(this._teams));
  }

  private setBracket(bracket: Bracket) {
    this._bracket = bracket;
    this._teams$.next(this._bracket);
  }

  private checkForWinner() {
    if (
      this._bracket?.matchups.every((bracket) => bracket.winner) &&
      !this._bracket?.calculateNextTier()
    ) {
      this.setWinner(this._bracket.matchups[0].winner!);
    }
  }

  private setWinner(winner: string) {
    if (this._winner === winner) {
      return;
    }
    this._winner = winner;
    this._winner$.next(this._winner);
  }
}
