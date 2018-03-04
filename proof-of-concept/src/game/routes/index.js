import {
  cond,
  lensPath,
  set,
} from 'ramda'

const newGameState = ({ factories }) => ({
  player: factories.player({ x: 1, y: 5 }),
  field: factories.field({ name: 'Plains' }),
  enemies: [
    factories.enemy({ name: 'Slime', x: 5, y: 5 }),
    factories.enemy({ name: 'Slime', x: 8, y: 7 }),
  ],
})

const setPlayerX = set(lensPath(['player', 'x']))
const setPlayerY = set(lensPath(['player', 'y']))

const playerOverlapingWall = state =>
  state.field.shape[state.player.y][state.player.x].name === 'wall'

const movePlayer = (services, state, direction) => {
  const newState = cond([
    [() => direction === 'up', setPlayerY(state.player.y - 1)],
    [() => direction === 'down', setPlayerY(state.player.y + 1)],
    [() => direction === 'left', setPlayerX(state.player.x - 1)],
    [() => direction === 'right', setPlayerX(state.player.x + 1)],
  ])(state)

  if (playerOverlapingWall(newState)) {
    return state
  }

  return newState
}

export default {
  newGameState,
  movePlayer
}

