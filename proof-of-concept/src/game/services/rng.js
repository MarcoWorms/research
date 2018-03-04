import {
	pipe,
  sort,
} from 'ramda'

const buildArray = length => Array.from({ length })

const rollDice = faces =>
    Math.ceil(Math.random() * faces)

const rollDices = (faces, amount) =>
    buildArray(amount)
      .map(() => rollDice(faces))

const chancePass = chance =>
    Math.random() < chance

const pickRandom = array =>
    array[Math.floor(Math.random(array.length))]

const shuffle = pipe(
	sort(() => 0.5 - Math.random()),
	sort(() => 0.5 - Math.random()),
	sort(() => 0.5 - Math.random()),
	sort(() => 0.5 - Math.random()),
	sort(() => 0.5 - Math.random())
)

export default {
  rollDice,
  rollDices,
  chancePass,
  pickRandom,
  shuffle,
}
