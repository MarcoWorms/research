import {
	drop,
  cond,
  lensPath,
  set,
} from 'ramda'

const fillDeck = ({ rng, factories }, blueprint) =>
	rng.shuffle(
		factories.deck(blueprint)
	)

const newGameState = ({ factories, rng }) => {
  const player = factories.player({ x: 2, y: 5 })
  return {
    player: {
      ...player,
      deck: fillDeck({ factories, rng }, player.deckBlueprint),
    },
    field: factories.field({ name: 'Plains' }),
    enemies: [
      factories.enemy({ name: 'Slime', x: 13, y: 2 }),
      factories.enemy({ name: 'Slime', x: 8, y: 7 }),
    ],
  }
}

const setPlayerX = set(lensPath(['player', 'x']))
const setPlayerY = set(lensPath(['player', 'y']))

const overlapingWall = (unit, field) =>
  field.shape[unit.y][unit.x].name === 'wall'

const movePlayer = (services, state, direction) => {
  const stateAfterPlayerMove = cond([
    [() => direction === 'up', setPlayerY(state.player.y - 1)],
    [() => direction === 'down', setPlayerY(state.player.y + 1)],
    [() => direction === 'left', setPlayerX(state.player.x - 1)],
    [() => direction === 'right', setPlayerX(state.player.x + 1)],
  ])(state)

  if (overlapingWall(stateAfterPlayerMove.player, state.field)) {
    return state
  }

	const enemiesAfterMove = stateAfterPlayerMove.enemies
		.map(enemy => ({
			...enemy,
			...(function () {
				return services.rng.chancePass(0.5)
					? { x: enemy.x + (services.rng.chancePass(0.5) ? 1 : -1) }
					: { y: enemy.y + (services.rng.chancePass(0.5) ? 1 : -1) }
			}())
		}))
		.map((enemy, index) => overlapingWall(enemy, state.field)
			? {
				...enemy,
				x: stateAfterPlayerMove.enemies[index].x,
				y: stateAfterPlayerMove.enemies[index].y,
			}
			: enemy
		)

  return {
		...stateAfterPlayerMove,
		enemies: enemiesAfterMove,
    player: {
      ...stateAfterPlayerMove.player,
      energy: stateAfterPlayerMove.player.energy + 1,
    }
  }
}

const attack = (services, state, direction) => {
	if (state.player.energy < state.player.deck[0].cost) {
		return state
	}
	const deck = drop(1, state.player.deck)
  return {
    ...state,
		success: true,
    player: {
      ...state.player,
      energy: 0,
			deck: deck.length === 0
				? fillDeck(services, state.player.deckBlueprint)
				: deck,
    },
  }
}

export default {
  newGameState,
  movePlayer,
  attack
}

