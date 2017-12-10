var mongoose = require('mongoose');

const Recipe = require('../models/Recipe');

module.exports = (app) => {
  app.get('/recipes', (req, res) => {
      req.recipeModel
            .find({})
            .sort({'created_at': -1})
            .exec((err, recipes) => res.json(recipes))
  });

  app.post('/recipes', (req, res) => {
      const newRecipe = new req.recipeModel(Object.assign({}, req.body, {created_at: Date.now()}));
      newRecipe.save((err, savedRecipe) => {
          res.json(savedRecipe)
      })
  })

  app.put('/recipes', (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.recipeModel.findOne({_id: idParam}, (err, recipeToUpdate) => {
        const updatedRecipe = Object.assign(recipeToUpdate, req.body);
        updatedRecipe.save((err, recipe) => res.json(recipe))
    })
  })

  app.delete('/recipes', (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.recipeModel.remove({_id: idParam}, (err, removedRecipe) => res.json(removedRecipe));
  })
}