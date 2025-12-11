import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerPage } from './winner-page';
import { BehaviorSubject } from 'rxjs';
import { BracketService } from '../../services/bracket-service';

describe('WinnerPage', () => {
  const winner$ = new BehaviorSubject<string | null>('test');
  const mockBracketService = {
    winner$,
  };
  let component: WinnerPage;
  let fixture: ComponentFixture<WinnerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerPage],
      providers: [{ provide: BracketService, useValue: mockBracketService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
