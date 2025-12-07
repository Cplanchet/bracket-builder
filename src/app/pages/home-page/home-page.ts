import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { TeamList } from '../../components/team-list/team-list';
import { FormsModule } from '@angular/forms';
import { Textfield } from '../../components/textfield/textfield';
import { Button } from '../../components/button/button';
import { BracketService } from '../../services/bracket-service';
import { NavigationService, Page } from '../../services/navigation-service';

@Component({
  selector: 'bb-home-page',
  imports: [TeamList, FormsModule, Textfield, Button],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  public teams = signal<string[]>([]);
  public fieldValue = signal<string>('');
  public fieldError = signal<string>('');
  public scrollTarget = viewChild.required<ElementRef<HTMLSpanElement>>('scrollTarget');
  public bracketService = inject(BracketService);

  private navigationUtil = inject(NavigationService);

  public onSubmitEntry() {
    if (!this.validateFieldEntry()) {
      return;
    }
    this.teams.update((teams) => [...teams, this.fieldValue()]);
    this.clearFieldValues();
    this.scrollTarget().nativeElement.scrollIntoView();
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
    this.teams.update((teams) => teams.filter((t) => t !== team));
  }

  protected submit() {
    this.bracketService.saveTeamsAsBracket(this.teams());
    this.navigationUtil.navigateTo(Page.BRACKET);
  }
}
