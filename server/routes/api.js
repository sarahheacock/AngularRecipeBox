const express = require('express');
const router = express.Router();
const request = require("request");
const cheerio = require('cheerio');

const Box = require("../models/api").Box;
const Recipe = require("../models/api").Recipe;

const required = ["title"];

const cap = (string) => {
  return string.trim().split(' ').map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }).join(' ');
};

const arr = (string) => {
  return string.split("\n").filter((str) => {
    if(str !== "") return str;
  });
}

//=========PARAMETERS===========================
router.param("category", (req, res, next, id) => {
  const cat = cap(id);

  Box.findOne({category: cat}, (err, box) => {
    if(err){
      next(err);
    } 
    else if(!box){
      req.box = new Box({
        category: cat,
        recipes: []
      });
      next();
    }
    else{
      req.box = box;
      next();
    }
  });
});

//=========MIDDLEWARE===========================
//check input
const check = (req, res, next) => {
  const valid = required.reduce((a, b) => {
    return a && req.body[b] !== '' && req.body[b] !== undefined;
  }, true);

  if(valid){
    next();
  }
  else{
    res.json({message: "*Fill out required fields"});
  }
};

//format input
const formatInput = (req, res, next) => {
  req.body.title = cap(req.body.title);

  req.body.ingredients = arr(req.body.ingredients);
  req.body.directions = arr(req.body.directions);

  next();
};

//format output
const output = (req, res, next) => {
  Box.find({}).populate({
    path: 'recipes',
    model: 'Recipe'
  }).exec((err, doc) => {
    const arr = (req.recipes) ? doc.concat(req.recipes) : doc;

    const result = arr.sort((a, b) => {
      return (b.category < a.category) ? 1 : -1;
    });

    res.json({
      data: result
    });
  });
};

//============ROUTES===============================
//get all recipes and boxes
router.get('/', output);

const getRecipe = (link) => {
  
};

router.get('/scrape', (req, res, next) => {
  const url = "http://orangette.net/recipes/";

  request(url, (err, response, html) => {
    if(err) next(err);
    const $ = cheerio.load(html);

    let result = []
    $("option").each(function(){
      const value = $(this).val();
      if(value.includes("course")) result.push(value);
    });

    req.links = result;
    next();
  });

}, (req, res, next) => {
  let recipes = [];

  for(let i = 0; i < req.links.length; i++){
    const link = req.links[i];

    request(link, (err, response, html) => {
      const $ = cheerio.load(html); 
      recipes[i] = [];

      const div = $("main.content-left ul.grid-list li a");
      const length = div.length;

      div.each(function(j){
        const value = $(this).attr('href');
        console.log(j, value);
        recipes[i].push(value);

        if(recipes.length === req.links.length && recipes[i].length === length){
          req.recipes = recipes;
          next();
        }
      });
    });
  }

}, (req, res, next) => {
  const final = req.links.map((link, i) => {
    const cat = link.split('/').reduce((a, b) => {
      if(b !== "") return b;
      else return a;
    }, "");

    return {
      category: cap(cat),
      recipes: req.recipes[i]
    };
  });

  res.json(final);
});

//create new recipe
router.post('/:category', check, formatInput, (req, res, next) => {
  let recipe = new Recipe(req.body);
  recipe.save((err, newRecipe) => {
    if(err){
      next(err);
    }
    else{
      console.log(req.box);
      req.box.recipes.push(recipe);
      req.box.save((err, doc) => {
        if(err){
          next(err);
        } 
        else{
          res.status(201);
          res.json({
            data: [doc]
          });
        } 
      });
    }
  }); 
});

//edit recipe
router.put("/:category/:id", check, formatInput, (req, res, next) => {
  next();
});

//delete recipe
router.delete("/:category/:id", check, formatInput, (req, res, next) => {
  next();
});

module.exports = router;

