import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamList } from './team-list';
import { inputBinding, signal } from '@angular/core';
import { By } from '@angular/platform-browser';

const fallbackContent = 'No teams have been added yet...';

describe('TeamList', () => {
  let component: TeamList;
  let fixture: ComponentFixture<TeamList>;
  const teamsBoundValue = signal<string[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamList],
    }).compileComponents();
    teamsBoundValue.set(['team1', 'team2']);
    fixture = TestBed.createComponent(TeamList, {
      bindings: [inputBinding('teams', teamsBoundValue)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all teams', () => {
    const data = fixture.debugElement.queryAll(By.css('td:first-child'));
    expect(data.length).toEqual(2);
    expect(data.map((el) => el.nativeElement.innerHTML)).toContain('team1');
    expect(data.map((el) => el.nativeElement.innerHTML)).toContain('team2');
  });

  it('should render fallback content when no teams', () => {
    teamsBoundValue.set([]);
    fixture.detectChanges();

    const fallbackContentEl = fixture.debugElement.query(By.css('td'))!.nativeElement;

    expect(fallbackContentEl.innerHTML).toEqual(fallbackContent);
  });

  describe('onDeleteButtonPress', () => {
    it('should emit delete event when team passed', () => {
      const eventSpy = spyOn(component.delete, 'emit');
      component.onDeleteButtonPress('team1');

      expect(eventSpy).toHaveBeenCalledWith('team1');
    });
  });
});
