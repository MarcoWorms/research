// 0 = empty
// 1 = player position
// 2 = hitbox
export default [
  {
    name: 'Tackle',
    damage: 2,
    shape: [
      [1, 2, 2],
    ],
  },
  {
    name: 'Slam',
    damage: 5,
    shape: [
      [0, 2, 0],
      [1, 2, 2],
      [0, 2, 0],
    ],
  },
  {
    name: 'Wrath',
    damage: 15,
    shape: [
      [0, 2, 2, 0],
      [0, 2, 2, 2],
      [1, 2, 2, 2],
      [0, 2, 2, 2],
      [0, 2, 2, 0],
    ],
  },
]
