import { Bracket } from './bracket';

describe('bracket', () => {
  describe('constructor', () => {
    it('should create a new bracket when given teams', () => {
      const result = new Bracket(['team1', 'team2']);
      expect(result).not.toBeFalsy();
    });

    it('should throw an error if passed fewer than 2 teams', () => {
      expect(() => new Bracket(['oneTeam'])).toThrowError();
    });

    it('should create match-ups without an extra for even number of teams', () => {
      const teams = ['1', '2', '3', '4'];
      const result = new Bracket(teams);

      expect(result.matchups.length).toBe(2);

      expect(result.matchups[0].teamOne).toBe('1');
      expect(result.matchups[0].teamTwo).toBe('2');
      expect(result.matchups[1].teamOne).toBe('3');
      expect(result.matchups[1].teamTwo).toBe('4');
    });

    it('should create match-ups with an extra for odd number of teams', () => {
      const teams = ['1', '2', '3', '4', '5'];
      const result = new Bracket(teams);

      expect(result.matchups.length).toBe(2);

      expect(result.matchups[0].teamOne).toBe('2');
      expect(result.matchups[0].teamTwo).toBe('3');
      expect(result.matchups[1].teamOne).toBe('4');
      expect(result.matchups[1].teamTwo).toBe('5');
    });
  });
  describe('calculateNextTier', () => {
    it('should return null if not all matches have a winner', () => {
      const teams = ['1', '2', '3', '4'];
      const bracket = new Bracket(teams);
      bracket.matchups[0].winner = '1';

      const result = bracket.calculateNextTier();

      expect(result).toBeNull();
    });

    it('should return null if all matches have a winner, but there are fewer than 2 teams remaining', () => {
      const teams = ['1', '2'];
      const bracket = new Bracket(teams);
      bracket.matchups.forEach((item) => item.setWinner(item.teamOne));

      const result = bracket.calculateNextTier();

      expect(bracket.matchups.some((item) => item.winner === null)).toBeFalse();
      expect(result).toBeNull();
    });

    it('should return bracket if more than 2 teams and no extra', () => {
      const teams = ['1', '2', '3', '4'];
      const bracket = new Bracket(teams);
      bracket.matchups.forEach((item) => item.setWinner(item.teamOne));

      const result = bracket.calculateNextTier();

      expect(bracket.matchups.some((item) => item.winner === null)).toBeFalse();
      expect(result?.matchups.length).toBe(1);
      expect(result?.matchups[0].teamOne).toBe('1');
      expect(result?.matchups[0].teamTwo).toBe('3');
    });

    it('should return bracket if more than 2 teams with an extra', () => {
      const teams = ['1', '2', '3', '4', '5'];
      const bracket = new Bracket(teams); // extra: 1 | 2 vs 3 | 4 vs 5
      bracket.matchups.forEach((item) => item.setWinner(item.teamOne)); // 2 and 4 are winners

      const result = bracket.calculateNextTier(); // extra: 2 | 4 vs 1

      expect(bracket.matchups.some((item) => item.winner === null)).toBeFalse();
      expect(result?.matchups.length).toBe(1);
      expect(result?.matchups[0].teamOne).toBe('4');
      expect(result?.matchups[0].teamTwo).toBe('1');
    });
  });
});
