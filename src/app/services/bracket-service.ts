import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bracket } from '../models/bracket';

@Injectable({
  providedIn: 'root',
})
export class BracketService {
  private _teams: string[] = [];
  public teams$: BehaviorSubject<Bracket> = new BehaviorSubject(new Bracket(this._teams));

  public saveTeamsAsBracket(teams: string[]) {
    if (teams.length < 2) {
      throw new Error(`Must be a list of 2 or more teams got list: ${teams.toString()}`)
    }
    this._teams = teams;
    this.updateSubject();
  }

  public saveBracket(bracket: Bracket) {
    this.teams$.next(bracket);
  }

  private updateSubject() {
    this.teams$.next(new Bracket(this._teams));
  }
}
