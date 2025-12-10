import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';
import { BracketService } from '../../services/bracket-service';
import { NavigationService, Page } from '../../services/navigation-service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let saveTeamsAsBracketSpy: jasmine.Spy<(teams: string[]) => void>;
  let navigateToSpy: jasmine.Spy<(page: Page) => void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    const bracketService = TestBed.inject(BracketService);
    const navigationService = TestBed.inject(NavigationService);

    saveTeamsAsBracketSpy = spyOn(bracketService, 'saveTeamsAsBracket');
    navigateToSpy = spyOn(navigationService, 'navigateTo');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmitEntry', () => {
    it('should add fieldValue to teams and clear when valid', () => {
      component.fieldValue.set('test');

      component.onSubmitEntry();

      expect(component.teams()).toContain('test');
    });
    it('should clear fieldValue to teams when valid', () => {
      component.fieldValue.set('test');

      component.onSubmitEntry();

      expect(component.teams()).toContain('test');
      expect(component.fieldValue()).toBe('');
      expect(component.fieldError()).toBe('');
    });
    it('should set fieldError and not update teams if fieldValue is empty', () => {
      component.fieldValue.set('');

      component.onSubmitEntry();

      expect(component.teams()).not.toContain('test');
      expect(component.fieldError()).toBe('Team name is required');
    });

    it('should set fieldError and not update teams if fieldValue already exists in teams', () => {
      component.teams.set(['1']);
      component.fieldValue.set('1');

      component.onSubmitEntry();

      expect(component.teams().length).toBe(1);
      expect(component.fieldError()).toBe('Team already exists');
    });
  });

  describe('deleteTeam', () => {
    it('should remove given team', () => {
      component.teams.set(['1', '2']);
      component.deleteTeam('1');

      expect(component.teams()).not.toContain('1');
    });
    it('should not remove anything if given team does not exist in list', () => {
      component.teams.set(['1', '2']);
      component.deleteTeam('3');

      expect(component.teams().length).toBe(2);
    });
  });

  describe('submit', () => {
    it('should call bracket service to save teams', () => {
      const mockTeams = ['1', '2', '3'];
      component.teams.set(mockTeams);

      component.submit();

      expect(saveTeamsAsBracketSpy).toHaveBeenCalledWith(mockTeams);
    });

    it('should call navigation service to navigate to bracket page', () => {
      const bracketPage = Page.BRACKET;

      component.submit();

      expect(navigateToSpy).toHaveBeenCalledWith(bracketPage);
    });
  });
});
