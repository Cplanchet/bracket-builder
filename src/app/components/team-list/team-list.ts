import { Component, input, output } from '@angular/core';
import { IconButton } from '../icon-button/icon-button';

@Component({
  selector: 'bb-team-list',
  imports: [IconButton],
  templateUrl: './team-list.html',
  styleUrl: './team-list.scss',
})
export class TeamList {
  public teams = input.required<string[]>();
  public delete = output<string>();

  public onDeleteButtonPress(name: string) {
    if (name) {
      this.delete.emit(name);
    }
  }
}
