"use strict";

var Sequelize = require("sequelize");
var sequelize = new Sequelize('dms', 'postgres', 'andela', {
  host: 'localhost',
  dialect: 'postgres'
});
var models = require('./schema')(sequelize, Sequelize);
// models.sequelize.sync();
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
db.sequelize.sync();
db.Sequelize = Sequelize;


module.exports = db;
