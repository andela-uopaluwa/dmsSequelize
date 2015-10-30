"use strict";

var Sequelize = require("sequelize");
var sequelize = new Sequelize('dms', 'postgres', 'andela', {
  host: 'localhost',
  dialect: 'postgres'
});
var models = require('./schema')(sequelize, Sequelize);
var db = {};

models.forEach(function(model) {
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//sync models to db
db.sequelize.sync();
module.exports = db;