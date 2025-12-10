import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketPage } from './bracket-page';
import { BracketService } from '../../services/bracket-service';
import { BehaviorSubject } from 'rxjs';

describe('BracketPage', () => {
  const bracketServiceWinner = new BehaviorSubject<string | null>(null);
  const bracketServiceTeams = new BehaviorSubject<string | null>(null);
  const mockBracketService = {
    winner$: bracketServiceWinner.asObservable(),
    teams$: bracketServiceTeams.asObservable(),
  };

  let component: BracketPage;
  let fixture: ComponentFixture<BracketPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BracketPage],
      providers: [{ provide: BracketService, useValue: mockBracketService }],
    }).compileComponents();

    fixture = TestBed.createComponent(BracketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //TODO: finish tests
    expect(component).toBeTruthy();
  });
});
