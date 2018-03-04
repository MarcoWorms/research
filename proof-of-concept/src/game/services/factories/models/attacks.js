// 0 = empty
// 1 = player position
// 2 = hitbox
export default [
  {
    name: 'Tackle',
    cost: 2,
    damage: 3,
    shape: [
      [1, 2],
    ],
  },
  {
    name: 'Slam',
    cost: 4,
    damage: 6,
    shape: [
      [2, 2,],
      [1, 2, 2],
      [2, 2,],
    ],
  },
  {
    name: 'Wrath',
    cost: 7,
    damage: 30,
    shape: [
      [0, 2, 0, 0],
      [2, 2, 2, 0],
      [1, 2, 2, 2],
      [2, 2, 2, 0],
      [0, 2, 0, 0],
    ],
  },
]
