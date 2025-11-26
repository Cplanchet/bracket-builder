import { Component, signal } from '@angular/core';
import { TeamList } from '../../components/team-list/team-list';
import { FormsModule } from '@angular/forms';
import { Textfield } from "../../components/textfield/textfield";
import { Button } from '../../components/button/button';
import { IconButton } from '../../components/icon-button/icon-button';

@Component({
  selector: 'bb-home-page',
  imports: [TeamList, FormsModule, Textfield, Button, IconButton],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  public teams = signal<string[]>([]);
  public fieldValue = signal<string>('');
  public fieldError = signal<string>('');

  public onSubmitEntry() {
    if (!this.validateFieldEntry()) {
      return;
    }
    this.teams.update((teams) => [...teams, this.fieldValue()]);
    this.clearFieldValues();
  }

  private validateFieldEntry() {
    if (!this.fieldValue()) {
      this.fieldError.set('Team name is required');
      return false;
    }
    if (this.teams().includes(this.fieldValue())) {
      this.fieldError.set('Team already exists');
      return false;
    }
    return true;
  }

  private clearFieldValues() {
    this.fieldValue.set('');
    this.fieldError.set('');
  }

  protected deleteTeam(team: string) {
    this.teams.update(teams => teams.filter(t => t !== team))
  }
}
