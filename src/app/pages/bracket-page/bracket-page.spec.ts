import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketPage } from './bracket-page';
import { BracketService } from '../../services/bracket-service';
import { BehaviorSubject } from 'rxjs';
import { NavigationService, Page } from '../../services/navigation-service';
import { Bracket } from '../../models/bracket';

describe('BracketPage', () => {
  const bracketServiceWinner = new BehaviorSubject<string | null>(null);
  const bracketServiceTeams = new BehaviorSubject<Bracket | null>(new Bracket(['1', '2']));
  const mockBracketService = {
    winner$: bracketServiceWinner.asObservable(),
    teams$: bracketServiceTeams.asObservable(),
    saveBracket: jasmine.createSpy('saveBracket'),
  };

  let component: BracketPage;
  let fixture: ComponentFixture<BracketPage>;
  let navigateToSpy: jasmine.Spy;

  beforeEach(async () => {
    bracketServiceWinner.next(null);
    bracketServiceTeams.next(new Bracket(['1', '2']));
    await TestBed.configureTestingModule({
      imports: [BracketPage],
      providers: [{ provide: BracketService, useValue: mockBracketService }],
    }).compileComponents();

    const navigationService = TestBed.inject(NavigationService);
    navigateToSpy = spyOn(navigationService, 'navigateTo');

    mockBracketService.saveBracket.calls.reset();

    fixture = TestBed.createComponent(BracketPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    //TODO: finish tests
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigate when bracket service emits a winner', () => {
    bracketServiceWinner.next('winner');

    fixture.detectChanges();

    expect(navigateToSpy).toHaveBeenCalledWith(Page.WINNER);
  });

  it('should navigate to home page if bracket service does not have a bracket', () => {
    bracketServiceTeams.next(null);

    fixture.detectChanges();

    expect(navigateToSpy).toHaveBeenCalledWith(Page.HOME);
  });

  describe('onWinnerChange', () => {
    it('should update winner for matchup and save to bracket service', () => {
      fixture.detectChanges();

      const mockBracket: Bracket = new Bracket(['1', '2']);
      mockBracket.matchups[0].setWinner('1');

      component.onWinnerChange(0, '1');

      expect(mockBracketService.saveBracket).toHaveBeenCalledWith(mockBracket);
    });
    it('should update winner for matchup and save to bracket service', () => {
      fixture.detectChanges();

      const mockBracket: Bracket = new Bracket(['1', '2']);
      mockBracket.matchups[0].setWinner('1');

      component.onWinnerChange(0, '1');

      expect(mockBracketService.saveBracket).toHaveBeenCalledWith(mockBracket);
    });

    it('should not save to bracket service if bracket is null', () => {
      fixture.detectChanges();
      bracketServiceTeams.next(null);
      fixture.detectChanges();
      const mockBracket: Bracket = new Bracket(['1', '2']);
      mockBracket.matchups[0].setWinner('1');

      component.onWinnerChange(0, '1');

      expect(mockBracketService.saveBracket).not.toHaveBeenCalled();
    });
  });
  describe('onNextButtonPress', () => {
    it('should get nextTier and save it to bracketService', () => {
      const mockBracket = new Bracket(['1', '2', '3', '4']);
      mockBracket.matchups.forEach((bracket) => {
        bracket.setWinner(bracket.teamOne);
      });
      bracketServiceTeams.next(mockBracket);
      fixture.detectChanges();

      component.onNextButtonPress();

      expect(mockBracketService.saveBracket).toHaveBeenCalledWith(mockBracket.calculateNextTier());
    });

    it('should not save if no next tier', () => {
      const mockBracket = new Bracket(['1', '2']);
      mockBracket.matchups.forEach((bracket) => {
        bracket.setWinner(bracket.teamOne);
      });
      bracketServiceTeams.next(mockBracket);
      fixture.detectChanges();

      component.onNextButtonPress();

      expect(mockBracketService.saveBracket).not.toHaveBeenCalledWith(
        mockBracket.calculateNextTier(),
      );
    });
  });
});
