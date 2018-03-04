import {
  flatten,
  merge,
  propEq,
} from 'ramda'

import fields from './models/fields'
import enemies from './models/enemies'
import attacks from './models/attacks'

const field = ({ name }) => fields.find(propEq('name', name))

const enemy = ({ name, x, y }) => {
  const enemy = enemies.find(propEq('name', name))
  return {
    ...enemy,
    x,
    y,
    intent: 'move'
  }
}

const attack = ({ name }) => {
  const attack = attacks.find(propEq('name', name))
  return {
    type: 'attack',
    ...attack
  }
}

const deckBlueprint = [
  {
    name: 'Tackle',
    amount: 7,
  },
  {
    name: 'Slam',
    amount: 3,
  },
  {
    name: 'Wrath',
    amount: 1,
  },
]

const player = merge({
  x: 1,
  y: 1,
  hp: 10,
  maxHp: 10,
  energy: 0,
  deckBlueprint,
})

const deck = deckBlueprint =>
  flatten(deckBlueprint.map(({ name, amount }) =>
    Array.from({ length: amount }).map(() => attack({ name }))
  ))

export default {
  field,
  player,
  enemy,
  attack,
  deck,
}

