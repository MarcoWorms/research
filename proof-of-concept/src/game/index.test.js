import game from '.'
import routes from './routes'
import factories from './services/factories'

describe('Game', () => {
  describe('newGameState', () => {

    const state = game.newGameState()

    it('should have "Plains" as initial field', () => {
      expect(state)
        .toMatchObject({ field: factories.field({ name: 'Plains' }) })
    })

    it('should have a player', () => {
      expect(state)
        .toHaveProperty('player')
    })

  })

  describe('movePlayer', () => {

    it('should move the player up', () => {
      const state = game.newGameState()
      const newState = game.movePlayer(state, 'up')
      expect(newState.player.y).toBe(state.player.y - 1)
    })

    it('should move the player down', () => {
      const state = game.newGameState()
      const newState = game.movePlayer(state, 'down')
      expect(newState.player.y).toBe(state.player.y + 1)
    })

    it('should move the player right', () => {
      const state = game.newGameState()
      const newState = game.movePlayer(state, 'right')
      expect(newState.player.x).toBe(state.player.x + 1)
    })

    it('should not move the player left because it overlaps wall', () => {
      const state = game.newGameState()
      const newState = game.movePlayer(state, 'left')
      expect(newState.player.x).toBe(state.player.x - 1)
    })

  })
})
