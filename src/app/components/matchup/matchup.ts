import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'bb-matchup',
  imports: [Button, NgClass],
  templateUrl: './matchup.html',
  styleUrl: './matchup.scss',
})
export class Matchup {
  public teamOne = input.required<string>({ alias: 'team-one' });
  public teamTwo = input.required<string>({ alias: 'team-two' });
  public winner = input<string | null>();
  public winnerChange = output<string | null>({ alias: 'winner-change' });

  protected onTeamPress(team: '1' | '2') {
    this.winnerChange.emit(team === '1' ? this.teamOne() : this.teamTwo());
    return;
  }
}
