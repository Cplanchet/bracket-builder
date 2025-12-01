import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BracketService } from '../../services/bracket-service';
import { Bracket } from '../../models/bracket';
import { NavigationService, Page } from '../../navigation-service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Matchup } from '../../components/matchup/matchup';

@Component({
  selector: 'bb-bracket-page',
  imports: [Matchup],
  templateUrl: './bracket-page.html',
  styleUrl: './bracket-page.scss',
})
export class BracketPage implements OnInit, OnDestroy {
  private bracketService = inject(BracketService);
  private navService = inject(NavigationService);
  private onDestroy$: Subject<void> = new Subject();
  public bracketData = signal<Bracket | null>(null);

  ngOnInit(): void {
    this.bracketService.teams$.pipe(takeUntil(this.onDestroy$)).subscribe(item => {
      this.bracketData.set(item);
    });
    if (this.bracketData()?.matchups && this.bracketData()!.matchups!.length < 1) {
      this.navService.navigateTo(Page.HOME)
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onWinnerChange(index: number, winner: string | null) {
    const copy = this.bracketData();
    copy?.matchups[index].setWinner(winner);

    if (copy) {
      this.bracketService.saveBracket(copy);
    }

  }
}
