const { ID, Permission, Role } = require('node-appwrite')

const foodItemSchema = [
  '648040b07ab2b69101c8',
  ID.unique(),
  'FoodItemSchem2',
  //   { name: 'raj' },
  [Permission.read(Role.any())],
  [
    {
      label: 'FoodName',
      key: 'foodName',
      type: 'text',
      array: true,
      required: true,
    },
  ],
]

// const periodSchema = [
//   'Period',
//   ['*'],
//   ['user:Raj'],
//   [
//     {
//       label: 'Period',
//       key: 'period',
//       type: 'document',
//       default: 'Empty',
//       required: true,
//       array: true,
//     },
//   ],
// ]

// const mealPlanSchema = [
//   'MealPlan',
//   ['*'],
//   ['user:Raj'],
//   [
//     {
//       label: 'UserId',
//       key: 'userid',
//       type: 'text',
//       default: 'Empty',
//       required: true,
//       array: false,
//     },
//     {
//       label: 'Period',
//       key: 'period',
//       type: 'document',
//       default: 'Empty',
//       required: true,
//       array: true,
//     },
//   ],
// ]

module.exports = foodItemSchema
