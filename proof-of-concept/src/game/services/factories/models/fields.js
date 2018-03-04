const tileStates = {
  X: { name: 'wall' },
  O: { name: 'empty' },
}
const { X, O } = tileStates
const wallRow = length => Array.from({ length }, () => X)
const borderWallRow = length => [
  X,
  ...Array.from({ length: length - 2 }, () => O),
  X,
]

export default [
  {
    name: 'Plains',
    shape: [
      wallRow(16),
      borderWallRow(16),
      borderWallRow(16),
      borderWallRow(16),
      borderWallRow(16),
      borderWallRow(16),
      borderWallRow(16),
      borderWallRow(16),
      borderWallRow(16),
      borderWallRow(16),
      wallRow(16),
    ],
  },
]
