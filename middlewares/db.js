var mongoose = require('mongoose');
// import Story schema
const RecipeSchema = require('../models/Recipe')

module.exports = {
    // Connect/Disconnect middleware
    connectDisconnect: (req, res, next) => {
        const connection = mongoose.createConnection(req.webtaskContext.secrets.MONGO_URL);
        req.recipeModel = connection.model('Recipe', RecipeSchema);
        req.on('end', () => {
            mongoose.connection.close();
        })
        next()
    },
}