import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Matchup } from './matchup';
import { inputBinding, signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Matchup', () => {
  let component: Matchup;
  let fixture: ComponentFixture<Matchup>;
  const teamOneBoundValue = signal('team1');
  const teamTwoBoundValue = signal('team2');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Matchup],
    }).compileComponents();

    fixture = TestBed.createComponent(Matchup, {
      bindings: [
        inputBinding('team-one', teamOneBoundValue),
        inputBinding('team-two', teamTwoBoundValue),
      ],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onTeamPress', () => {
    it('should emit team one to winnerChange when team one is clicked', () => {
      const winnerChangeSpy = spyOn(component.winnerChange, 'emit');

      (
        fixture.debugElement.query(By.css('#team-one bb-button')).nativeElement as HTMLButtonElement
      ).dispatchEvent(new Event('press'));

      expect(winnerChangeSpy).toHaveBeenCalledWith(component.teamOne());
    });

    it('should emit team two to winnerChange when team two is clicked', () => {
      const winnerChangeSpy = spyOn(component.winnerChange, 'emit');

      (
        fixture.debugElement.query(By.css('#team-two bb-button')).nativeElement as HTMLButtonElement
      ).dispatchEvent(new Event('press'));

      expect(winnerChangeSpy).toHaveBeenCalledWith(component.teamTwo());
    });
  });
});
