var Express = require('express');
var Webtask = require('webtask-tools');
var bodyParser = require('body-parser')
var db = require('./middlewares/db');
var app = Express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(db.connectDisconnect);
require('./routes/recipes')(app);

module.exports = Webtask.fromExpress(app);