import { Component, input } from '@angular/core';

@Component({
  selector: 'bb-team-list',
  imports: [],
  templateUrl: './team-list.html',
  styleUrl: './team-list.scss',
})
export class TeamList {
  public teams = input.required<string[]>()
}
