import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BracketService } from '../../services/bracket-service';
import { AsyncPipe } from '@angular/common';
import { Bracket } from '../../models/bracket';
import { NavigationService, Page } from '../../navigation-service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'bb-bracket-page',
  imports: [AsyncPipe],
  templateUrl: './bracket-page.html',
  styleUrl: './bracket-page.scss',
})
export class BracketPage implements OnInit, OnDestroy {
  private bracketService = inject(BracketService);
  private navService = inject(NavigationService);
  private dataSub: Subscription | null = null;
  public bracketData = signal<Bracket | null>(null);

  ngOnInit(): void {
    this.dataSub = this.bracketService.teams$.subscribe(item => {
      this.bracketData.set(item);
    });
    if (this.bracketData()?.matchups && this.bracketData()!.matchups!.length < 1) {
      this.navService.navigateTo(Page.HOME)
    }
  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
  }
}
