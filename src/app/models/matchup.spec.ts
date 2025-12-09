import { Matchup } from './matchup';

describe('Matchup', () => {
  it('should create an instance', () => {
    const result = new Matchup('team1', 'team2');
    expect(result).toBeTruthy();
    expect(result.teamOne).toEqual('team1');
    expect(result.teamTwo).toEqual('team2');
    expect(result.winner).toBeNull();
  });

  describe('setWinner', () => {
    it('should set winner to null if passed null', () => {
      const matchup = new Matchup('1', '2');

      matchup.setWinner(null);

      expect(matchup.winner).toBeNull();
    });

    it('should set winner to matching team', () => {
      const matchup = new Matchup('1', '2');
      matchup.setWinner('1');

      expect(matchup.winner).toBe('1');

      matchup.setWinner('2');

      expect(matchup.winner).toBe('2');
    });

    it('should throw an error if passed team is not teamOne or teamTwo', () => {
      const matchup = new Matchup('1', '2');
      const result = () => {
        matchup.setWinner('3');
      };
      expect(result).toThrowError('winner must be one of the teams in the matchup, received 3');
    });
  });
});
