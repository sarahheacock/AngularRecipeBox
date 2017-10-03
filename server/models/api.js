const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({

});

const BoxSchema = new Schema({
    categories: ["Breakfast", "Soups", "Desserts"] 
});

const Box = mongoose.model("Box", BoxSchema);

module.exports.Box = Box;