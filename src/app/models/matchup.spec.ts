import { Matchup } from './matchup';

describe('Matchup', () => {
  it('should create an instance', () => {
    const result = new Matchup('team1', 'team2');
    expect(result).toBeTruthy();
    expect(result.teamOne).toEqual('team1');
    expect(result.teamTwo).toEqual('team2');
    expect(result.winner).toBeNull();
  });
});
