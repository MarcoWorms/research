import rng from './rng'

describe('RNG', () => {

  it('should roll a dice', () => {
    expect(rng.rollDice(6))
      .toBeLessThan(7)

    expect(rng.rollDice(6))
      .toBeGreaterThan(0)
  })

  it('should roll many dices', () => {
    const dices = rng.rollDices(6, 200)
    dices.forEach(roll => {
      expect(roll).toBeLessThan(7)
      expect(roll).toBeGreaterThan(0)
    })
  })

  it('should pick random array elements', () => {
    const number = rng.pickRandom([1, 2, 3])
    expect(number).toBeLessThan(4)
    expect(number).toBeGreaterThan(0)
  })

})
