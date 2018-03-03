const buildArray = length =>
  Array.from({ length })

export const rollDice = faces =>
  Math.ceil(Math.random(faces))

export const rollDices = (faces, amount) =>
  buildArray(amount)
    .map(() => rollDice(faces))

export const chancePass = chance =>
  Math.random() < chance

export const pickRandom = array =>
  array[Math.floor(Math.random(array.length))]
