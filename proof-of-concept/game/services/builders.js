const unit = {
  name: 'unnamed unit',
  hp: 1,
  x: 0,
  y: 0,
  shape: [
    [0],
  ],
}

const attack = {
  name: 'slam',
  shape: [
    [1],
    [0, 1],
    [1],
  ],
}

const tileStates = {
  X: 'wall',
  O: 'empty',
}
const { X, O } = tileStates
const wallRow = length => Array.from({ length }, () => X)
const borderWallRow = length => [
  X,
  ...Array.from({ length: length - 2 }, () => O),
  X,
]
const field = {
  name: 'Plains'
  shape: [
    wallRow(15),
    borderWallRow(15),
    borderWallRow(15),
    borderWallRow(15),
    borderWallRow(15),
    borderWallRow(15),
    borderWallRow(15),
    borderWallRow(15),
    wallRow(15),
  ],
}

export default map(mergeWith(merge), {
  unit,
  attack,
  field,
})

