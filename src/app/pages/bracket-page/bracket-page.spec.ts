import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketPage } from './bracket-page';
import { BracketService } from '../../services/bracket-service';
import { BehaviorSubject } from 'rxjs';
import { NavigationService, Page } from '../../services/navigation-service';
import { Bracket } from '../../models/bracket';

describe('BracketPage', () => {
  const bracketServiceWinner = new BehaviorSubject<string | null>(null);
  const bracketServiceTeams = new BehaviorSubject<Bracket | null>(null);
  const mockBracketService = {
    winner$: bracketServiceWinner.asObservable(),
    teams$: bracketServiceTeams.asObservable(),
  };

  let component: BracketPage;
  let fixture: ComponentFixture<BracketPage>;
  let navigateToSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BracketPage],
      providers: [{ provide: BracketService, useValue: mockBracketService }],
    }).compileComponents();

    const navigationService = TestBed.inject(NavigationService);
    navigateToSpy = spyOn(navigationService, 'navigateTo');

    fixture = TestBed.createComponent(BracketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //TODO: finish tests
    expect(component).toBeTruthy();
  });

  it('should navigate when bracket service emits a winner', () => {
    bracketServiceWinner.next('winner');
    bracketServiceTeams.next(new Bracket(['team1', 'team2']));

    expect(navigateToSpy).toHaveBeenCalledWith(Page.HOME);
  });
});
