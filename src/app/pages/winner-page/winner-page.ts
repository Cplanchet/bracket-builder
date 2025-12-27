import { Component, inject } from '@angular/core';
import { Button } from '../../components/button/button';
import { BracketService } from '../../services/bracket-service';
import { AsyncPipe } from '@angular/common';
import { NavigationService, Page } from '../../services/navigation-service';

@Component({
  selector: 'bb-winner-page',
  imports: [Button, AsyncPipe],
  templateUrl: './winner-page.html',
  styleUrl: './winner-page.scss',
})
export class WinnerPage {
  public bracketService = inject(BracketService);
  public navigationService = inject(NavigationService);

  public onHomeButtonPress() {
    this.bracketService.reset();
    this.navigationService.navigateTo(Page.HOME);
  }
}
