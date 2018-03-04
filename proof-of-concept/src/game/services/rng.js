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

module.exports = {
  rollDice,
  rollDices,
  chancePass,
  pickRandom,
}
