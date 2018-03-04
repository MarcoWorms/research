import {
  propEq,
} from 'ramda'

import fields from './models/fields'
import enemies from './models/enemies'
import attacks from './models/attacks'

import factories from '.'

const { field, enemy, attack, player } = factories

describe('Factories', () => {

  test('field factory', () => {
    expect(field({ name: 'Plains' }))
      .toMatchObject(fields.find(propEq('name', 'Plains')))
  })

  test('enemy factory', () => {
    expect(enemy({ name: 'Slime' }))
      .toMatchObject(enemies.find(propEq('name', 'Slime')))
  })

  test('attack factory', () => {
    expect(attack({ name: 'Slam' }))
      .toMatchObject(attacks.find(propEq('name', 'Slam')))
  })

  test('player factory', () => {
    expect(player({})).toHaveProperty('hp')
    expect(player({})).toHaveProperty('deckBlueprint')
    expect(player({})).toHaveProperty('x')
    expect(player({})).toHaveProperty('y')
  })

})
