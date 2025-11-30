import { Component, inject } from '@angular/core';
import { BracketService } from '../../services/bracket-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'bb-bracket-page',
  imports: [AsyncPipe],
  templateUrl: './bracket-page.html',
  styleUrl: './bracket-page.scss',
})
export class BracketPage {
  private bracketService = inject(BracketService);
  protected data$ = this.bracketService.teams$;
}
