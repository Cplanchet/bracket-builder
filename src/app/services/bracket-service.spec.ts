import { TestBed } from '@angular/core/testing';

import { BracketService } from './bracket-service';
import { Bracket } from '../models/bracket';

describe('BracketService', () => {
  let service: BracketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BracketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveTeamsAsBracket', () => {
    it('should throw an error when less than 2 teams are passed', () => {
      const action = () => {
        service.saveTeamsAsBracket(['team1']);
      };
      expect(action).toThrowError('Must be a list of 2 or more teams got list: team1');
    });

    it('should update bracket emit to a new bracket with the given teams', () => {
      const teams = ['team1', 'team2'];

      service.saveTeamsAsBracket(teams);

      service.teams$.subscribe((teamsObs) => {
        expect(teamsObs).toEqual(new Bracket(teams));
      });
    });
  });

  describe('saveBracket', () => {
    it('should emit passed bracket', () => {
      const bracket = new Bracket(['team', 'newTeam']);

      service.saveBracket(bracket);

      service.teams$.subscribe((res) => {
        expect(res).toEqual(bracket);
      });
    });

    it('should emit a winner if all matchups have winners and there is no next tier in the bracket', () => {
      const mockBracket = new Bracket(['1', '2']);
      mockBracket.matchups[0].setWinner('1');

      service.saveBracket(mockBracket);

      service.winner$.subscribe((res) => {
        expect(res).toBe('1');
      });
    });

    it('should not emit a winner if previously emitted', () => {
      const mockBracket = new Bracket(['1', '2']);
      mockBracket.matchups[0].setWinner('1');
      let emitCount = 0;

      service.saveBracket(mockBracket);

      service.winner$.subscribe((winner) => {
        expect(winner).toBe('1');
        emitCount++;
      });

      service.saveBracket(mockBracket);

      expect(emitCount).toBe(1);
    });
    it('should not emit a winner if next tier exists', () => {
      const mockBracket = new Bracket(['1', '2', '3']);
      mockBracket.matchups[0].setWinner('2');

      service.saveBracket(mockBracket);

      service.winner$.subscribe((winner) => {
        expect(winner).toBe(null);
      });
    });
    it('should not emit a winner if matchup has no winner', () => {
      const mockBracket = new Bracket(['1', '2']);

      service.saveBracket(mockBracket);

      service.winner$.subscribe((winner) => {
        expect(winner).toBe(null);
      });
    });
  });
});

export class BracketServiceStub {
  public saveBracket: jasmine.Spy = jasmine.createSpy('saveBracket');
  public saveTeamsAsBracket: jasmine.Spy = jasmine.createSpy('saveTeamsAsBracket');
  public teams$: jasmine.Spy = jasmine.createSpy('teams$');
}
