import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bracket } from '../models/bracket';

@Injectable({
  providedIn: 'root',
})
export class BracketService {
  private _teams: string[] = [];
  private _bracket: Bracket = new Bracket(this._teams);
  public teams$: BehaviorSubject<Bracket> = new BehaviorSubject(this._bracket);

  public saveTeamsAsBracket(teams: string[]) {
    if (teams.length < 2) {
      throw new Error(`Must be a list of 2 or more teams got list: ${teams.toString()}`)
    }
    this.setTeamsAndBracket(teams)
    this.updateSubject();
  }

  public saveBracket(bracket: Bracket) {
    this.teams$.next(bracket);
  }

  private updateSubject() {
    this._bracket = new Bracket(this._teams)
    this.teams$.next(this._bracket);
  }

  private setTeamsAndBracket(teams: string[]) {
    if (teams === this._teams) {
      return;
    }
    this._teams = teams;
    this.setBracket(new Bracket(this._teams))
  }

  private setBracket(bracket: Bracket) {
    if (bracket === this._bracket) {
      return;
    }
    this._bracket = bracket;
    this.teams$.next(this._bracket)
  }
}
