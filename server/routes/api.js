const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send("hi");
});

router.get('/recipes', (req, res) => {
  res.json({
    data: [
      {
        title: "Pie",
        category: "Desserts",
        ingredients: ["sugar", "apples"],
        instructions: "bake it",
        pic: "ltvcyjbrqlmvjyplrvcc.jpg"
      },
      {
        title: "Soup",
        category: "Entre",
        ingredients: ["peas", "carrots"],
        instructions: "simmer it",
        pic: "ltvcyjbrqlmvjyplrvcc.jpg"
      }
    ]
  });
});

module.exports = router;

// data: {
//   "Desserts" : [
//     {
//       title: "Pie",
//       ingredients: ["sugar", "apples"],
//       instructions: "bake it",
//       pic: "ltvcyjbrqlmvjyplrvcc.jpg"
//     }
//   ],
//   "Soup & Appetizers" : [
//     {
//       title: "Soup",
//       ingredients: ["peas", "carrots"],
//       instructions: "simmer it",
//       pic: "ltvcyjbrqlmvjyplrvcc.jpg"
//     }
//   ]
// }
