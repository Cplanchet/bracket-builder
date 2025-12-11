import { Component, inject, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BracketService } from '../../services/bracket-service';
import { Bracket } from '../../models/bracket';
import { NavigationService, Page } from '../../services/navigation-service';
import { Subject, takeUntil } from 'rxjs';
import { Matchup } from '../../components/matchup/matchup';
import { Button } from '../../components/button/button';

@Component({
  selector: 'bb-bracket-page',
  imports: [Matchup, Button],
  templateUrl: './bracket-page.html',
  styleUrl: './bracket-page.scss',
})
export class BracketPage implements OnInit, OnDestroy {
  private bracketService = inject(BracketService);
  private navService = inject(NavigationService);
  private onDestroy$: Subject<void> = new Subject();
  public bracketData = signal<Bracket | null>(null);
  public winner = toSignal(this.bracketService.winner$);

  private navigateOnWin = effect(() => {
    if (this.winner()) {
      this.navService.navigateTo(Page.WINNER);
    }
  });

  ngOnInit(): void {
    this.bracketService.teams$.pipe(takeUntil(this.onDestroy$)).subscribe((item) => {
      this.bracketData.set(item);
    });
    if (!this.bracketData()) {
      this.navService.navigateTo(Page.HOME);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onWinnerChange(index: number, winner: string | null) {
    this.bracketData()?.matchups[index].setWinner(winner);
    const copy = this.bracketData();
    if (copy) {
      this.bracketService.saveBracket(copy);
    }
  }

  onNextButtonPress() {
    const nextTier = this.bracketData()?.calculateNextTier();
    if (nextTier) {
      this.bracketService.saveBracket(nextTier);
    }
  }
}
